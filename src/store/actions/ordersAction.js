import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

const ordersLoading = () => {
  return {
    type: actionTypes.ORDERS_LOADING,
  };
};

const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  };
};

const loadingOrdersSuccess = (res) => {
  return {
    type: actionTypes.LOADING_ORDERS_SUCCESS,
    orders: res,
  };
};

const loadingOrdersFailure = (e) => {
  return {
    type: actionTypes.LOADING_ORDERS_FAILURE,
    error: e,
  };
};

export const startedLoadingOrders = (token, userId) => {
  return async (dispatch) => {
    dispatch(ordersLoading()); // To Show the Spinner
    try {
      const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
      const res = await axios.get(`/orders.json${queryParams}`);
      // Connection successful but user has no orders
      if (!res.data) {
        dispatch(stopLoading());
        // Connection successful and user has orders
      } else {
        let ordersArray = [];
        // In case you forget, console log the res.data object
        // The jest is, res.data is an object of our orders, the key is the id created by firebase, the value is an object which
        // is the data we posted. ex:
        /*
                res.data = { 
                  -MGDkKeD5esG9NZbr-xG: {
                    customerData: {Country: "United States", DeliveryMethod: "fastest", Email: "hassanin@udel.edu", Name: "AAA", Street: "13 Pullard rd", …}
                    ingredients: {bacon: 0, cheese: 0, meat: 4, salad: 0}
                    price: 7.9,
                  }, 
                  -MGFbKM6esG9NZbr-lF: {
                    customerData: {Country: "United States", DeliveryMethod: "fastest", Email: "hassanin@udel.edu", Name: "AAA", Street: "13 Pullard rd", …}
                    ingredients: {bacon: 0, cheese: 0, meat: 4, salad: 0}
                    price: 5.5,
                  }, 
                } 
              */
        for (let key in res.data) {
          ordersArray.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(loadingOrdersSuccess(ordersArray));
      }
    } catch (e) {
      dispatch(loadingOrdersFailure(e));
    }
  };
};

const deleteOrderLoading = () => {
  return {
    type: actionTypes.DELETE_ORDER_LOADING,
  };
};

const deleteOrderSuccess = (id) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    id: id,
  };
};

const deleteOrderFail = (e) => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error: e,
  };
};

export const deleteOrder = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteOrderLoading());
    const url = `https://react-burger-ab7b0.firebaseio.com/orders/${id}.json?auth=${token}`;

    let res = await axios.delete(url);
    if (res) {
      dispatch(deleteOrderSuccess(id));
    } else {
      dispatch(deleteOrderFail("Server Error"));
    }
  };
};
