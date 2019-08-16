import React, {Component} from 'react';
import './GroupGrid.css';
import {connect} from 'react-redux';


class GroupGrid extends Component{
    render(){
        return (
            <ul id = "groups">
				{this.props.groups.map(group => (
                	<li key = {group.id}>{group.name}</li>
              	))}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        groups: state.groups
    };
}

export default connect(mapStateToProps, {
    
})(GroupGrid)