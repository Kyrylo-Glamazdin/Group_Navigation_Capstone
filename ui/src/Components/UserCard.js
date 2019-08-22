import React, { Component } from "react";
import "./UserCard.css";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curUser: this.props.user
      // selected: this.props.selected
    };
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    console.log(this.props.num);
    this.props.toggle(this.props.num);
    // this.setState({
    //   selected: !this.state.selected
    // });
  }

  componentWillUnmount() {
    if (this.state.selected) this.setState({ selected: false });
  }

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
