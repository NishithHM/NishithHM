import {
  USER_LIST_FAIL,
  USER_LIST_PASS,
  API_IN_PROGRESS,
  API_DONE,
  USER_PAYMENT_FAIL,
  USER_PAYMENT_PASS
} from "../types";
import { getService,putService } from "../../services";

export const getUserList = () => {
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    getService("/user/list/data")
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: USER_LIST_PASS,
          payload: res.data.payload
        });
      })
      .catch(e => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: USER_LIST_FAIL
        });
      });
  };
};

export const updateUserPayment = (phone, paymentStatus, batchDetails) => {
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    putService("/user",{phone, paymentStatus, batchDetails})
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: USER_PAYMENT_PASS,
        //   payload: res.data.payload
        });
        dispatch(getUserList())
      })
      .catch(e => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: USER_PAYMENT_FAIL
        });
      });
  };
};
