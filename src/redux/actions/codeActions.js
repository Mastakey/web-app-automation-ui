//app reducers
import {
  CREATE_CODE,
  READ_CODE_APP,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../types";
import axios from "axios";

export const getCodeByApp = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const codes = await axios.get("/app/" + id + "/code");
    dispatch({ type: READ_CODE_APP, payload: codes.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createCode = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.post("/code", {
      name: data.name,
      description: data.description,
      type: data.type,
      appId: data.appId
    });
    console.log(code);
    dispatch({ type: CREATE_CODE, payload: code.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};
