
import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dashboard.js';
import Map from './Components/Map.js'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from "./Components/login";
import Form from './Components/Form'

class App extends Component{
  render(){

    const LoginComponent = () => (<Login />);

    const MainPageComponent = () => (
      <div className="App">
        <Dashboard />
        <div id="content">
          {<Map />}
        </div>
      </div>
    );

    const FormComponent = () => (<Form />);

    return (
        <Router>
          <Switch>
            <Route exact path= "/" component={LoginComponent}/> 
            <Route exact path= "/dashboard" component={MainPageComponent}/>
            <Route exact path= "/dashboard/form" component={FormComponent}/>
          </Switch>
        </Router>
    );
  }
}


const mapStateToProps = state => {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps,{})(App);