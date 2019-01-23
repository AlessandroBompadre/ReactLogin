import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../css/App.css';
import * as actions from '../actions';
import rootReducer from '../reducers'
import Data from '../data/data.json';

const store = createStore(rootReducer)

export default class App extends Component {
  searchUserState(username) {
    const ret = store.getState().authentication.find((element ) => { return element.username === username} );
    return ret? ret.logged : false;
  }

  constructor(props) {
    super(props);

    for( var index in Data.users){
      store.dispatch(actions.newUsers(Data.users[index].username,Data.users[index].password));  
    }

    const state = store.getState();
    this.state = {
      username: "",
      password: "",
      error: false,
      users: store.getState().authentication
    };
  }


  validateForm() {
    if(this.state.username.length < 3 && this.state.username.length > 0){
        return false;
    }
    // Minimum eight characters, at least one letter and one number
    let pattern = '^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$';
    return (this.state.password.search(pattern) > -1);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ 'error': true });
    
    for (var index in this.state.users) {
        if(this.state.users[index].username === this.state.username){
            if(this.state.users[index].password === this.state.password){
                store.dispatch(actions.logIn(this.state.username));
                this.setState({ 'error': false });  
            } else {
              store.dispatch(actions.logOut(this.state.users[index].username));
            }           
        } else {
          store.dispatch(actions.logOut(this.state.users[index].username));
        }
    }
  }

  render() {
    return (
    <Provider store={store}>
      <div class="row">  
      <div className="Login" class="col-sm-2 col-md-3"></div>  
      <div className="Login" class="col-sm-8 col-md-6">
        <h1>Authentication</h1>
        <h4>
            Insert login and password to login
        </h4>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            <div>
                <ControlLabel>
                    Minimum eight characters, at least one letter and one number
                </ControlLabel>
            </div>
            <div class="text-danger">
                {this.state.error ? 'Username or password should be wrong' : ''}
            </div>
            <div class="text-success">
                {this.searchUserState(this.state.username) ? this.state.username + ' is logged in' : ''}
            </div>
          </FormGroup>
          <button
            class="btn btn-outline-primary btn-block"
            disabled={!this.validateForm()}
            type="submit">
            Login
          </button>
          <div class="row">
            <div class="col-sm-12">
              Try following usernames and passwords
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <ul> 
                <li>username: admin</li>
                <li>password: 4dM1n123</li>
              </ul>
            </div>
            <div class="col-sm-6">
              <ul> 
                <li>username: guest</li>
                <li>password: gUesT123</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
      <div className="Login" class="col-sm-2 col-md-3"></div>
      </div>
    </Provider>
    );
  }
}