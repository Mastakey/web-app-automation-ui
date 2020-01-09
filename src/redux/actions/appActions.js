import {
  CREATE_APP,
  READ_APP_ALL,
  READ_APP,
  UPDATE_APP,
  DELETE_APP,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../types";
import axios from "axios";

export const getApps = () => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const apps = await axios.get("/app");
    dispatch({ type: READ_APP_ALL, payload: apps.data });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getApp = (id) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const app = await axios.get("/app/"+id);
    dispatch({ type: READ_APP, payload: app.data });
    return app;
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createApp = (data) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const app = await axios.post("/app", {
      name: data.name,
      description: data.description,
      apIUrl: '',
      databaseURL: ''
    });
    console.log(app);
    dispatch({ type: CREATE_APP, payload: app.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const editApp = (id, app, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const appData = await axios.put(`/app/${id}`, app);
    dispatch({
      type: UPDATE_APP,
      payload: appData.data
    });
    dispatch({
      type: CLEAR_ERRORS,
      payload: []
    });
    history.push("/app");
  } catch (err) {
    console.log(err);
  }
};

export const deleteApp = (id, history) => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const app = await axios.delete("/app/" + id);
    console.log(app);
    dispatch({ type: DELETE_APP, payload: app.data });
    history.push("/app");
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

