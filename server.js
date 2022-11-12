// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Callback function to complete GET '/all'
app.get("/all", async (req, res) => {
  console.log(projectData);
  res.status(200).send(projectData);
});

// Post Route
app.post('/add', async (req, res) => {
  projectData = await req.body;
  res.status(200).send(projectData);
});

// Setup Server
const port = 8080;
app.listen(port, () => {
  console.log(`ctrl + click to run the app =>  http://localhost:${port}`);
});
