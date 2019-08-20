import React, { Component } from "react";
import UserCard from "./UserCard";
import "./Form.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { addGroups} from "../Actions";
import { addCurrentGroup } from "../Actions";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "New Group",
      selectedUsers: [],
      lat: 0,
      lon: 0,
      redirect: false
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
    // console.log(document.querySelector("#overlay"));
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
      latitude: this.state.lat,
      longitude: this.state.lon
    };

    this.props.socket.emit("create", this.state.name);

    // await axios.post('http://localhost:4000/api/groups', {
    //   newGroup
    // })
    //   .then(async res => {
    //     newGroup.users = this.state.selectedUsers
    //     await this.props.addGroups(newGroup);

    //   })
    //   .catch(err => console.log(err))

    // await axios.post("http://localhost:4000/api/directions", {newGroup})
    // .then ( response => {
    //   newGroup.paths = response.data;
    //   this.props.addCurrentGroup();
    //   this.props.addGroups(newGroup);
    // })
    // .catch( err => {
    //   console.log(err);
    // })

    this.setState({
      redirect: true
    });
  }

  render() {
    // if (!localStorage.token) {
    //   return <Redirect to="/" />;
    // } else if (this.state.redirect) {
    //   return <Redirect to="/dashboard" />;
    // }
    return (
      <div>
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <div onClick={this.pop} className="x2">
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
            {this.props.users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                selected={false}
                addUserFunction={this.addUserToGroup}
                removeUserFunction={this.removeUserFromGroup}
              />
            ))}
          </div>
          <div className="destin">
            <div className="subheader">Enter Meetup Location:</div>
            <div className="latLonInput">
              <div className="subheader">Latitude:</div>
              <div>
                <input
                  className="latInputField"
                  name="lat"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
              <div className="subheader">Longitude:</div>
              <div>
                <input
                  className="lonInputField"
                  name="lon"
                  type="text"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="createGroupButton">
              <input
                onClick={this.pop}
                className="submitButton"
                type="submit"
                value="Create Group!"
              />
            </div>
          </div>
        </form>
        {/* <div className="" id="overlay" /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    groups: state.groups
  };
};

const mapDispatchToProps = dispatch => {
  return { addGroups };
};

export default connect(
  mapStateToProps,
  {addGroups,
  addCurrentGroup})
  (Form);
