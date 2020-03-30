import {
  GET_BATCH_FAIL,
  GET_BATCH_PASS,
  API_DONE,
  API_IN_PROGRESS,
  USER_BATCH_PASS,
  USER_BATCH_FAIL
} from "../types";
import { getService, putService } from "../../services";
import { userUpdate } from "./authActions";

export const getBatchData = () => {
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    getService("/batch/details")
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: GET_BATCH_PASS,
          payload: res.data.payload
        });
      })
      .catch(e => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: GET_BATCH_FAIL
        });
      });
  };
};

export const updateUserBatch = (batchDetails, history) => {
  const phone = sessionStorage.getItem("phone");
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    putService("/user", { batchDetails, phone })
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: USER_BATCH_PASS,
          payload: res.data.payload
        });
        dispatch(userUpdate(phone));
      })
      .catch(e => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: USER_BATCH_FAIL
        });
      });
  };
};
