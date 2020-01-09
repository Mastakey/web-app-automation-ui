//app reducers
import {
  CREATE_FIELD,
  READ_FIELD_APP,
  LOADING_UI,
  SET_ERRORS
} from "../types";
import axios from "axios";

export const getFieldsByObj = id => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const fields = await axios.get("/obj/" + id + "/field");
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
    let optionsStr = data.options;
    let optionsJson = {};
    if (optionsStr !== "") {
      optionsJson = JSON.parse(optionsStr);
    }
    const app = await axios.post("/field", {
      name: data.name,
      description: data.description,
      type: data.type,
      options: optionsJson,
      objId: data.objId
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