import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/Navbar";

//Pages
import home from "./pages/home";
import app from "./pages/app";
import appview from "./pages/appview";
import appedit from "./pages/appedit";
import login from "./pages/login";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTH } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

//Auth
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-web-app-automation-f9ad3.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    //window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/app" component={app} />
              <Route exact path="/app/:id" component={appview} />
              <Route exact path="/app/edit/:id" component={appedit} />
              <Route exact path="/login" component={login} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}
export default App;
