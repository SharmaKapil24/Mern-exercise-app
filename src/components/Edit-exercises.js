import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((res) =>
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        })
      )
      .catch((error) => console.log(error));

    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        const users = res.data.map((users) => users.username);
        this.setState({
          users: users,
        });
      }
    });
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onChangeDuration = (e) => {
    this.setState({ duration: e.target.value });
  };
  onChangeDate = (date) => {
    this.setState({ date: date });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise);

    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    window.location = "/";
  };
  render() {
    return (
      <div className="container ">
        <h3>Edit exercise log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <select
              id="username"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={this.onChangeDescription}
              value={this.state.description}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in minutes):</label>
            <input
              type="number"
              className="form-control"
              id="duration"
              placeholder="Enter duration"
              onChange={this.onChangeDuration}
              value={this.state.duration}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <div>
              <DatePicker
                onChange={this.onChangeDate}
                selected={this.state.date}
              ></DatePicker>
            </div>
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
