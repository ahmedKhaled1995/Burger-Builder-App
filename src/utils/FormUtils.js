// A function that will be called in the constructor of the form to get an object to configure the form. Takes (str, obj, str) returns an obj
// By default, all form fields are required. Add any addition validation fields in the constructor (see Zipcode field in Checkout form), then add
// the added fields validation logic in checkFormFieldValidity() method
const getFormConfigElement = (elementType, elementConfig, value) => {
  return {
    elementType: elementType,
    elementConfig: elementConfig,
    value: value,
    validation: {
      required: true,
      message: "", // Message that will be displayed in case of invalid input
    },
    isValid: false,
    backGroundColor: "Default", // Passed to Input component as a props, can be 'Default', 'Valid', 'InValid. It controls the color of the input field background color
    touched: false, // Used to determin if the user typed at the field at least once
    error: "", // Will be displayed if a form field is invalid, its value will be the message property in validation object
  };
};

/*
    VIP: Note how I first loop throught the fields I want to update, change them, then I call setState() ONLY ONCE.
    Now you might be tempted to put seState() inside the for loop but this has a nasty side effect that is somewhat hard to spot.
    If you call setState() in each of the loop iteration then you will update the dom in every loop (thus rendering the changes to the screen)
    , and since you continue calling it, only the last dom update will be visible on the scrren, and we want all of the changes to be 
    visible at once
  */
const handleInvalidInputHelper = (fields, state) => {
  // Getting a copy of the formObject (deep copy)
  let formObject = { ...state };

  // Getting a copy of the every form field to edit its value (deep copy)
  for (let index in fields) {
    // fields[index] name, email, street, ....
    const fieldObj = { ...formObject[fields[index]] };
    fieldObj.backGroundColor = "InValid";
    fieldObj.elementConfig.placeholder = `Invalid ${fields[index]} Field`;
    fieldObj.error = fieldObj.validation.message;
    formObject[fields[index]] = fieldObj;
  }

  // Retuerning the form object
  return formObject;
};

const resetFieldsHelper = (form) => {
  // Getting a copy of the form (deep copy)
  let formObject = { ...form };

  // Getting a copy of the every form field to edit its value (deep copy)
  for (let field in formObject) {
    // fields[index] name, email, street, ....
    const fieldObj = { ...formObject[field] };
    fieldObj.error = "";
    // The following if condition is to avoid adding a place holder to select since select has no placeholder attr
    if (fieldObj.elementType !== "select") {
      fieldObj.elementConfig.placeholder = `Your ${field}`;
    }
    fieldObj.backGroundColor = "Default";
    formObject[field] = fieldObj;
  }

  // Retuerning the form object
  return formObject;
};

const focusInHandlerHelper = (field, form) => {
  // We check if the user had typed before in that field or not.
  // if he had, we change the color of the field to the corresponding color (red for invalid green for valid)
  let formObject = null;
  if (form[field].touched) {
    const formFieldCopy = form[field];
    formFieldCopy.backGroundColor = formFieldCopy.isValid ? "Valid" : "InValid";
    formFieldCopy.error = "";
    // Getting a copy of the formObject object (deep copy)
    formObject = { ...form };
    formObject[field] = formFieldCopy;
  }
  return formObject;
};

const focusOutHandlerHelper = (field, form) => {
  const formFieldCopy = form[field];
  formFieldCopy.backGroundColor = "Default";
  // Getting a copy of the formObject object (deep copy)
  const formObject = { ...form };
  formObject[field] = formFieldCopy;
  return formObject;
};

// Our custom validation to check the form validity. Retrurns a bool
const checkFormFieldValidity = (formField, fieldValue) => {
  fieldValue = fieldValue.trim();
  if (formField.validation.required) {
    if (fieldValue === "") {
      return false;
    }
  }
  if (formField.validation.minLength) {
    if (fieldValue.length < formField.validation.minLength) {
      return false;
    }
  }
  if (formField.validation.maxLength) {
    if (fieldValue.length > formField.validation.maxLength) {
      return false;
    }
  }
  return true;
};

// Returns an object, first key if the form values, second key is the invalid form fields
const getFormInfo = (formObj) => {
  let formData = {};
  let invalidFields = [];
  for (let field in formObj) {
    formData[field] = formObj[field].value;
    // Checking to see if any form field in invalid
    if (!formObj[field].isValid) {
      invalidFields.push(field);
    }
  }

  // Returning the form info
  return {
    formData,
    invalidFields,
  };
};

// Returns updated formObj with its field set to the value
const getUpdatedFormObject = (field, value, formObj) => {
  // Getting a copy of the form field to edit its value (deep copy)
  const fieldObj = { ...formObj[field] };
  fieldObj.value = value;
  fieldObj.isValid = checkFormFieldValidity(fieldObj, value);
  fieldObj.backGroundColor = fieldObj.isValid ? "Valid" : "InValid";
  fieldObj.touched = true;

  // Getting a copy of the updatedFormObj object (deep copy)
  const updatedFormObj = { ...formObj };
  updatedFormObj[field] = fieldObj;

  return updatedFormObj;
};

const formUtils = {
  getFormConfigElement,
  handleInvalidInputHelper,
  resetFieldsHelper,
  focusInHandlerHelper,
  focusOutHandlerHelper,
  checkFormFieldValidity,
  getFormInfo,
  getUpdatedFormObject,
};

export default formUtils;
