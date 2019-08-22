import React, { Component } from "react";

class Chat extends Component {
  state = {
    chatBtn: "Chat",
    active: false
  };

  chatUnpop = () => {
    console.log("unChat!!!!");
    setTimeout(() => {
      this.setState({ chatBtn: "Chat", active: false });
    }, 150);

    // if (this.state.chatActive) {
    //   console.log("sending chat");
    // }
    // document.querySelector("#overlay").classList.remove("activ");
    document.querySelector(".chatPopup").classList.remove("activ");
  };
  chatPop = () => {
    if (this.state.active) {
      console.log("Sending message !!!");
      return;
    } else {
      console.log("openChat!!!!");
      this.state.active = true;
      setTimeout(() => {
        this.setState({ chatBtn: "Send" });
      }, 100);
      document.querySelector(".chatPopup").classList.add("activ");
    }
  };

  render() {
    return (
      <div>
        <div className="chatPopup">
          <div className="chatBar">
            <div id="msgtag1">Messages:</div>
          </div>
          <div className="chatDisplay">
            {/* messagess */}
            <div>dsadsadsadsadsad</div>
            <div>
              dsadsadsa dsadsadsa dsadsadsa dsadsadsa dsadsadsa dsadsadsa
              dsadsadsa
            </div>
            <div>dsadsaddsadsa</div>
          </div>
          <div id="msgInput">
            <div id="usNameTag">"YourName": </div>
            <div id="msgInputbox">
              <input id="msgInputField" name="msgInput" type="text" />
            </div>
          </div>
          <div onClick={this.chatUnpop} className="x2">
            &times;
          </div>
        </div>
        <div className="" id="overlay" />
        <div onClick={this.chatPop} className="chatbtn">
          {this.state.chatBtn}
        </div>
      </div>
    );
  }
}

export default Chat;
