import React, { Component } from "react";
import { connect } from "react-redux";

class Chat extends Component {
  state = {
    chatBtn: "Chat",
    active: false,
    name: '',
    msgInput: '',
    chatMessages: []
  };

  componentDidMount = async() =>{
    this.props.socket.on('add-message', message =>{
        let copy = this.state.chatMessages;
        this.setState({
          chatMessages: copy.concat(message)
        })
    })
  }

  handleChange = (event)=> {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  chatUnpop = () => {
    console.log("unChat!!!!");
    setTimeout(() => {
      this.setState({ chatBtn: "Chat", active: false, chatMessages: [] });
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
      this.props.socket.emit('new-message', {message:this.state.msgInput,name: this.state.name});
      this.setState({
        msgInput: ''
      })
      return;
    } else {
      console.log("openChat!!!!");
      this.state.active = true;
      setTimeout(() => {
        this.setState({ chatBtn: "Send" });
      }, 100);
      document.querySelector(".chatPopup").classList.add("activ");
    }

    for(let i =0; i < this.props.groups.length; i++)
    {
      if(this.props.groups[i].id == this.props.currentGroup)
      {
        this.setState({
          name: this.props.groups[i].name
        })
        break;
      }
    }
  };

  render() {
    
    return (
      <div>
        <div className="chatPopup">
          <div className="chatBar">
            <div id="msgtag1">{`${this.state.name}:`}</div>
          </div>
          <div className="chatDisplay">
            {this.state.chatMessages.map(message => {
              return(
                <div>
                  {message}
                </div>
              )
            })}
          </div>
          <div id="msgInput">
            <div id="usNameTag">{this.props.login.name}</div>
            <div id="msgInputbox">
              <input id="msgInputField" name="msgInput" type="text" onChange={this.handleChange} />
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

const mapStateToProps = state => {
  return {
    login: state.login,
    groups: state.groups,
    currentGroup: state.currentGroup
  };
};

export default connect(
  mapStateToProps,
  {}
)(Chat);
