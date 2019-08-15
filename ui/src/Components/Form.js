import React, {Component} from 'react';
import UserCard from './UserCard';
import './Form.css';
import {connect} from 'react-redux';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUsers: [],
            lat: 0,
            lon: 0
        }

    }

    toggleSelected() {
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        return (
        <form className = "form">
            <div className = "userList">
				{this.props.users.map(user => (
                	<UserCard user={user} selected = {false} onClick={this.toggleSelected} />
                ))}
            </div>
            <div>
                <input type="text" className ="location"/>
                <input type="text" className = "location"/>
            </div>
            <input type="submit" />
        </form>
        )
    }

}

const mapStateToProps = state => {
    return {
      users: state.users
    };
}
  
export default connect(mapStateToProps)(Form)
