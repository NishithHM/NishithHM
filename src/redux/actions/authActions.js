import {
  API_DONE,
  API_IN_PROGRESS,
  LOGIN_PASS,
  LOGIN_FAIL,
  SIGN_UP_PASS,
  SIGN_UP_FAIL,
  UPDATE_FAIL,
  UPDATE_PASS
} from "../types";
import { postService, getService, putService } from "../../services";

export const login = (phone, password, history) => {
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    postService(
      "/login",
      {
        phone,
        password
      },
      false
    )
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: LOGIN_PASS,
          payload: res.data.payload.user
        });
        sessionStorage.setItem("user_token", res.data.payload.token);
        sessionStorage.setItem("phone", res.data.payload.user.phone);
        if (res.data.payload.user.role === "user") history.push("/courses");
        else {
          history.push("/admin");
        }
      })
      .catch(e => {
        console.log(e);
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };
};

export const signUp = (phone, password, name, place, history) => {
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    postService(
      "/user",
      {
        phone,
        password,
        name,
        place,
        role: "user"
      },
      false
    )
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: SIGN_UP_PASS
        });
      })
      .catch(e => {
        console.log(e);
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: SIGN_UP_FAIL
        });
      });
  };
};

export const userUpdate = (phone, history) => {
  return dispatch => {
    dispatch({
      type: API_IN_PROGRESS
    });
    getService(`/user/details/by/${phone}`)
      .then(res => {
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: UPDATE_PASS,
          payload: res.data.payload
        });
      })
      .catch(e => {
       history && history.push("/");
        sessionStorage.clear();
        dispatch({
          type: API_DONE
        });
        dispatch({
          type: UPDATE_FAIL
        });
      });
  };
};

export const updatePlayDateAndTime = (lastPlayed, phone) => {
  return dispatch => {
    putService("/user", { lastPlayed, phone }).then(res=>{
        dispatch(userUpdate(phone))
    });
  };
};

export const deleteVideo = (video, completed, history) => {
    const phone = sessionStorage.getItem('phone')
  return dispatch => {
    dispatch(updatePlayDateAndTime("", phone))
    putService("/user/video", { video, completed }).then(res => {
        history.push('/courses')
    });
  };
};
