import formUtils from "../../../utils/FormUtils";

// Creating form fields object
const formFields = {
  // Name form field
  nameFormField: formUtils.getFormConfigElement(
    "input",
    { type: "text", placeholder: "Your Name" },
    ""
  ),
  // Email form field
  emailFormField: formUtils.getFormConfigElement(
    "input",
    { type: "email", placeholder: "Your Email" },
    ""
  ),
  // Country from field
  countryFormField: formUtils.getFormConfigElement(
    "input",
    { type: "text", placeholder: "Your Country" },
    ""
  ),
  // Street from field
  streetFormField: formUtils.getFormConfigElement(
    "input",
    { type: "text", placeholder: "Your Street" },
    ""
  ),
  // Zipcode from field. By default the getFormConfigElement function returns a validation object with a single field (required),
  // so if we want to add other fields, we do it after we create the form field object (see configuration below)
  zipcodeFormField: formUtils.getFormConfigElement(
    "input",
    { type: "text", placeholder: "Your Zipcode" },
    ""
  ),
  // Deleviry method field. This is a select element, in the second argument we pass an object whose keys are passed as the value attribute of the option element,
  // and the value is the option visible to the user. The third argument is the default value of the select. ex;
  // <select> <option value="fastest"> Fastest </option> <option value="cheapest"> Cheapest </option> </select>
  deliveryMethodField: formUtils.getFormConfigElement(
    "select",
    { fastest: "Fastest", cheapest: "Cheapest" },
    "fastest"
  ),
};

// Configuring form fields
//-------------------------

// Configuring name field
formFields.nameFormField.validation.message = "Name can't be empty";

// Configuring email field
formFields.emailFormField.validation.message = "E-mail can't be empty";

// Configuring country fields
formFields.countryFormField.validation.message = "Country can't be empty";

// Configuring street fields
formFields.streetFormField.validation.message = "Street can't be empty";

// Configuring zipcode fields
formFields.zipcodeFormField.validation.message =
  "Zip code must be a min and max of 5";
// Adding additional validation fields to the validation object
formFields.zipcodeFormField.validation.minLength = 5;
formFields.zipcodeFormField.validation.maxLength = 5;

// Configuring delivery method fields
formFields.deliveryMethodField.isValid = true;

// Exporting the form field object
export default formFields;
