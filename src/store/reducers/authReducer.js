import * as actions from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_STARTED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
      };
    case actions.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actions.AUTH_LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
