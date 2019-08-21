import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard.js";
import Map from "./Components/Map.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Components/login";
import Form from "./Components/Form";
import socket from "./socket";
import Popup from "./Components/popUp";

class App extends Component {

  render() {
    const LoginComponent = () => <Login />;

    const MainPageComponent = () => (
      <div className="App">
        <Dashboard socket={socket} />
        <div id="content">{<Map />}</div>
        <Popup />
        <Form socket={socket} />
      </div>
    );

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route exact path="/dashboard" component={MainPageComponent} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(App);
