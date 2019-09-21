import React, { Component } from "react";
import { connect } from "react-redux";
import Userbar from "./userBar";
import "./popUp.css";
import Axios from "axios";

class Popup extends Component {
  state = {
    selected: [],
    users: []
  };

  componentDidMount = async () => {
    console.log();
    setTimeout(() => {
      console.log("Popup users --- ", this.props.popupUsers);
      let selected2 = this.props.popupUsers.map(us => {
        if (true) return 0;
      }, 1000);
      this.setState({ users: selected2 });
      console.log("Popup us state --- ", this.state.users);
    }, 1500);
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

  sendUsers = async () => {
    //retrieve the group that this pop up is referring to
    let groupN = await Axios.get('http://localhost:4000/api/groups/' + this.props.invGroup)
    console.log(groupN.data);
    let newGroup = {
      users: this.state.selected,
      groupName : groupN.data.name,
      name: this.props.login.name,
      groupId: groupN.data.id
    }
    // send invitations to other members
    await Axios.post('http://localhost:4000/api/invitations',{newGroup})

    //socket event will fire a rerender of the dashboard to all users to mimic real-time invitation sent
    this.props.socket.emit("refresh", {invite: newGroup});
    //enter socket event here
    this.pop();
  };

  closePop = async () => {
    this.props.pop();
    let newsl = this.state.users.map(sl => {
      sl = 0;
      return sl;
    });
    await this.setState({ users: newsl });
  };

  toggleBar = id => {
    if (this.state.users[id] === 1) {
      this.state.users[id] = 0;
    } else this.state.users[id] = 1;
    this.setState({ users: this.state.users });

    // if (this.state.selected[cardId] === 1) {
    //   this.state.selected[cardId] = 0;
    // } else this.state.selected[cardId] = 1;
  };

  render() {
    const { popupUsers } = this.props;

    return (
      <div className="">
        <div className="popup">
          <div onClick={this.closePop} className="x">
            &times;
          </div>
          <div className="barlist">
            {popupUsers.map((us, idx) => (
              <Userbar
                key={us.id}
                user={us}
                num={idx}
                toggle={this.toggleBar}
                select={this.select}
                active={this.state.users[idx]}
              />
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
    invGroup: state.invGroup,
    popupUsers: state.popupUsers
  };
};

export default connect(
  mapState,
  {}
)(Popup);
