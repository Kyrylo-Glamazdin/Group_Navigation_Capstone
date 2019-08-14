
import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./components/login";

class App extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="App">
      <Login />
        <Dashboard></Dashboard>
      <div id="content"> HELLO </div>
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

})(App);