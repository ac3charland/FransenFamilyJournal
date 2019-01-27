const express = require("express");
const fs = require("fs");
const logger = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const path = require("path");




const PORT = 3000;

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
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/FransenFamilyJournalDB", { useNewUrlParser: true });

// When the server starts, create and save a new Library document to the db
// The "unique" rule in the Library model's schema will prevent duplicate libraries from being added to the server
db.Library.create({ name: "FFJ Test Library" })
  .then(function(dbLibrary) {
    // If saved successfully, print the new Library document to the console
    console.log(dbLibrary);
  })
  .catch(function(err) {
    // If an error occurs, print it to the console
    console.log(err.message);
  });

app.use(require('./routes'));

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
