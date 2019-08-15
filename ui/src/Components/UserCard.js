import React, {Component} from 'react'

class UserCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            curUser: this.props.user,
            selected: this.props.selected
        }
    }

    render() {
        if (!this.state.selected){
            return (
                <div>
                    {this.props.user.name}
                </div>
            )
        }
        else { 
            return(
                <div>
                    {this.props.user.name + " toggled"}
                </div>
            )
        }
    }
}

export default UserCard