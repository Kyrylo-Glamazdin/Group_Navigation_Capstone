import React, { Component } from "react";
import decode from "jwt-decode";
import { loginUser } from "../Actions";
import "./Dashboard.css";
import GroupGrid from "./GroupGrid";
import { Redirect } from "react-router";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  } //dsadsahhh

  componentDidMount = () => {
    console.log("ondash: ");
    if (localStorage.token) {
      const user = decode(localStorage.getItem("token"));
      this.props.loginUser(user);
    }
  };

  openNav() {
    document.getElementById("dashboard").style.width = "25vw";
    document.getElementById("content").style.marginLeft = "25vw";
  }

  closeNav() {
    document.getElementById("dashboard").style.width = "1vw";
    document.getElementById("content").style.marginLeft = "1vw";
  }

  sendRequest = async () => {
    // await axios.get('localhost:5000/users')
    // .then(res => {
    //     //send response to action creator
    //      this.props.addUsers(res);
    // })
    // .catch(e => {
    //     console.log(e);
    // })
    await this.setState({ redirect: true });
  };

  logOut = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/dashboard/form" />;
    } else if (!localStorage.token) {
      return <Redirect to="/" />;
    } else {
      return (
        <div id="dashboard">
          <div
            className="title"
            onMouseOut={this.closeNav}
            onMouseOver={this.openNav}
          >
            Dashboard
          </div>
          <div> {this.props.login.name}</div>
          <GroupGrid socket ={this.props.socket}/>
          <button onClick={this.sendRequest}> Create New Group </button>
          <button onClick={this.logOut}> Log Out </button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Dashboard);
