import React, {Component} from 'react';
import './GroupGrid.css';
import {connect} from 'react-redux';


class GroupGrid extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul id = "groups">
				{this.props.data.map(group => (
                	<li>{group.name}</li>
              	))}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.data
    };
}

export default connect(mapStateToProps, {
    
})(GroupGrid)