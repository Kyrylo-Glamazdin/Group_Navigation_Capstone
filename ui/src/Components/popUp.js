import React, { Component } from "react";
import { connect } from "react-redux";
import Userbar from "./userBar";
import "./popUp.css";

class Popup extends Component {
  state = {
    selected: []
  };

  select = async us => {
    if (!this.state.selected.includes(us)) {
      this.state.selected.push(us);
    } else {
      let newsl = this.state.selected.filter(one => one !== us);
      this.setState({ selected: newsl });
    }
  };

  pop = () => {
    document.querySelector("#overlay").classList.remove("activ");
    document.querySelector(".popup").classList.remove("activ");
  };

  sendUsers = () => {
    
    this.pop();
  };

  render() {
    const { users } = this.props;
    return (
      <div className="">
        <div className="popup">
          <div onClick={this.pop} className="x">
            &times;
          </div>
          <div className="barlist">
            {users.map(us => (
              <Userbar key = {us.id} user={us} select={this.select} />
            ))}
          </div>

          <button onClick={this.sendUsers} className="loginbtn invibtn">
            Invite
          </button>
        </div>
        <div className="" id="overlay" />
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
