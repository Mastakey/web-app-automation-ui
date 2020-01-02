//app reducers
import {
  CREATE_FIELD,
  READ_FIELD_ALL,
  READ_FIELD_APP,
  READ_FIELD,
  UPDATE_FIELD,
  DELETE_FIELD
} from "../types";

const initialState = {
  fields: [],
  field: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_FIELD_ALL:
      return {
        ...state,
        loading: false,
        fields: action.payload
      };
    case READ_FIELD_APP:
      return {
        ...state,
        loading: false,
        fields: action.payload
      };
    case READ_FIELD:
      return {
        ...state,
        loading: false,
        CREATE_FIELD: action.payload
      };
    case CREATE_FIELD:
      return {
        ...state,
        loading: false,
        fields: [...state.fields, action.payload]
      };
    case DELETE_FIELD:
      return {
        ...state,
        loading: false
      };
    case UPDATE_FIELD:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
