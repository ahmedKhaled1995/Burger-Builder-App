import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-instance";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";
import Modal from "../../components/UI/Modal/Modal";
import ConfirmAction from "../../components/UI/ConfirmAction/ConfirmAction";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  // Used to manage local UI state of buttons (should buttons be disabled or not)
  state = {
    buttons: [], // will hold bools. True means button should not be disabled, false means it should be disabled
    modalShown: false,
  };

  async componentDidMount() {
    // Getting orders to render each oreder component
    this.props.getUserOrders(this.props.token, this.props.userId);
    /* const localToken = localStorage.getItem("token");
    const localTokenExpireationDate = localStorage.getItem(
      "tokenExpirationDate"
    );
    // The reason I am getting the token and checking if it's valid is to handle the case where user go to orders page and refreshes the page
    if (new Date(localTokenExpireationDate) > new Date()) {
      this.props.getUserOrders(localToken);
    } else {
      this.props.getUserOrders(this.props.token);
    } */

    // All buttons shoulb be enabled at first
    const buttonsState = this.props.orders.map(() => {
      return false;
    });
    this.setState({
      buttons: buttonsState,
    });
  }

  componentDidUpdate(prevProps) {
    // We bascially check if disableDeleteButton porperty (we get it from ordersReducer) changes from true to false, that indicated the delete operation ended.
    // Now wether it ended in success or failure, we re-enable all the delete buttons of the orders
    if (!this.props.disableDeleteButton && prevProps.disableDeleteButton) {
      const buttonsState = this.props.orders.map(() => {
        return false;
      });
      this.setState({
        buttons: buttonsState,
      });
    }
  }

  // Called in render method to stringfy the ingredients object
  getIngredientsString = (ingredientsObj) => {
    let objStr = "";
    for (let key in ingredientsObj) {
      objStr += ` ${key}: ${ingredientsObj[key]}`;
    }
    return objStr;
  };

  hideModalHandler = () => {
    this.setState({
      modalShown: false,
    });
  };

  deleteOrderHandler = (id, index) => {
    // Showing the modal
    this.setState({
      modalShown: true,
    });

    // Storing the clicked button data (id and index) in an instance variable
    this.clickedButton = {
      id,
      index,
    };
  };

  confirmActionHandler = () => {
    // Hiding the modal
    this.hideModalHandler();

    // I disable the button when the user clicks on it to delete the order. Remeber clickedButton is an instance variable
    const buttonsState = [...this.state.buttons];
    buttonsState[this.clickedButton.index] = true;
    this.setState({
      buttons: buttonsState,
    });

    // Dispatching the delete action
    this.props.deleteUserHandler(this.clickedButton.id, this.props.token);
  };

  declineActionHandler = () => {
    // Hiding the modal
    this.hideModalHandler();
  };

  render() {
    let orders;
    // Case: Connection to server faluire
    if (this.props.error) {
      orders = (
        <p style={{ textAlign: "center" }}>Error Connecting to the server</p>
      );
      // Case: Loading Data
    } else if (this.props.loading) {
      orders = <Spinner />;
      // Case: Connection to the server success but there are no orders
    } else if (!this.props.loading && this.props.orders.length === 0) {
      orders = (
        <p style={{ textAlign: "center" }}>There are no orders available</p>
      );
      // Case: Connection to the server success and there are orders
    } else {
      orders = this.props.orders.map((order, index) => {
        const ingredientsStr = this.getIngredientsString(order.ingredients);
        return (
          <Order
            key={order.id}
            ingredients={ingredientsStr}
            price={order.price}
            deleteClicked={() => {
              this.deleteOrderHandler(order.id, index);
            }}
            //disabled={this.props.disableDeleteButton} //This will disable all delete buttons of all orders when a single order delete button is clicked, which is not ideal.
            disabled={this.state.buttons[index]}
          />
        );
      });
    }
    return (
      <div>
        <Modal
          isShown={this.state.modalShown}
          hideModal={this.hideModalHandler}
        >
          <ConfirmAction
            action="delete this order"
            confirmAction={this.confirmActionHandler}
            declineAction={this.declineActionHandler}
          />
        </Modal>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    error: state.orders.error,
    disableDeleteButton: state.orders.disableDeleteButton,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrders: (token, id) => {
      return dispatch(actions.startedLoadingOrders(token, id));
    },
    deleteUserHandler: (id, token) => {
      return dispatch(actions.deleteOrder(id, token));
    },
    checkAuthState: () => {
      dispatch(actions.checkAuthState());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
