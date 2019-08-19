import React, { Component } from "react";
import "./GroupGrid.css";
import { connect } from "react-redux";
<<<<<<< HEAD
import { delGroup } from "../Actions/index";

class GroupGrid extends Component {
  delGroup = ev => {
    console.log("del group", ev);
    this.props.delGroup(ev);
  };

=======
import { delGroup } from "../Actions";

class GroupGrid extends Component {
>>>>>>> ea689e5e0accf1cb7969af1bf52c6d77acac940e
  render() {
    return (
      <ul id="groups">
        {this.props.groups.map(group => (
<<<<<<< HEAD
          <li className="groupbar" key={group.id}>
            {group.name}
            <button onClick={() => this.delGroup(group)} className="delbtn">
              -
            </button>
          </li>
=======
          <div className="groupbar">
            <li key={group.id}>{group.name}</li>
            <button
              onClick={() => this.props.delGroup(group)}
              className="delbtn"
            >
              -
            </button>
          </div>
>>>>>>> ea689e5e0accf1cb7969af1bf52c6d77acac940e
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groups
  };
};

export default connect(
  mapStateToProps,
  { delGroup }
)(GroupGrid);
