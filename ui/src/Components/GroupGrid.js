import React, { Component } from "react";
import "./GroupGrid.css";
import { connect } from "react-redux";
import { delGroup } from "../Actions";
import {changeGroup} from "../Actions";
import Axios from "axios";

class GroupGrid extends Component {
  pop = () => {
    document.querySelector("#overlay").classList.add("activ");
    document.querySelector(".popup").classList.add("activ");
  };
  //when a new group is selected, we want to leave whatever server the user is currently
  //on and then join them to a new socket room with the name equal to the group name
  render() {
    return (
      <ul id="groups">
        {this.props.groups.map(group => (
          <div className="groupbar">
            <button onClick={this.pop} className="delbtn">
              +
            </button>
            <li key={group.id} onClick={async() => {
              if(this.props.currentGroup != -1)
              {
                let oldGroupName = await Axios.get('http://localhost:4000/api/groups/' + this.props.currentGroup)
                this.props.socket.emit('leave-current-room',oldGroupName);
              }
              let newGroupName = await Axios.get('http://localhost:4000/api/groups/' + group.id);
              this.props.socket.emit('enter-group', newGroupName);
              this.props.changeGroup(group.id)
            }
            }>{group.name}</li>
            <button
              onClick={async() => {
                //console.log(group);
                this.props.delGroup(group);
                let req = this.props.login;
                req.groupId = group.id;
                await Axios.post('http://localhost:4000/api/groups/removeUser', req)
                .then(res => {
                  console.log('user removed from group');
                })
                .catch(err => console.log(err))
              }}
              className="delbtn"
            >
              -
            </button>
          </div>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    login: state.login,
    currentGroup: state.currentGroup
  };
};

export default connect(
  mapStateToProps,
  { delGroup , changeGroup}
)(GroupGrid);
