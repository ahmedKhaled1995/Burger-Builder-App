import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import formFields from "./FormFields";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-instance";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./CheckoutForm.css";
import withError from "../../../components/hoc/withErrorHandler/withErrorHandler";
import formUtils from "../../../utils/FormUtils";
import * as actions from "../../../store/actions/index";

class CheckOutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        Name: formFields.nameFormField,
        Email: formFields.emailFormField,
        Country: formFields.countryFormField,
        Street: formFields.streetFormField,
        Zipcode: formFields.zipcodeFormField,
        DeliveryMethod: formFields.deliveryMethodField,
      },
    };
  }

  submitForm = async (e, formObj) => {
    // Preventing the form from submitting
    e.preventDefault();

    // Getting the user info (fields ordered in form fields)
    const formInfo = formUtils.getFormInfo(formObj); // returns {formData, invalidFields}

    // Posting the data if the form is valid
    if (formInfo.invalidFields.length > 0) {
      /*
      VIP : You know what's wrong with the below statements? Think of setState() like return. don't put two setState() below eachother in the same method
        because when the first setState gets called, the page updates thus the second setState won't be reached. 
      this.changeFormState(invalidFields, "value", "Can't be empty!");
      this.changeFormState(invalidFields, "backGroundColor", "InValid");
      */
      this.handleInvalidInput(formInfo.invalidFields, this.state.orderForm);
    } else {
      // Showing the spinner
      this.props.startLoading();

      // Configuring data to send in the post request
      const dataToPost = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customerData: formInfo.formData,
        userId: this.props.userId,
      };
      this.props.postForm(dataToPost, this.props.token);

      /* Now all that's left is redirecting the user to the main page page if the transiction
        went well, to do so, we have two options:
          1) Pass the history object (this.props.history) to to postForm method, so in the reducer we can use the push() method
            to redirect the user.
          2) Or, and that's the approch we are taking, is using redux, by managing a new state (let's call it purchasedBurgerSuccessfully) in our orders' reducer.
             purchasedBurgerSuccessfully is a bool that is initially set to false, once the burger purshase is successful, we set it true. We conditionally render a Redirect
             component (from router package) in Checkout.js to redirect the user.
      */
    }
  };

  // Used for changing the placeholder value and the color of the input when user inputs an invalid input
  handleInvalidInput = (fields, orderFormObj) => {
    const orderForm = formUtils.handleInvalidInputHelper(fields, orderFormObj);
    this.setState({
      orderForm,
    });
  };

  // Called in focusInHandler() method to reset the placeholders and the color in case the user has entered a wrong filed
  resetFields = (orderFormObj) => {
    const orderForm = formUtils.resetFieldsHelper(orderFormObj);
    this.setState({
      orderForm,
    });
  };

  // Determins the color of the input field (red or green), if the user has entered it before
  focusInHandler = (field, orderFormObj) => {
    // We call it in case the user has entered an invalid input to restore the field to its original state
    this.resetFields(orderFormObj);
    const orderForm = formUtils.focusInHandlerHelper(field, orderFormObj);
    if (orderForm) {
      this.setState({
        orderForm,
      });
    }
  };

  // We use that method to always turn the color of the input field to Default (white) when he leaves the input field
  focusOutHandler = (field, orderFormObj) => {
    const orderForm = formUtils.focusOutHandlerHelper(field, orderFormObj);
    this.setState({
      orderForm,
    });
  };

  formFieldChangehandler = (field, value, formObj) => {
    // Getting an updated form object
    const updatedForm = formUtils.getUpdatedFormObject(field, value, formObj);

    // Updating the state
    this.setState({
      orderForm: updatedForm,
    });
  };

  render() {
    // Getting the form fields
    let form = [];
    const orderFormObj = this.state.orderForm;
    for (let field in orderFormObj) {
      //console.log(field);
      form.push(
        <Input
          key={field}
          elementType={orderFormObj[field].elementType}
          elementConfig={orderFormObj[field].elementConfig}
          value={orderFormObj[field].value}
          changeHandler={(event) => {
            this.formFieldChangehandler(
              field,
              event.target.value,
              this.state.orderForm
            );
          }}
          backGroundColor={orderFormObj[field].backGroundColor}
          focusOut={() => {
            this.focusOutHandler(field, this.state.orderForm);
          }}
          focusIn={() => {
            this.focusInHandler(field, this.state.orderForm);
          }}
          errorText={orderFormObj[field].error}
        />
      );
    }
    form.push(
      <div className={classes.btn} key="btn">
        {/* buttonClicked={this.submitForm} */}
        <Button buttonType="Success">Order</Button>
      </div>
    );

    // Determining wether we show the form of the spinner
    let formContainer = (
      <React.Fragment>
        <h4>Please Fill out the Form</h4>
        <form
          onSubmit={(event) => {
            this.submitForm(event, this.state.orderForm);
          }}
        >
          {form}
        </form>
      </React.Fragment>
    );
    if (this.props.loading) {
      formContainer = <Spinner />;
    }

    return <div className={classes.Form}>{formContainer}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
    // orders: state.orders.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postForm: (dataToPost, token) => {
      dispatch(actions.startedFormPost(dataToPost, token));
    },
    startLoading: () => {
      dispatch(actions.loadingPostingForm());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withError(CheckOutForm, axios)));
