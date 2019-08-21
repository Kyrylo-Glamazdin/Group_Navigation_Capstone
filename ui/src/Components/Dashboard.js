import React, { Component } from "react";
import decode from "jwt-decode";
import { loginUser, addUsers, addGroups } from "../Actions";
import "./Dashboard.css";
import GroupGrid from "./GroupGrid";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount = async () => {
    let user = null;
    if (localStorage.token) {   //Stores loged in user information in the redux store
      user = decode(localStorage.getItem("token"));
      this.props.loginUser(user);
    }

    await axios.put('http://localhost:4000/api/users', { user })  //on dashboard init, we will retrieve a list of all
      .then(res => {                //other users from the database to select from, and store them in the redux store
        this.props.addUsers(res.data);
      })
      .catch(err => console.log(err))

    try {
      let response = await axios.put('http://localhost:4000/api/users/id', {id: user.id}) //return logged in user
      let groupsArr = response.data[0].Groups
      for (let i = 0; i < groupsArr.length; i++) {
        let group = groupsArr[i].id;
        let users = await axios.put('http://localhost:4000/api/groups', {id :group}) //returns a list of all users assosiated to the group
        groupsArr[i].users = users.data;
        delete groupsArr[i].GroupUsers;
        let newGroup = {
          users: users.data,
          latitude: groupsArr[i].latitude,
          longitude: groupsArr[i].longitude
        }
        let path = await axios.post('http://localhost:4000/api/directions', { newGroup }) //get the paths for each user in that group
        groupsArr[i].paths =path.data; //assigns the paths of all users in this group to a paths property
      }
      this.props.addGroups(groupsArr); //Finally add all current user groups and paths to the redux store
    }
    catch (err) { console.log(err) }

  };

  openNav() {
    document.getElementById("dashboard").style.width = "25vw";
    document.getElementById("content").style.marginLeft = "25vw";
  }

  closeNav() {
    document.getElementById("dashboard").style.width = "1vw";
    document.getElementById("content").style.marginLeft = "1vw";
  }

  sendRequest = () => {
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
        <div id="dashboard" onMouseOut={this.closeNav} onMouseOver={this.openNav}>
          <div className="title" >
            Dashboard
          </div>
          <div> {this.props.login.name}</div>
          <GroupGrid socket={this.props.socket} />
          <button onClick={this.sendRequest}> Create New Group </button>
          <button onClick={this.logOut}> Log Out </button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  { loginUser, addUsers, addGroups }
)(Dashboard);
