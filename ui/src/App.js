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

class App extends Component {
  constructor() {
    super();
    this.state = {
      formPreviousState: false,
      popPreviousState: false,
      showForm: false,
      showPop: false
    };
  }

  toggleForm = async () => {
    document.querySelector(".searchForm").classList.add("activ");
    document.querySelector("#overlay").classList.add("activ");

    // if (this.state.showForm) {
    //   // setTimeout(() => {
    //   //   this.setState({ showForm: false });
    //   // }, 300);
    //   document.querySelector(".searchForm").classList.remove("activ");
    //   document.querySelector("#overlay").classList.remove("activ");
    //   return;
    // }
    // // await this.setState({ showForm: true });
    // setTimeout(() => {
    //   document.querySelector(".searchForm").classList.add("activ");
    //   document.querySelector("#overlay").classList.add("activ");
    // }, 100);
  };

  closeNav = () => {
    console.log("closing on app");
    this.state.closing = setTimeout(() => {
      document.getElementById("dashboard").classList.remove("activ");
    }, 10000);
  };

  pop = async () => {
    document.querySelector(".popup").classList.remove("activ");
    document.querySelector("#overlay").classList.remove("activ");
    this.closeNav();
    // if (this.state.showPop) {
    //   this.closeNav();
    //   setTimeout(() => {
    //     this.setState({ showPop: !this.state.showPop });
    //   }, 300);
    //   document.querySelector(".popup").classList.remove("activ");
    //   document.querySelector("#overlay").classList.remove("activ");
    //   return;
    // }
    // await this.setState({ showPop: !this.state.showPop });
    // setTimeout(() => {
    //   document.querySelector(".popup").classList.add("activ");
    //   document.querySelector("#overlay").classList.add("activ");
    // }, 100);
  };
  chatUnpop = () => {
    // document.querySelector("#overlay").classList.remove("activ");
    document.querySelector(".chatPopup").classList.remove("activ");
  };
  chatPop = () => {
    // document.querySelector("#overlay").classList.add("activ");
    document.querySelector(".chatPopup").classList.add("activ");
  };

  clear = () => {
    clearTimeout(this.state.closing);
    console.log("cleared on app");
  };

  render() {
    const LoginComponent = () => <Login />;

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
        <Popup pop={this.pop} closeNav={this.closeNav} />
        {/* {this.state.showPop && (
          <div onMouseOver={this.clear}>
            <Popup pop={this.pop} closeNav={this.closeNav} />
          </div>
        )} */}
        <div>
          <div onMouseOver={this.clear}>
            <Form
              socket={socket}
              toggleForm={this.toggleForm}
              closeNav={this.closeNav}
            />
            {/* <div className="" id="overlay" /> */}
          </div>
        </div>
        <div className="chatPopup">
          <div className="chatBar">
            <div id="msgtag1">Messages:</div>
          </div>
          <div id="msgInput">Input</div>
          <div onClick={this.chatUnpop} className="x2">
            &times;
          </div>
        </div>
        <div className="" id="overlay" />
        <div onClick={this.chatPop} className="chatbtn">
          Chat !
        </div>
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
