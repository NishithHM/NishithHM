import { API_DONE, API_IN_PROGRESS } from "../types";

const initial_state = {
  loading: false
};

export default (state = initial_state, action) => {
  const { type } = action;
  switch (type) {
    case API_IN_PROGRESS:
      return {
        ...state,
        loading: true
      };
    case API_DONE:
      return {
        ...state,
        loading: false
      };
    default:
      return {...state}
  }
};
