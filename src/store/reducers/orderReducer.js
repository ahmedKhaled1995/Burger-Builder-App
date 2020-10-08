import * as actions from "../actions/actionTypes";

const initalState = {
  // orders: [],
  loading: false,
  purchasedBurgerSuccessfully: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.LOADING_POSTING_FORM:
      return {
        ...state,
        loading: true,
      };
    case actions.FORM_POST_SUCCESS:
      return {
        ...state,
        // orders: state.orders.concat({
        //   id: action.orderId,
        //   ...action.orderData,
        // }),
        loading: false,
        purchasedBurgerSuccessfully: true,
      };
    case actions.FORM_POST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case actions.RESET_BURGUR_PURCHASED_STATUS:
      return {
        ...state,
        purchasedBurgerSuccessfully: false,
      };
    default:
      return state;
  }
};

export default reducer;
