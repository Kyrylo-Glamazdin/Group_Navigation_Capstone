import React, { Component } from "react";
import decode from "jwt-decode";
import {
  loginUser,
  addUsers,
  addGroups,
  addInvitation,
  setInvitation,
  removeInvitation,
  removeGroups
} from "../Actions";
import "./Dashboard.css";
import GroupGrid from "./GroupGrid";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.openNav = this.openNav.bind(this);
  }

  componentDidMount = async () => {
    let user = null;
    if (localStorage.token) {
      //Stores loged in user information in the redux store
      user = decode(localStorage.getItem("token"));
      this.props.loginUser(user);
    }

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
      }); //return logged in user with its associated groups
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
        console.log(path);
        groupsArr[i].paths = path.data; //assigns the paths of all users in this group to a paths property
      }

      this.props.addGroups(groupsArr); //Finally add all current user groups and paths to the redux store
    } catch (err) {
      console.log(err);
    }

    //stores all invites for the loged in user to the redux store
    try {
      let response = await axios.put("http://localhost:4000/api/invitations", {
        id: this.props.login.id
      });
      console.log("CALLED");
      this.props.addInvitation(response.data);
    } catch (e) {
      console.log(e);
    }

    this.props.socket.on('refresh-add-groups', async(data)=>{
      try {
        let users = data.newGroup.users;
        console.log(data.newGroup);
        for (let i = 0; i < users.length; i++) {
          if (users[i].id === this.props.login.id) {
            this.props.addGroups(data.newGroup); //Finally add all current user groups and paths to the redux store
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    this.props.socket.on("refresh-existing-group", async data => {
      if (data.group.users.length == 0) {
        this.props.removeGroups(data.group);
        return;
      }
      let copy = data.group;
      let userId = data.userId;
      let userArr = copy.Users;
      copy.users = userArr;
      delete copy.Users;
      delete copy.userId;
      console.log(copy);

      let newGroup = {
        users: copy.users,
        latitude: copy.latitude,
        longitude: copy.longitude
      };
      let path = await axios.post("http://localhost:4000/api/directions", {
        newGroup
      });

      copy.paths = path.data;
      for (let i = 0; i < copy.users.length; i++) {
        if (copy.users[i].id == userId) {
          this.props.addGroups(copy);
          break;
        }
        if (copy.users[i].id === this.props.login.id) {
          this.props.removeGroups(copy); // implement remove group
          //Finally add all current user groups and paths to the redux store
        }
      }
    });

    this.props.socket.on("refresh-invitations", async filler => {
      try {
        let invitations = await axios.put(
          "http://localhost:4000/api/invitations",
          {
            id: this.props.login.id
          }
        );
        this.props.setInvitation(invitations.data);
      } catch (e) {
        console.log(e);
      }
    });

    this.props.socket.on("refresh-shrinked-group", async data => {
      let newGroup = data.shrinkedGroup;
      let id = data.userId;
      if (this.props.login.id !== id) {
        this.props.removeGroups(newGroup);
        this.props.addGroups(newGroup);
      }
    });
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
    if (!localStorage.token) {
      return <Redirect to="/" />;
    }

    return (
      <div
        id="dashboard"
        onMouseLeave={this.props.closeNav}
        onMouseOver={this.openNav}
        className="activ"
      >
        <div className="title">Dashboard</div>
        <div className="namefield">
          <img className="dashimg" src={this.props.login.image} />
          <div className="usname">{this.props.login.name}</div>
          <button className="logout" onClick={this.logOut}>
            Log Out
          </button>
        </div>

        <GroupGrid socket={this.props.socket} pop={this.props.pop} />

        <div className="msgbox">
          <div className="msgup">
            <div id="inviTag">Invitations:</div>
          </div>
          <ul className="msgbtm">
            {this.props.invites.map(invite => (
              <li className="inviteList">
                {`${invite.sender} has invited you to join ${invite.groupName}`}
                <button
                  className="acceptBtn"
                  onClick={async () => {
                    let group = await axios
                      .put("http://localhost:4000/api/groups/add", {
                        groupId: invite.groupId,
                        id: invite.UserId
                      })
                      .catch(err => console.log(err));

                    await axios
                      .post("http://localhost:4000/api/invitations/delete", {
                        id: invite.id
                      })
                      .catch(err => console.log(err));

                    this.props.removeInvitation(invite);
                    this.props.socket.emit("refresh", {
                      group: group.data[0],
                      userId: this.props.login.id
                    });
                  }}
                >
                  Accept
                </button>
                <button
                  className="declineBtn"
                  onClick={async () => {
                    await axios
                      .post("http://localhost:4000/api/invitations/delete", {
                        id: invite.id
                      })
                      .catch(err => console.log(err));

                    this.props.removeInvitation(invite);
                  }}
                >
                  Decline
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button className="createbtn dashbtn" onClick={this.props.toggleForm}>
          Create Group
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    invites: state.invites
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    addUsers,
    addGroups,
    addInvitation,
    setInvitation,
    removeInvitation,
    removeGroups
  }
)(Dashboard);
