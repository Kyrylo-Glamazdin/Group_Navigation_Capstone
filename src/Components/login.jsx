import React, { Component } from "react"; //dsadsadsa
import { Redirect } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import _ from "lodash";

class Login extends Component {
  state = {
    acc: {
      email: "",
      password: "",
      name: "",
      lat: 40.771835,
      long: -73.974812
    },
    error: "",
    log: true
  };

  inchange = async ev => {
    let acc = this.state.acc;
    acc[ev.target.name] = ev.target.value;
    await this.setState({ acc });
  };

  api = () => {
    if (this.state.log) return "http://localhost:4000/api/auth";
    else return "http://localhost:4000/api/users";
  };

  submit = async ev => {
    try {
      // console.log(this.props);
      let acc = this.state.acc;
      if (this.state.log) {
        acc = _.pick(this.state.acc, ["email", "password", "lat", "long"]);
      }

      this.setState({ error: "Logging in ..." });
      let res = await axios.post([this.api()], acc);

      await this.setState({ error: res.data });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 1000);
      localStorage.setItem("token", res.headers["x-auth-token"]);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        await this.setState({ error: err.response.data });
        setTimeout(() => {
          this.setState({ error: "" });
        }, 2000);
        console.log(this.state.error);
      }
    }
  };

  gogogo = () => {
    setTimeout(() => {
      this.setState({ log: !this.state.log });
    }, 200);
  };

  render() {
    if (localStorage.token) {
      return <Redirect to="/dashboard" />;
    } else
      return (
        <div>
          {this.state.log && (
            <div className="loginbox">
              <h1 className="login">LOGIN</h1>
              <input
                name="email"
                onChange={this.inchange}
                type="text"
                placeholder="Email"
              />
              <input
                name="password"
                onChange={this.inchange}
                type="password"
                placeholder="Password"
              />
              <div className="errbox">
                <div className="msg">{this.state.error}</div>
              </div>
              <div className="btnbox">
                <button onClick={this.submit} className="loginbtn">
                  Login
                </button>
                <button onClick={this.gogogo} className="loginbtn">
                  Sign up
                </button>
              </div>
            </div>
          )}
          {!this.state.log && (
            <div className="loginbox">
              <h1 className="login regi">SIGN UP</h1>
              <input
                className="reg"
                name="name"
                onChange={this.inchange}
                type="text"
                placeholder="Name"
              />
              <input
                className="reg"
                name="email"
                onChange={this.inchange}
                type="text"
                placeholder="Email"
              />
              <input
                className="reg"
                name="password"
                onChange={this.inchange}
                type="password"
                placeholder="Password"
              />
              <div className="errbox">
                <div className="msg">{this.state.error}</div>
              </div>
              <div className="btnbox">
                <button onClick={this.submit} className="loginbtn">
                  Register
                </button>
                <button onClick={this.gogogo} className="loginbtn">
                  Cancel
                </button>
              </div>
            </div>
          )}
          {/* <div className="activ" id="overlay" /> */}
        </div>
      );
  }
}

export default Login;
