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
    //retrieve the group that this pop up is referring to
    let groupN = await Axios.get('http://localhost:4000/api/groups/' + this.props.invGroup)
    //add current user to group
    await Axios.put('http://localhost:4000/api/groups/add', {
      groupId: groupN.data.id,
      id: this.props.login.id
    })

    let newGroup = {
      users: this.state.selected,
      groupName : groupN.data.name,
      name: this.props.login.name,
      groupId: groupN.data.id
    }
    // send invitations to other members
    await Axios.post('http://localhost:4000/api/users/invitations',{newGroup})

    //enter socket event here
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
