import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: [],
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => {
        if (res.data.length > 0) {
          const exercises = res.data;
          this.setState({
            exercise: exercises,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  onDeleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercises/" + id).then((res) => {
      console.log(res.data);
      const updatedExercises = this.state.exercise.filter(
        (el) => el._id !== id
      );
      this.setState({ exercise: updatedExercises });
    });
  };

  render() {
    return (
      <div>
        <h3>Here is your exercise log</h3>
        <table className="table table-dark">
          <thead className="thead-light">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Description</th>
              <th scope="col">Duration (in minutes)</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercise.map((exe) => (
              <tr key={exe._id}>
                <td>{exe.username}</td>
                <td>{exe.description}</td>
                <td>{exe.duration}</td>
                <td>{exe.date.substring(0, 10)}</td>
                <td>
                  <Link to={"/edit/" + exe._id} id={exe._id}>
                    Edit{" "}
                  </Link>{" "}
                  |
                  <a
                    className="primary"
                    href="#"
                    onClick={this.onDeleteExercise.bind(this, exe._id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
