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
import Form from './Components/Form';
import socket from './socket';

class App extends Component {
  state = { user: null };
  componentDidMount = async () => {
    // console.log("!!!!!!", token);
    try {
      const user = decode(localStorage.token);
      await this.setState({ user });
    } catch (error) {
      // console.log( this.props);
      // window.location = "/";
    }
  };

  render() {
    const { user } = this.state;

    const LoginComponent = () => <Login />;

    const MainPageComponent = () => (
      <div className="App">
        <Dashboard />
        <div id="content">{<Map />}</div>
      </div>
    );

    const FormComponent = () => (<Form socket={socket}/>);

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
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  {}
)(App);
