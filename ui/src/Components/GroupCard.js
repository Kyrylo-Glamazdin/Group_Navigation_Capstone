import React, {Component} from 'react';
import './GroupCard.css';

class GroupCard extends Component{
    render(){
        return(
            <div>
                <span>{this.props.group.name}</span>
             </div>
        )
    }
}

export default GroupCard;