import React, {Component} from 'react';
import './GroupGrid.css';
import GroupCard from './GroupCard';
import {connect} from 'react-redux';

class GroupGrid extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
				{this.props.data.map(group => (
                	<GroupCard group={group}/>
              	))}
            </div>
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