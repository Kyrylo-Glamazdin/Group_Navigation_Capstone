import React, { Component } from "react";
import "./GroupGrid.css";
import { connect } from "react-redux";
import { delGroup } from "../Actions/index";

class GroupGrid extends Component {
  delGroup = ev => {
    console.log("del group", ev);
    this.props.delGroup(ev);
  };

  render() {
    return (
      <ul id="groups">
        {this.props.groups.map(group => (
          <li className="groupbar" key={group.id}>
            {group.name}
            <button onClick={() => this.delGroup(group)} className="delbtn">
              -
            </button>
          </li>
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
