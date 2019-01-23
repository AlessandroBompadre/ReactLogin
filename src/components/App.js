import React, { Component } from 'react';
import '../css/App.css';
import Data from '../data/data.json';

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log(Data);
    this.state = {
      username: "",
      password: "",
      logged: false,
      error: false,
      users: Data.users
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
    this.setState({ 'logged': false });
    for (var index in this.state.users) {
        if(this.state.users[index].username === this.state.username){
            if(this.state.users[index].password === this.state.password){
                this.setState({ 'logged': true });
                this.setState({ 'error': false });  
                return;
            }            
        }
    }
  }

  render() {
    return (
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
                {this.state.logged ? 'You are logged in' : ''}
            </div>
          </FormGroup>
          <button
            class="btn btn-outline-primary btn-block"
            disabled={!this.validateForm()}
            type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="Login" class="col-sm-2 col-md-3"></div>
      </div>
    );
  }
}