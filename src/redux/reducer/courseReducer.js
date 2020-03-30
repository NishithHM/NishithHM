import { GET_BATCH_FAIL, GET_BATCH_PASS } from "../types";

const initialState = {
  batchData: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BATCH_PASS:
      return {
        ...state,
        batchData: payload
      };
    case GET_BATCH_FAIL: {
      return {
        ...state,
        batchData: []
      };
    }

    default:
      return {
        ...state
      };
  }
};
