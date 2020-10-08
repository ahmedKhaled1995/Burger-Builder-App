import formUtils from "../../utils/FormUtils";

// Creating the form fields
const formFields = {
  email: formUtils.getFormConfigElement(
    "input",
    { type: "email", placeholder: "Your Email" },
    ""
  ),
  password: formUtils.getFormConfigElement(
    "input",
    { type: "password", placeholder: "Your Password" },
    ""
  ),
};

// Configuring form fields
//------------------------

// Configuring email field
formFields.email.validation.message = "Email can't be empty";

// Configuring password field
formFields.password.validation.message = "Password's minimum length is 7";
formFields.password.validation.minLength = 7;

export default formFields;
