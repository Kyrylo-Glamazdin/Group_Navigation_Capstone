import React, { Component } from "react"; //dsadsadsa
import "../styles/login.css";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="loginbox">
        <h1 className="login">LOGIN</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="password" />
        <button className="loginbtn">Login</button>
      </div>
    );
  }
}

export default Login;
