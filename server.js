const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');
const auth = require("./routes/auth");


const PORT = process.env.PORT || 3000;

// Require all models
const db = require("./models");
require("./config/passport");

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
// Note: this line doesn't play well with multipart form data. Need to use multer to handle multipart forms.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FransenFamilyJournalDB", { useNewUrlParser: true});


// index route loads index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/index.html"));
});

app.get("/entry/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/entry.html"));
});

app.get("/about/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/about.html"));
})

// Loads test.html
app.get("/test/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/test.html"));
});

// Loads compose.html
app.get("/compose", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/html/compose.html"));
})

// Loads login.html
app.get("/login/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/login.html"));
});

app.use(require('./routes'));

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
