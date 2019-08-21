import React, { Component } from "react";
import { connect } from "react-redux";
import Userbar from "./userBar";
import "./popUp.css";
import Axios from "axios";

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

  sendUsers = async() => {
    let groupN = await Axios.get('http://localhost:4000/api/groups/' + this.props.invGroup)
    let newGroup = {
      users: this.state.selected,
      name: this.props.login.name,
      groupName : groupN.data.name
    }
    await Axios.post('http://localhost:4000/api/users/invitation',{newGroup})
    this.pop();
  };

  render() {
    const { users } = this.props;
    return (
      <div className="">
        <div className="popup activ">
          <div onClick={this.props.pop} className="x">
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
      </div>
    );
  }
}

const mapState = state => {
  return {
    users: state.users,
    login: state.login,
    invGroup: state.invGroup
  };
};

export default connect(
  mapState,
  {}
)(Popup);
