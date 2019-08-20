import React, { Component } from "react";
import "./UserCard.css";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curUser: this.props.user,
      selected: this.props.selected
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    this.setState({
      selected: !this.state.selected
    });
  }
  //dsadsa
  componentWillUnmount() {
    if (this.state.selected) this.setState({ selected: false });
  }

  render() {
    return (
      <div className="userCard" onClick={this.toggleSelected}>
        {!this.state.selected ? (
          <div
            className="unselectedUser"
            onClick={() => this.props.addUserFunction(this.state.curUser)}
          >
            <img className="userImage" src={this.state.curUser.image} />
            <div className="unselectedUserName">{this.state.curUser.name}</div>
          </div>
        ) : (
          <div
            className="selectedUser"
            onClick={() => this.props.removeUserFunction(this.state.curUser)}
          >
            <img className="userImage" src={this.state.curUser.image} />
            <div className="selectedUserName">{this.state.curUser.name}</div>
          </div>
        )}
      </div>
    );
  }
}

export default UserCard;
