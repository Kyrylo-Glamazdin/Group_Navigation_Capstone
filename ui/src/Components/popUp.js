import React, { Component } from "react";
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

const mapAction = {};

export default connect(
  mapState,
  mapAction
)(Popup);
