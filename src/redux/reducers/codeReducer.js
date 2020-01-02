//app reducers
import {
  CREATE_CODE,
  READ_CODE_APP,
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
    case CREATE_CODE:
      return {
        ...state,
        loading: false,
        codes: [...state.fields, action.payload]
      };
    default:
      return state;
  }
}
