import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../components/hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-instance";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  // Here we are reaching to the server to get our ingredients data.
  async componentDidMount() {
    // Dispatching to the reducer to get the ingredients
    this.props.loadBurgerIngredients();
  }

  orderBurgerHandle = () => {
    // In case user is not authenticated, we redirect him to auth page
    if (!this.props.token) {
      this.props.history.push("/auth");
    } else {
      this.setState({
        showModal: true,
      });
    }
  };

  hideModalHandler = () => {
    this.setState({
      showModal: false,
    });
  };

  continuePurshaseOrderHandler = () => {
    // To set the purchasedBurgerSuccessfully in orderReducer.js to false in case the user has purchased a burger before
    this.props.initBurgerPurchasing();

    // Directing the user to the check-out page (Checkout.js Componenet)
    this.props.history.push("/check-out");
  };

  render() {
    // Here, i am just creating an object the same as this.state.ingredients except the values are not numbers,
    // but bools to indicate wether I shold disable the Less button (of ingredients) or not
    // All buttons will be disabled if there are no igredients (count 0), except meat ofcourse,
    // there should be at least 1 (it's a hamburger after all)
    let disabledIngredients = { ...this.props.ingredients };
    for (let key in disabledIngredients) {
      if (key === "meat") {
        disabledIngredients[key] = disabledIngredients[key] <= 1;
      } else {
        disabledIngredients[key] = disabledIngredients[key] <= 0;
      }
    }

    // Checking if ingredients data is retrieved from the server
    let orderSummary = <Spinner />;
    let burgerAndControls;
    if (this.props.error) {
      burgerAndControls = (
        <h1 style={{ textAlign: "center" }}>
          Server Error! Please try again later
        </h1>
      );
    } else {
      burgerAndControls = <Spinner />;
    }

    if (this.props.ingredients) {
      burgerAndControls = (
        <Aux>
          {/* Burger Img */}
          <Burger />
          {/* Burger Builder Controls */}
          <BuildControls
            isAuth={this.props.token ? true : false}
            moreHandler={this.props.addIngredientHandler}
            lessHandler={this.props.removeIngredientHandler}
            disabled={disabledIngredients}
            orderBurger={this.orderBurgerHandle}
          ></BuildControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          continueOrder={this.continuePurshaseOrderHandler}
          cancelOrder={this.hideModalHandler}
        />
      );
    }

    return (
      <Aux>
        {/* Modal
        Note that by default it's not visible, I didn't conditionally decide wether it should be displayed or not
        as it is always shown, in the styling of it I just put it really up on the screen (transformY:-100vh) and I make it really transparent(opacity:0),
        the reason I am doing this, is I want to render with these styling so when the styling changes, the animation kicks in.
        If I conditionally hid it from the start, it wouldn't have been wrong, it's just that the animation wouldn't play
        */}
        <Modal isShown={this.state.showModal} hideModal={this.hideModalHandler}>
          {orderSummary}
        </Modal>
        {/* Burger and Burger Builder Controls*/}
        {burgerAndControls}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchIngredientsAndPrice: (ingredients, price) => {
      return dispatch(
        actions.updateIngredientsAndPrice({
          payload: { ingredients: ingredients, totalPrice: price },
        })
      );
    },
    addIngredientHandler: (type) => {
      return dispatch(actions.addIngredient({ ingredient: type }));
    },
    removeIngredientHandler: (type) => {
      return dispatch(actions.removeIngredient({ ingredient: type }));
    },
    loadBurgerIngredients: () => {
      return dispatch(actions.loadIngredients());
    },
    initBurgerPurchasing: () => {
      return dispatch(actions.resetBurgerPurshasedStatus());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
