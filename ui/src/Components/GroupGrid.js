import React, { Component } from "react";
import "./GroupGrid.css";
import { connect } from "react-redux";
import { delGroup } from "../Actions";

class GroupGrid extends Component {
  render() {
    return (
      <ul id="groups">
        {this.props.groups.map(group => (
          <div className="groupbar">
            <li key={group.id}>{group.name}</li>
            <button
              onClick={() => this.props.delGroup(group)}
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
    groups: state.groups
  };
};

export default connect(
  mapStateToProps,
  { delGroup }
)(GroupGrid);
