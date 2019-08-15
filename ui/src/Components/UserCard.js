import React, {Component} from 'react'

class UserCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            curUser: this.props.user,
            selected: this.props.selected
        }
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected() {
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        return (
            <div onClick={this.toggleSelected}>
                {!this.state.selected ?
                <div>
                    {this.props.user.name}
                </div>
                :
                <div>
                    {this.props.user.name + " selected"}
                </div>}
            </div>
        );
    }
}

export default UserCard