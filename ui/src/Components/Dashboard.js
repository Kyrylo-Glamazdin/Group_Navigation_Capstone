import React, {Component} from 'react';
import './Dashboard.css';
import GroupGrid from './GroupGrid';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }
    openNav() {
        document.getElementById("dashboard").style.width = "25vw";
        document.getElementById("content").style.marginLeft = "25vw";
    }

    closeNav() {
        document.getElementById("dashboard").style.width = "1vw";
        document.getElementById("content").style.marginLeft = "1vw";

    }
    render(){
        return(
            <div id = "dashboard">
                <div className="title" onMouseOut={this.closeNav} onMouseOver={this.openNav}> Dashboard </div>
                <div> Profile Name</div>
                <GroupGrid></GroupGrid>
                <button> Create New Group </button>
            </div>
        )
    }
}

export default Dashboard;