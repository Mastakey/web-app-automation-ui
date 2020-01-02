import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";
import fieldReducer from "./reducers/fieldReducer";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import codeReducer from "./reducers/codeReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  app: appReducer,
  field: fieldReducer,
  code: codeReducer,
  UI: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
