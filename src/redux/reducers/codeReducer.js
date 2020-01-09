//app reducers
import {
  CREATE_CODE,
  READ_CODE_APP,
  READ_CODE_OBJ,
  DELETE_CODE
} from "../types";

const initialState = {
  codes: [],
  code: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_CODE_APP:
      return {
        ...state,
        loading: false,
        codes: action.payload
      };
    case READ_CODE_OBJ:
      return {
        ...state,
        loading: false,
        codes: action.payload
      };
    case CREATE_CODE:
      return {
        ...state,
        loading: false,
        codes: [...state.codes, action.payload]
      };
    case DELETE_CODE:
      //payload will have the id of deleted item
      const id = action.payload.id;
      return {
        ...state,
        loading: false,
        codes: state.codes.filter(code => code.id !== id)
      };
    default:
      return state;
  }
}
