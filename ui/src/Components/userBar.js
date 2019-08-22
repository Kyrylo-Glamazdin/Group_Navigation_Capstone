import React, { Component } from "react";
import "./popUp.css";

class Userbar extends Component {
  state = {
    user: this.props.user,
    active: false
  };

  select = async () => {
    console.log(this.props.num);
    console.log("!!!!!!!!");
    // await this.setState({ active: !this.state.active });
    // console.log("on bar: ", this.state.user);
    this.props.select(this.props.user);

    this.props.toggle(this.props.num);
    // console.log(this.state.user.name, "---", this.state.active);
  };

  // renders = () => {
  //   const { user } = this.props;
  //   // if (this.state.active)
  //   //   return (
  //   //     <div onClick={this.select} className="userbar active">
  //   //       {user.name}
  //   //     </div>
  //   //   );
  //   return (
  //     <div onClick={this.select} className="userbar">
  //       {user.name}
  //     </div>
  //   );
  // };

  //
  render() {
    const { user } = this.props;
    if (this.props.active)
      return (
        <div onClick={this.select} className="userbar active">
          {user.name}
          <div>{this.props.active}</div>
        </div>
      );
    return (
      <div onClick={this.select} className="userbar">
        {user.name}
      </div>
    );
  }
}

export default Userbar;
