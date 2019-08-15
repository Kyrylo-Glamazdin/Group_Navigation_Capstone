
import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard.js';
import Map from './Components/Map.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./Components/login";

class App extends Component{
  render(){
    const loginComponent = () => (<Login />);
    const mainPageComponent = () => (
      <div className="App">
        <Dashboard />
        <div id="content">
          HELLO 
        </div>
      </div>
    );

    return (
        <Router>
          <Switch>
            <Route exact path= "/" component={loginComponent}/> 
            <Route path= "/dashboard" component={mainPageComponent}/>
          </Switch>
        </Router>
    );
  }
}


const mapStateToProps = state => {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps)(App);