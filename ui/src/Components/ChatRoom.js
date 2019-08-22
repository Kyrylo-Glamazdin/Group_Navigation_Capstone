import React from 'react';
import './ChatRoom.css';

class ChatRoom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
      
    handleChange(event) {
      console.log(event.target.value)
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    render(){
        return(
            <div className='chatroom'>
                <div className='header'>Chatroom</div>
                <div className='messages'></div>
                <input name= 'message' onChange={this.handleChange}type='text'></input>
                <button> Send </button>
            </div>
        )
    }
}

export default ChatRoom;