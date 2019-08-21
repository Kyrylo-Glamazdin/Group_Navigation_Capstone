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
import { addUsers, addGroups } from "./Actions";
import Popup from "./Components/popUp";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      showPop: false
    };
  }

  toggleForm = async () => {
    if (this.state.showForm) {
      setTimeout(() => {
        this.setState({ showForm: !this.state.showForm });
      }, 300);
      document.querySelector(".searchForm").classList.remove("activ");
      document.querySelector("#overlay").classList.remove("activ");
      return;
    }
    await this.setState({ showForm: !this.state.showForm });
    setTimeout(() => {
      document.querySelector(".searchForm").classList.add("activ");
      document.querySelector("#overlay").classList.add("activ");
    }, 100);
    //
    console.log("toggle form");
    //
    //
  };

  componentDidMount = async () => {
    // console.log("!!!!!!", token);
    try {
      const user = decode(localStorage.token);
      //Add user to store
    } catch (error) {
      // console.log( this.props);
      // window.location = "/";
    }

    // await axios.get('http://localhost:4000/api/users')
    // .then(res => {
    //   this.props.addUsers(res.data);
    // })
    // .catch(err => console.log(err))

    // await axios.get('http://localhost:4000/api/groups')
    // .then(res => {
    //   this.props.addGroups(res.data);
    // })
    // .catch(err => console.log(err))
  };

  closeNav = () => {
    console.log("closing on app");
    this.state.closing = setTimeout(() => {
      document.getElementById("dashboard").classList.remove("activ");
    }, 3000);
  };

  pop = async () => {
    if (this.state.showPop) {
      this.closeNav();
      setTimeout(() => {
        this.setState({ showPop: !this.state.showPop });
      }, 300);
      document.querySelector(".popup").classList.remove("activ");
      document.querySelector("#overlay").classList.remove("activ");
      return;
    }
    await this.setState({ showPop: !this.state.showPop });
    setTimeout(() => {
      document.querySelector(".popup").classList.add("activ");
      document.querySelector("#overlay").classList.add("activ");
    }, 100);
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

        {this.state.showPop && (
          <div onMouseOver={this.clear}>
            <Popup pop={this.pop} closeNav={this.closeNav} />
          </div>
        )}
        <div>
          {this.state.showForm && (
            <div onMouseOver={this.clear}>
              <Form
                socket={socket}
                toggleForm={this.toggleForm}
                closeNav={this.closeNav}
              />
              <div className="" id="overlay" />
            </div>
          )}
        </div>
        <div className="" id="overlay" />
      </div>
    );

    // const FormComponent = () => (

    // );

    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={MainPageComponent} />
        {/* <Route
            exact
            path="/dashboard"
            render={props => {
              if (user) return <Redirect to="/" />;
              else return <h1>12321321</h1>;
            }}
          /> */}
        {/* <Route exact path="/dashboard/form" component={FormComponent} /> */}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { addUsers, addGroups }
)(App);
