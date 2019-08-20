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
import axios from 'axios';

class App extends Component {
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
  return {};
};

export default connect(
  mapStateToProps,
  {addUsers,addGroups}
)(App);
