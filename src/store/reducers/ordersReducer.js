import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  disableDeleteButton: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOADING_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.LOADING_ORDERS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.DELETE_ORDER_LOADING:
      return {
        ...state,
        disableDeleteButton: true,
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      const updatedOrders = state.orders.filter((order) => {
        return order.id !== action.id;
      });
      return {
        ...state,
        orders: updatedOrders,
        disableDeleteButton: false,
      };
    case actionTypes.DELETE_ORDER_FAIL:
      return {
        ...state,
        //error: action.error,
        disableDeleteButton: false,
      };
    default:
      return state;
  }
};

export default reducer;
