import React, { Component } from "react";
import { connect } from "react-redux";

import formFields from "./FormFields";
import formUtils from "../../utils/FormUtils";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./Auth.css";

class Auth extends Component {
  state = {
    authForm: {
      Email: formFields.email,
      Password: formFields.password,
    },
    showSignUp: true,
    isModalShown: false,
  };

  // Redirecting the user if he sings in/up
  componentDidUpdate = (prevProps) => {
    // I am checking if the user has autenticated or not, and if he had autheticated, I check wether he built a burger or not
    // because if had built a burger, I redirect him to the checkout page, and if not, I redirect him to the home page
    if (!prevProps.userId && prevProps.userId !== this.props.userId) {
      if (this.props.buldingBurger) {
        this.props.history.push("/check-out");
      } else {
        this.props.history.push("/");
      }
    }
    if (this.props.error && this.props.error !== prevProps.error) {
      this.setState({
        isModalShown: true,
      });
    }
  };

  // Used to switch between signing in and up
  toggleSignMode = (e) => {
    e.preventDefault();
    this.setState((oldState) => {
      return {
        showSignUp: !oldState.showSignUp,
      };
    });
  };

  // Used to either sign in / up the user
  submitForm = (e, formObj) => {
    // Preventing submitting the form
    e.preventDefault();

    // Getting the user info
    const formInfo = formUtils.getFormInfo(formObj); // returns {formData, invalidFields}

    // Posting the data if the form is valid
    if (formInfo.invalidFields.length > 0) {
      this.handleInvalidInput(formInfo.invalidFields, formObj);
    } else {
      const signMode = this.state.showSignUp ? "sign up" : "sign in";
      console.log(signMode);
      this.props.auth(
        formInfo.formData.Email,
        formInfo.formData.Password,
        signMode
      );
    }
  };

  // Used for changing the placeholder value and the color of the input when user inputs an invalid input
  handleInvalidInput = (fields, authFormObj) => {
    const authForm = formUtils.handleInvalidInputHelper(fields, authFormObj);
    this.setState({
      authForm: authForm,
    });
  };

  // Called in focusInHandler() method to reset the placeholders and the color in case the user has entered a wrong filed
  resetFields = (authFormObj) => {
    const authForm = formUtils.resetFieldsHelper(authFormObj);
    this.setState({
      authForm,
    });
  };

  // Determins the color of the input field (red or green), if the user has entered it before
  focusInHandler = (field, authFormObj) => {
    // We call it in case the user has entered an invalid input to restore the field to its original state
    this.resetFields(authFormObj);
    const authForm = formUtils.focusInHandlerHelper(field, authFormObj);
    if (authForm) {
      this.setState({
        authForm,
      });
    }
  };

  // We use that method to always turn the color of the input field to Default (white) when he leaves the input field
  focusOutHandler = (field, authFormObj) => {
    const authForm = formUtils.focusOutHandlerHelper(field, authFormObj);
    this.setState({
      authForm,
    });
  };

  formFieldChangehandler = (field, value, formObj) => {
    // Getting an updated form object
    const updatedForm = formUtils.getUpdatedFormObject(field, value, formObj);

    // Updating the state
    this.setState({
      authForm: updatedForm,
    });
  };

  hideModal = () => {
    this.setState({
      isModalShown: false,
    });
  };

  render() {
    // Constructing the form
    const form = [];
    const authForm = this.state.authForm;
    for (let field in authForm) {
      form.push(
        <Input
          key={field}
          elementType={authForm[field].elementType}
          elementConfig={authForm[field].elementConfig}
          value={authForm[field].value}
          changeHandler={(event) => {
            this.formFieldChangehandler(
              field,
              event.target.value,
              this.state.authForm
            );
          }}
          backGroundColor={authForm[field].backGroundColor}
          focusOut={() => {
            this.focusOutHandler(field, this.state.authForm);
          }}
          focusIn={() => {
            this.focusInHandler(field, this.state.authForm);
          }}
          errorText={authForm[field].error}
        />
      );
    }
    form.push(
      <div className={classes.btn} key="btn">
        {/* buttonClicked={this.submitForm} */}
        <Button buttonType="Success">Submit</Button>
        <Button buttonType="Danger" buttonClicked={this.toggleSignMode}>
          Switch to Sign {this.state.showSignUp ? "in" : "up"}{" "}
        </Button>
        {/* A modal that will be shown in case of error */}
        <Modal isShown={this.state.isModalShown} hideModal={this.hideModal}>
          <p>Please enter a valid email and password</p>
        </Modal>
      </div>
    );

    // Constructing a form container
    let formContainer = (
      <React.Fragment>
        <form
          onSubmit={(event) => {
            this.submitForm(event, this.state.authForm);
          }}
        >
          {form}
        </form>
      </React.Fragment>
    );
    // Making the formContainer a spinne if the loading signing in / up
    formContainer = this.props.loading ? <Spinner /> : formContainer;

    return <div className={classes.Form}>{formContainer}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    userId: state.auth.userId,
    error: state.auth.error,
    buldingBurger: state.burger.buldingBurger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, signMode) => {
      return dispatch(actions.auth({ email, password, signMode }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
