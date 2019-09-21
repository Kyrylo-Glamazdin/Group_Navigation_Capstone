import React, { Component } from "react";
import UserCard from "./UserCard";
import "./Form.css";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { addGroups } from "../Actions";
import { addCurrentGroup } from "../Actions";
import axios from "axios";

/*** This is the Form component, which is userd for creating groups ***/
/*** It allows users to select the name of the group, the MeetUp location, as well as the members of the group ***/

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedUsers: [],
      address: "",
      selected: [],
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
  }

  //when the component mounts, it maps all of the users across the form, which allows users to select and add only the needed users
  componentDidMount = async () => {
    setTimeout(() => {
      let selected2 = this.props.users.map(us => {
        if (true) return 0;
      });
      this.setState({ selected: selected2 });
    }, 2000);
  };

  //handles input in the forms
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  pop = () => {
    document.querySelector(".searchForm").classList.remove("activ");
    document.querySelector("#overlay").classList.remove("activ");
  };

  //clicking on user's icon adds them to the group
  addUserToGroup(user) {
    let newSelectedUsers = [...this.state.selectedUsers, user];
    this.setState({
      selectedUsers: newSelectedUsers
    });
  }

  //when the user is selected, but is clicked on again, it gets removed from the group
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

  //runs when "Create Group" button is clicked
  async handleSubmit(e) {
    e.preventDefault();
    let newGroup = {
      name: this.state.name,
      users: [...this.state.selectedUsers, this.props.login]
    };

    //validate user input  
    try {
      if(this.state.address === '')
      {
        this.setState({
          error: 'Please Enter an Address'
        })
        return;
      }
      if(this.state.name === '')
      {
        this.setState({
          error: 'Please enter a group name'
        })
        return;
      }

      //converting the address of the group into coordinates
      let response = await axios.post(
        "http://localhost:4000/api/directions/address",
        { address: this.state.address }
      );

      if (response.data === "") {
        await this.setState({
          error: "Please enter a valid address"
        });
        return;
      }
      //changes local state to these coverted coordinates and appends them to the newGroup object
      newGroup.latitude = response.data.lat;
      newGroup.longitude = response.data.lng;
    } catch (err) {
      console.log(err);
    }

    this.props.socket.emit("create", this.state.name);

    try {
      //getting back all user paths to destination
      let response = await axios.post("http://localhost:4000/api/directions", {
        newGroup
      });
      let bool = true;
      for(let j = 0; j < response.data.length; j++)
      {
        if(response.data[j].length === 0)
        {
          bool = false;
          break;
        }
      }
      //if address is not valid, return an error message
      if(!bool){
        await this.setState({
          error: "Paths could not be found to destination"
        });
        return;
      }
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
  //adds new group and paths to the redux store

    this.props.socket.emit('refresh',{newGroup: newGroup});
    window.location.reload();
    this.close();
  }

  close = async () => {
    this.props.closeNav();
    document.querySelector(".searchForm").classList.remove("activ");
    document.querySelector("#overlay").classList.remove("activ");
    let newsl = this.state.selected.map(sl => {
      sl = 0;
      return sl;
    });
    await this.setState({ selected: newsl });
    document.querySelector(".nameInputField").value = "";
    document.querySelector(".latInputField").value = "";

  };

  toggleCard = cardId => {
    if (this.state.selected[cardId] === 1) {
      this.state.selected[cardId] = 0;
    } else this.state.selected[cardId] = 1;
  };

  //render the form with all of the users and input fields
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
            <div className="gpName">Group Name:</div>
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
                num={idx}
                key={idx}
                user={user}
                toggle={this.toggleCard}
                selected={this.state.selected[idx]} //
                addUserFunction={this.addUserToGroup}
                removeUserFunction={this.removeUserFromGroup}
              />
            ))}
          </div>
          <div className="destin">
            <div className="destin1">
              <div className="">Enter Meetup Address:</div>
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

            <div className="errorMessages">{this.state.error}</div>
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
