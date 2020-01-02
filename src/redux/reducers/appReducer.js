//app reducers
import { CREATE_APP, READ_APP_ALL, READ_APP, UPDATE_APP, DELETE_APP } from "../types";

const initialState = {
  apps: [],
  app: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case READ_APP_ALL:
      return {
        ...state,
        loading: false,
        apps: action.payload
      };
    case READ_APP:
      return {
        ...state,
        loading: false,
        app: action.payload
      };
    case CREATE_APP:
      return {
        ...state,
        loading: false,
        apps: [...state.apps, action.payload]
      };
    case DELETE_APP:
      return {
        ...state,
        loading: false
      };
    case UPDATE_APP:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
