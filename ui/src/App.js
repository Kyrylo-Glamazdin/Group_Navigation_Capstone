import React, { Component } from "react";
import decode from "jwt-decode";
import "./App.css";
import Dashboard from "./Components/Dashboard.js";
import Map from "./Components/Map.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Components/login";
import Form from "./Components/Form";
import socket from "./socket";
import { loginUser } from "./Actions";
import Popup from "./Components/popUp";

class App extends Component {
  componentDidMount = async () => {
    try {
      const user = decode(localStorage.token);
<<<<<<< HEAD
      console.log("!!!!!!", this.props.user);
      await this.props.loginUser(user);
      console.log("!!!!!!", this.props.user);
      //Add user to store
      // console.log("!!!!!!!", user);
=======
      //Add user to store
>>>>>>> ea689e5e0accf1cb7969af1bf52c6d77acac940e
    } catch (error) {
      // console.log( this.props);
      // window.location = "/";
    }
  };

  render() {
    const LoginComponent = () => <Login />;

    const MainPageComponent = () => (
      <div className="App">
        <Dashboard socket={socket} />
        <div id="content">{<Map />}</div>
        <Popup />
      </div>
    );

    const FormComponent = () => <Form socket={socket} />;

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={MainPageComponent} />
          {/* <Route
            exact
            path="/dashboard"
            render={props => {
              if (user) return <Redirect to="/" />;
              else return <h1>12321321</h1>;
            }}
          /> */}
          <Route exact path="/dashboard/form" component={FormComponent} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
<<<<<<< HEAD
  return {
    user: state.login
  };
=======
  return {};
>>>>>>> ea689e5e0accf1cb7969af1bf52c6d77acac940e
};

const mapAction = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapAction
)(App);
