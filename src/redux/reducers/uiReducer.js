import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_BREADCRUMBS
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  breadcrumbs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload
      };
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
