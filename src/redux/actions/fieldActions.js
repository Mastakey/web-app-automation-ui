//app reducers
import {
  CREATE_FIELD,
  READ_FIELD_ALL,
  READ_FIELD_APP,
  READ_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS
} from "../types";
import axios from "axios";

export const getFieldsByApp = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const fields = await axios.get("/app/" + id + "/field");
    dispatch({ type: READ_FIELD_APP, payload: fields.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const createField = data => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const app = await axios.post("/field", {
      name: data.name,
      description: data.description,
      type: data.type,
      options: data.options,
      appId: data.appId
    });
    console.log(app);
    dispatch({ type: CREATE_FIELD, payload: app.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};