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
    // this.closeNav = this.closeNav.bind(this);
  } //dsadsahhh

  componentDidMount = () => {
    console.log("ondash: ");
    if (localStorage.token) {
      const user = decode(localStorage.getItem("token"));
      this.props.loginUser(user);
    }
    //
    // setTimeout(() => {
    //   document.getElementById("dashboard").classList.remove("activ");
    // }, 8000);
    setTimeout(() => {
      document.getElementById("dashboard").classList.add("activ");
    }, 100);
  };

  openNav() {
    console.log("openning");

    this.props.clear();

    // document.getElementById("dashboard").style.width = "25vw";
    // document.getElementById("content").style.marginLeft = "25vw";
    document.getElementById("dashboard").classList.add("activ");
  }

  // closeNav() {
  //   console.log("closing");
  //   // document.getElementById("dashboard").style.width = "1vw";
  //   // document.getElementById("content").style.marginLeft = "1vw";
  //   this.closing = setTimeout(() => {
  //     document.getElementById("dashboard").classList.remove("activ");
  //   }, 10000);
  // }

  sendRequest = async () => {
    // await axios.get('localhost:5000/users')
    // .then(res => {
    //     //send response to action creator
    //      this.props.addUsers(res);
    // })
    // .catch(e => {
    //     console.log(e);
    // })
    // await this.setState({ redirect: true });
    document.querySelector(".searchForm").classList.add("activ");
    document.querySelector("#overlay").classList.add("activ");
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
        <div
          id="dashboard"
          onMouseLeave={this.props.closeNav}
          onMouseOver={this.openNav}
          className="activ"
        >
          <div className="title">Dashboard</div>
          <div className="namefield">
            <img className="userImage dashimg" src={this.props.login.image} />
            <div className="usname">{this.props.login.name}</div>
            <button className="logout" onClick={this.logOut}>
              Log Out
            </button>
          </div>

          <GroupGrid pop={this.props.pop} />
          <div className="msgbox">
            <div className="msgup" />
            <div className="msgbtm" />
          </div>

          <button className="createbtn dashbtn" onClick={this.props.toggleForm}>
            Create New Group
          </button>
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
