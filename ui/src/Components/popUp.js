import React, { Component } from "react";
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

export default connect(
  mapState,
  {}
)(Popup);
