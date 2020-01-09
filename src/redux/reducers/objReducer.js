//app reducers
import {
  CREATE_OBJECT,
  READ_OBJECT_ALL,
  READ_OBJECT_APP,
  READ_OBJECT,
  UPDATE_OBJECT,
  DELETE_OBJECT
} from "../types";

const initialState = {
  objects: [],
  object: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_OBJECT_ALL:
      return {
        ...state,
        loading: false,
        objects: action.payload
      };
    case READ_OBJECT_APP:
      return {
        ...state,
        loading: false,
        objects: action.payload
      };
    case READ_OBJECT:
      return {
        ...state,
        loading: false,
        object: action.payload
      };
    case CREATE_OBJECT:
      return {
        ...state,
        loading: false,
        objects: [...state.objects, action.payload]
      };
    case DELETE_OBJECT:
      return {
        ...state,
        loading: false
      };
    case UPDATE_OBJECT:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
