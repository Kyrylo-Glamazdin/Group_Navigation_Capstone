import React, { Component } from "react";
import "./GroupGrid.css";
import { connect } from "react-redux";
import { delGroup } from "../Actions";
import { changeGroup, changeInviteGroup, setPopupUsers } from "../Actions";
import Axios from "axios";

/*** Renders all of the groups that this users is a member of in the dashboard ***/

class GroupGrid extends Component {

  //when a new group is selected, we want to leave whatever server the user is currently
  //on and then join them to a new socket room with the name equal to the group name
  render() {
    return (
      <div id="groups">
        {this.props.groups.map(group => (
          <div className="groupbar" key={group.id}>
            <button
              onClick={async () => {
                document.querySelector("#overlay").classList.add("activ");
                document.querySelector(".popup").classList.add("activ");

                let response = await Axios.put('http://localhost:4000/api/groups/', {id:group.id});
                let users = response.data;
                let all = this.props.users;
                let filtered = all.filter(user =>{
                  for(let i = 0; i < users.length; i++)
                  {
                    if(users[i].id === user.id)
                    {
                      return false;
                    }
                  }
                  return true;
                })
                this.props.setPopupUsers(filtered);
                this.props.changeInviteGroup(group.id);
              }}
              className="delbtn delbtn1"
            >
              +
            </button>
            <li
              key={group.id}
              className="liGroupName"
              onClick={async () => {
                if (this.props.currentGroup !== -1) {
                  let oldGroupName = await Axios.get(
                    "http://localhost:4000/api/groups/" +
                      this.props.currentGroup
                  );
                  this.props.socket.emit(
                    "leave-current-room",
                    oldGroupName.data.name
                  );
                }
                let newGroupName = await Axios.get(
                  "http://localhost:4000/api/groups/" + group.id
                );
                this.props.socket.emit("enter-group", newGroupName.data.name);
                this.props.changeGroup(group.id);
              }}
            >
              {group.name}
            </li>
            <button
              key={group.id}
              onClick={async () => {
                this.props.changeGroup(-1);

                let newGroup = group;
                for(let i = 0; i < newGroup.users.length;i++)
                {
                  if(newGroup.users[i].id === this.props.login.id)
                  {
                    newGroup.users.splice(i, 1);
                    newGroup.paths.splice(i,1);
                    break;
                  }
                }

                await Axios.put("http://localhost:4000/api/groups/remove",{
                  id: this.props.login.id,
                  groupId: group.id
                }).catch(err => console.log(err));

                this.props.socket.emit('refresh', {shrinkedGroup: newGroup, userId: this.props.login.id})
              }}
              className="delbtn delbtn2"
            >
              -
            </button>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups,
    login: state.login,
    users: state.users,
    currentGroup: state.currentGroup
  };
};

export default connect(
  mapStateToProps,
  { delGroup, changeGroup, changeInviteGroup, setPopupUsers }
)(GroupGrid);
