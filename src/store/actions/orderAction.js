import * as actions from "../actions/actionTypes";
import axios from "../../axios-instance";

const formPostSuccess = (id, orderData) => {
  return {
    type: actions.FORM_POST_SUCCESS,
    orderId: id,
    orderData,
  };
};

const formPostFailure = (error) => {
  return {
    type: actions.FORM_POST_FAILURE,
    error: error,
  };
};

export const loadingPostingForm = () => {
  return {
    type: actions.LOADING_POSTING_FORM,
  };
};

export const startedFormPost = (dataToPost, token) => {
  return async (dispatch) => {
    //dispatch(loadingPostingForm());

    // Configuring axios http method
    const postConfig = {
      method: "post",
      url: `/orders.json?auth=${token}`, // FOR THE LOVE OF GOD DO NOT FORGET .json AFTER YOUR PATH
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      data: dataToPost,
    };

    // Making a post request to the server
    try {
      const res = await axios(postConfig);
      //console.log(res);
      dispatch(formPostSuccess(res.data.name, JSON.parse(res.config.data))); // Swcond argument to formPostSuccess can simply be dataToPost
    } catch (e) {
      dispatch(formPostFailure(e));
    }
  };
};

export const resetBurgerPurshasedStatus = () => {
  return {
    type: actions.RESET_BURGUR_PURCHASED_STATUS,
  };
};
