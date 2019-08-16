import React, {Component} from 'react';
import './Dashboard.css';
import GroupGrid from './GroupGrid';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {addUsers} from '../Actions/index';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }
    openNav() {
        document.getElementById("dashboard").style.width = "25vw";
        document.getElementById("content").style.marginLeft = "25vw";
    }

    closeNav() {
       // document.getElementById("dashboard").style.width = "3vw";
       // document.getElementById("content").style.marginLeft = "3vw";
    }

    sendRequest = async () => {
        // await axios.get('localhost:5000/users')
        // .then(res => {
        //     //send response to action creator
        //      this.props.addUsers(res);
        // })
        // .catch(e => {
        //     console.log(e);
        // })
        await this.setState({redirect: true});  
    }

    render(){
        if(this.state.redirect)
        {
            return(
                <Redirect to="/dashboard/form"/>
            )
        }
        else
        {
            return(
                <div id = "dashboard">
                    <div className="title" onMouseOut={this.closeNav} onMouseOver={this.openNav}> Dashboard </div>
                    <div> Profile Name</div>
                    <GroupGrid></GroupGrid>
                    <button onClick={this.sendRequest}> Create New Group </button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        groups: state.groups
    };
}

export default connect(mapStateToProps,{addUsers})(Dashboard)
