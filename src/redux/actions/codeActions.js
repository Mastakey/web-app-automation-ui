//app reducers
import {
  CREATE_CODE,
  CREATE_CODES_UI,
  READ_CODE_APP,
  LOADING_UI,
  SET_ERRORS,
  DELETE_CODE,
  DELETE_CODES,
  CREATE_CODES
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

export const getCodeByObj = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const codes = await axios.get("/obj/" + id + "/code");
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
  let codeUrl = "";
  if (data.type === "functions") {
    codeUrl = "/functions";
  } else if (data.type === "service") {
    codeUrl = "/service";
  }
  try {
    const code = await axios.post(`/code${codeUrl}`, {
      name: data.name,
      description: data.description,
      type: data.type,
      appId: data.appId,
      objId: data.objId
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

export const createCodeService = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.post(`/code/service`, {
      appId: "",
      objId: data.objId
    });
    console.log(code);
    dispatch({ type: CREATE_CODES, payload: code.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createCodeController = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.post(`/code/controller`, {
      appId: "",
      objId: data.objId
    });
    console.log(code);
    dispatch({ type: CREATE_CODES, payload: code.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createCodeRoute = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.post(`/code/route`, {
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

export const deleteCode = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.delete("/code/" + id);
    console.log(code);
    dispatch({ type: DELETE_CODE, payload: code.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteAllCode = appId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.delete(`/app/${appId}/code`);
    console.log(code);
    dispatch({ type: DELETE_CODES, payload: [] });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createAllCodeUI = appId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const code = await axios.post(`/app/${appId}/code/ui/all`, {
      appId: appId
    });
    console.log(code);
    dispatch({ type: CREATE_CODES_UI, payload: [] });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};
