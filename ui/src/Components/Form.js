import React, { Component } from "react";
import UserCard from "./UserCard";
import "./Form.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { addGroups } from "../Actions";
import { addCurrentGroup } from "../Actions";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "New Group",
      selectedUsers: [],
      address: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  pop = () => {
    document.querySelector(".searchForm").classList.remove("activ");
    document.querySelector("#overlay").classList.remove("activ");
  };

  addUserToGroup(user) {
    let newSelectedUsers = [...this.state.selectedUsers, user];
    this.setState({
      selectedUsers: newSelectedUsers
    });
  }

  removeUserFromGroup(user) {
    let newSelectedUsers = this.state.selectedUsers;
    for (let i = 0; i < newSelectedUsers.length; i++) {
      if (newSelectedUsers[i].id === user.id) {
        newSelectedUsers.splice(i, 1);
        break;
      }
    }
    this.setState({
      selectedUsers: newSelectedUsers
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let newGroup = {
      name: this.state.name,
      users: [...this.state.selectedUsers, this.props.login]
    };

    this.props.socket.emit("create", this.state.name);

    try {
      //converting the address of the group into coordinates
      let response = await axios.post(
        "http://localhost:4000/api/directions/address",
        { address: this.state.address }
      );

      //changes local state to these coverted coordinates and appends them to the newGroup object
      newGroup.latitude = response.data.lat;
      newGroup.longitude = response.data.lng;
    } catch (err) {
      console.log(err);
    }

    try {
      //getting back all user paths to destination
      let response = await axios.post("http://localhost:4000/api/directions", {
        newGroup
      });
      newGroup.paths = response.data;
    } catch (err) {
      console.log(err);
    }

    try {
      let newId = await axios.post("http://localhost:4000/api/groups", {
        newGroup
      }); //adds new group to database
      newGroup.id = newId.data.id;
    } catch (err) {
      console.log(err);
    }

    this.props.addGroups(newGroup); //adds new group and paths to the redux store

    this.close();
  }

  close = () => {
    this.props.closeNav();
    this.props.toggleForm();
  };

  render() {
    if (!localStorage.token) {
      return <Redirect to="/" />;
    } 
    return (
      <div>
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <div onClick={this.close} className="x2">
            &times;
          </div>
          <div className="formHeader">Create a New Group</div>
          <div className="subheader">
            Group Name:
            <input
              className="nameInputField"
              name="name"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <div className="subheader subheader2">
            <div className="aaa">Select Users:</div>
          </div>
          <div className="userList">
            {this.props.users.map((user, idx) => (
              <UserCard
                key={idx}
                user={user}
                selected={false}
                addUserFunction={this.addUserToGroup}
                removeUserFunction={this.removeUserFromGroup}
              />
            ))}
          </div>
          <div className="destin">
            <div className="subheader">Enter Meetup Address:</div>
            <div className="latLonInput">
              <div>
                <input
                  className="latInputField"
                  name="address"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="createGroupButton">
              <input
                className="submitButton"
                type="submit"
                value="Create Group!"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    login: state.login
  };
};

export default connect(
  mapStateToProps,
  {
    addGroups,
    addCurrentGroup
  }
)(Form);
