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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(){

    }

    render() {
        return (
        <form className = "form" onSumbit={this.handleSubmit}>
            <div className = "userList">
				{this.props.users.map(user => (
                	<UserCard user={user} selected = {false} />
                ))}
            </div>
            <div>
                <input name="lat" type="text" className ="location" onChange={this.handleChange}/>
                <input name="lon" type="text" className = "location" onChange={this.handleChange}/>
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
