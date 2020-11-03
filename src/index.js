// imports
const express = require("express");
const morgan = require("morgan"); // logger middleware
const helmet = require("helmet"); //protects headers
const cors = require("cors"); // cross origin resource sharing ( fe -> server )
const middlewares = require("./middlewares");

require("dotenv").config();
// bring in log routes
const logs = require("./api/logs");

// Attempting to use fcc method to connect to db
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// initialize instances
const app = express();
app.use(morgan("common"));
app.use(helmet());
/* setup to allow reqs only from a specific origin: */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

//app.options('*', cors()) // include before other routes
app.use(express.json()); // add body parsing middleware

// Setup a basic GET to '/'
app.get("/", (req, res) => {
  console.log("hello all");
  res.json({
    message: "Hello World!",
  });
});
//use log route
app.use("/api/logs", logs);
// use middleware func for not found
app.use(middlewares.notFound);
// use error handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("Listening at http://localhost:1337");
});
