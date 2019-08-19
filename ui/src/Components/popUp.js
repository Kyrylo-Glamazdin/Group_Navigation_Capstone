import React, { Component } from "react";
<<<<<<< HEAD
import "./popUp.css";
import { connect } from "react-redux";

class Popup extends Component {
  state = { users: this.props.users };

  componentDidMount = () => {
    console.log("Popup: ", this.state.users);
  };

  render() {
    let { users } = this.state;
    return (
      <div className="poppage">
        <div className="popup">
          {users.map(user => (
            <div className="userbar">{user.name}</div>
          ))}
=======
import { connect } from "react-redux";
import Userbar from "./userBar";
import "./popUp.css";

class Popup extends Component {
  state = {
    selected: []
  };

  select = async us => {
    console.log("selected --- ", us.name);
    console.log(this.state.selected.includes(us));
    if (!this.state.selected.includes(us)) {
      this.state.selected.push(us);
    } else {
      let newsl = this.state.selected.filter(one => one != us);
      this.setState({ selected: newsl });
    }
    console.log(this.state.selected);
  };

  sendUsers = () => {
    console.log(
      "Senting ---",
      this.state.selected.length,
      ": ",
      this.state.selected
    );
  };

  render() {
    const { users } = this.props;
    return (
      <div className="back">
        <div className="popup">
          <div className="x">&times;</div>
          {users.map(us => (
            <Userbar user={us} select={this.select} />
          ))}
          <button onClick={this.sendUsers} className="loginbtn invibtn">
            Invite
          </button>
>>>>>>> ea689e5e0accf1cb7969af1bf52c6d77acac940e
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    users: state.users
  };
};

<<<<<<< HEAD
const mapAction = {};

export default connect(
  mapState,
  mapAction
=======
export default connect(
  mapState,
  {}
>>>>>>> ea689e5e0accf1cb7969af1bf52c6d77acac940e
)(Popup);
