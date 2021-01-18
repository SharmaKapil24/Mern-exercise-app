import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      alert: false,
    };
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios.post("http://localhost:5000/users/add", user).then((res) => {
      console.log(res.data);
    });
    this.setState({ username: "" , alert:true});

    
  };
  render() {
   
    return (

      <div className="container ">
        {this.state.alert?<div class="alert alert-primary alert-dismissible" role="alert">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    User added successfully!
 </div>:null}
        <h3>Create new user</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={this.onChangeUsername}
              value={this.state.username}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              id="submitButton"
              placeholder="Submit"
            />
          </div>

        </form>
      </div>
    );
  }
}
