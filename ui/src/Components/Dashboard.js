import React, { Component } from "react";
import decode from "jwt-decode";
import { loginUser, addUsers, addGroups } from "../Actions";
import "./Dashboard.css";
import GroupGrid from "./GroupGrid";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      inviteGroup: "",
      inviteSender: ""
    };
    this.openNav = this.openNav.bind(this);
  }

  componentDidMount = async () => {
    let user = null;
    if (localStorage.token) {
      //Stores loged in user information in the redux store
      user = decode(localStorage.getItem("token"));
      this.props.loginUser(user);
    }
    console.log("Run");

    setTimeout(() => {
      document.getElementById("dashboard").classList.add("activ");
    }, 100);

    await axios
      .put("http://localhost:4000/api/users", { user }) //on dashboard init, we will retrieve a list of all
      .then(res => {
        //other users from the database to select from, and store them in the redux store
        this.props.addUsers(res.data);
      })
      .catch(err => console.log(err));

    try {
      let response = await axios.put("http://localhost:4000/api/users/id", {
        id: user.id
      }); //return logged in user
      let groupsArr = response.data[0].Groups;
      for (let i = 0; i < groupsArr.length; i++) {
        let group = groupsArr[i].id;
        let users = await axios.put("http://localhost:4000/api/groups", {
          id: group
        }); //returns a list of all users assosiated to the group
        groupsArr[i].users = users.data;
        delete groupsArr[i].GroupUsers;
        let newGroup = {
          users: users.data,
          latitude: groupsArr[i].latitude,
          longitude: groupsArr[i].longitude
        };
        let path = await axios.post("http://localhost:4000/api/directions", {
          newGroup
        }); //get the paths for each user in that group
        groupsArr[i].paths = path.data; //assigns the paths of all users in this group to a paths property
      }
      this.props.addGroups(groupsArr); //Finally add all current user groups and paths to the redux store
    } catch (err) {
      console.log(err);
    }

    try {
      let loggedInUser = await axios.get(
        "http://localhost:4000/api/users/" + user.id
      );
      console.log(loggedInUser);
      this.setState({
        inviteGroup: loggedInUser.data.inviteGroup,
        inviteSender: loggedInUser.data.inviteSender
      });
    } catch (e) {
      console.log(e);
    }
  };

  openNav() {
    this.props.clear();
    document.getElementById("dashboard").classList.add("activ");
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
    } else if (this.state.inviteGroup !== "") {
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

          <GroupGrid socket={this.props.socket} pop={this.props.pop} />

          <div className="msgbox">
            <div className="msgup">
              <div id="invitag"> Invitations:</div>
            </div>
            <ul className="msgbtm">
              {
                /* {this.state.invitations.map(invite => (
                <li>{`${this.state.invitations[0]} has invited you to join ${this.state.invitations[1]}`}</li>
              ))} */
                <li className="inviMsg">
                  {`${this.state.inviteSender} has invited you to join ${
                    this.state.inviteGroup
                  }`}
                </li>
              }
            </ul>
          </div>

          <button className="createbtn dashbtn" onClick={this.props.toggleForm}>
            Create New Group
          </button>
        </div>
      );
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

          <GroupGrid socket={this.props.socket} pop={this.props.pop} />
          <div className="msgbox">
            <div className="msgup"> Invitations: </div>
            <ul className="msgbtm" />
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
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  { loginUser, addUsers, addGroups }
)(Dashboard);
