import React, { Component } from "react";
import "./UserCard.css";

/*** This is the UserCard component which appears in the Form and responds to the changes regarding the selection of the corresponding users ***/

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curUser: this.props.user
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  //used for styling purposes. when the user is selected, its appearance in the form changes, which allows the client to make sure that the user has been selected
  toggleSelected() {
    this.props.toggle(this.props.num);
  }

  componentWillUnmount() {
    if (this.state.selected) this.setState({ selected: false });
  }

  //render based on the selection state of the user
  render() {
    return (
      <div className="userCard" onClick={this.toggleSelected}>
        {!this.props.selected ? (
          <div
            className="unselectedUser"
            onClick={() => this.props.addUserFunction(this.state.curUser)}
          >
            <img className="userImage" src={this.state.curUser.image} alt="" />
            <div className="unselectedUserName">{this.state.curUser.name}</div>
          </div>
        ) : (
          <div
            className="selectedUser"
            onClick={() => this.props.removeUserFunction(this.state.curUser)}
          >
            <img className="userImage" src={this.state.curUser.image} alt="" />
            <div className="selectedUserName">{this.state.curUser.name}</div>
          </div>
        )}
      </div>
    );
  }
}

export default UserCard;
