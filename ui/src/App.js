import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard.js";
import Map from "./Components/Map.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Components/login";
import Form from "./Components/Form";
import socket from "./socket";
import Popup from "./Components/popUp";
import Chat from "./Components/Chat";

/*** This is the main file of the application ***/

class App extends Component {
  constructor() {
    super();
    this.state = {
      formPreviousState: false,
      popPreviousState: false,
      showForm: false,
      showPop: false,
      chatBtn: "Chat",
      chatActive: false
    };
  }
  toggleForm = async () => {
    document.querySelector(".searchForm").classList.add("activ");
    document.querySelector("#overlay").classList.add("activ");
  };

  //closes the nav bar
  closeNav = () => {
    this.state.closing = setTimeout(() => {
      document.getElementById("dashboard").classList.remove("activ");
    }, 10000);
  };

  pop = async () => {
    document.querySelector(".popup").classList.remove("activ");
    document.querySelector("#overlay").classList.remove("activ");
    this.closeNav();
  };

  clear = () => {
    clearTimeout(this.state.closing);
  };

  render() {
    //create a login component
    const LoginComponent = () => <Login />;

    //MainPageComponent gets Dashboard, Invitations Popup, Map, Group Creation Form, and Chat components as props
    const MainPageComponent = () => (
      <div className="App">
        <Dashboard
          socket={socket}
          toggleForm={this.toggleForm}
          closeNav={this.closeNav}
          clear={this.clear}
          pop={this.pop}
        />
        <div id="content">{<Map />}</div>
        <Popup pop={this.pop} closeNav={this.closeNav} socket = {socket}/>
        {}
        <div>
          <div onMouseOver={this.clear}>
            <Form
              socket={socket}
              toggleForm={this.toggleForm}
              closeNav={this.closeNav}
            />
            {}
          </div>
        </div>
        <Chat socket = {socket}/>
      </div>
    );

    //set up the routes
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
