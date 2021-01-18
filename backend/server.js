const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const uri = require("./config/keys").mongoURI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server started at port 5000 "));
