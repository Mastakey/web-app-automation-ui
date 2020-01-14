//app reducers
import {
  CREATE_OBJECT,
  READ_OBJECT_APP,
  READ_OBJECT,
  LOADING_UI,
  SET_ERRORS,
  DELETE_OBJECT
} from "../types";
import axios from "axios";

export const getObj = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const obj = await axios.get("/obj/" + id);
    dispatch({ type: READ_OBJECT, payload: obj.data });
    return obj;
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getObjectsByApp = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const objects = await axios.get("/app/" + id + "/obj");
    dispatch({ type: READ_OBJECT_APP, payload: objects.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createObject = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const app = await axios.post("/obj", {
      name: data.name,
      description: data.description,
      type: data.type,
      options: data.options,
      appId: data.appId
    });
    console.log(app);
    dispatch({ type: CREATE_OBJECT, payload: app.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteObj = (id, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const obj = await axios.delete("/obj/" + id);
    console.log(obj);
    dispatch({ type: DELETE_OBJECT, payload: obj.data });
    history.push("/app");
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};
