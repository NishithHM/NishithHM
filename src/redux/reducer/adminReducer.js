import { USER_LIST_FAIL, USER_LIST_PASS } from "../types";

const initialState = {
  userList: [],
  listError: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST_PASS:
      return {
        ...state,
        userList: payload,
        listError: false
      };
    case USER_LIST_FAIL:
      return {
        ...state,
        userList: [],
        listError: true
      };

    default:
      return {
        ...state
      };
  }
};
