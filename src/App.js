import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExercisesList";
import EditExercise from "./components/Edit-exercises";
import CreateExercise from "./components/Create-Exercise";
import CreateUser from "./components/CreateUser";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="container">
        <Route path="/" exact component={ExerciseList}></Route>
        <Route path="/edit/:id" exact component={EditExercise}></Route>
        <Route path="/create" exact component={CreateExercise}></Route>
        <Route path="/user" exact component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
