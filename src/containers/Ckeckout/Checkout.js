import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ChechoutForm from "./CheckoutForm/CheckoutForm";

const checkout = (props) => {
  const continueClickedHandler = () => {
    props.history.replace("/check-out/contact-data");
  };

  const cancelClickedHandler = () => {
    props.history.goBack();
  };

  // To avoid application crashing if the user reaches this page with empty ingredients (coming here normally then refreshing the page),
  // we check the ingredeints and if they are empty, we redirevt the user to the main page
  let ckeckOutSummary = <Redirect to="/" />;
  if (props.ingredients) {
    ckeckOutSummary = (
      <div>
        {props.purchasedBurgerSuccessfully ? <Redirect to="/" /> : null}
        <CheckoutSummary
          ingredients={props.ingredients}
          continueClicked={continueClickedHandler}
          cancelClicked={cancelClickedHandler}
        />
        {/* Route for CheckoutForm, note we were using component={ChechoutForm}, but we changed to render to be able to use props*/}
        <Route
          path={`${props.match.url}/contact-data`}
          component={ChechoutForm}
        />
      </div>
    );
  }

  return ckeckOutSummary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchasedBurgerSuccessfully: state.order.purchasedBurgerSuccessfully,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(checkout);
