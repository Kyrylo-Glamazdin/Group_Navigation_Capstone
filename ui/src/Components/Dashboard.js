import React, {Component} from 'react';
import './Dashboard.css';
import GroupGrid from './GroupGrid';

class Dashboard extends Component{
    render(){
        return(
            <div id = "dashboard">
                <span> Dashboard </span>
                <GroupGrid></GroupGrid>
                <button> Create New Group </button>
            </div>
        )
    }
}

export default Dashboard;