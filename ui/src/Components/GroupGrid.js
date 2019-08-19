import React, { Component } from "react";
import "./GroupGrid.css";
import { connect } from "react-redux";
import { delGroup } from "../Actions";

class GroupGrid extends Component {
  pop = () => {
    document.querySelector("#overlay").classList.add("activ");
    document.querySelector(".popup").classList.add("activ");
  };

  render() {
    return (
      <ul id="groups">
        {this.props.groups.map(group => (
          <div className="groupbar">
            <button onClick={this.pop} className="delbtn">
              +
            </button>
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
