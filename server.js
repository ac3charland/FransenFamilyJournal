var express = require("express");
var fs = require("fs");
var logger = require("morgan");
var mongoose = require("mongoose");
var multer = require("multer");
var upload = multer({ dest: 'uploads/' });
var path = require("path");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
// Note: this line doesn't play well with multipart form data. Need to use multer to handle multipart forms.
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
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


// Routes

// POST route for saving a new Book to the db and associating it with a Library
app.post("/api/submit", upload.single('image'), function(req, res, next) {

  var photoData = fs.readFileSync(req.file.path);
  
  // Create a new Book in the database
  db.Book.create(
    {
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      image: {
        data: photoData,
        contentType: req.file.mimetype
      }
    }
  )
    .then(function(dbBook) {
      // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
      // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Library.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });
    })
    .then(function(dbLibrary) {
      // If the Library was updated successfully, send it back to the client
      res.json(dbLibrary);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route for getting all books from the db
app.get("/api/books", function(req, res) {
  // Using our Book model, "find" every book in our db
  db.Book.find({})
    .then(function(dbBook) {
      // If any Books are found, send them to the client
      res.json(dbBook);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route for getting all libraries from the db
app.get("/api/library", function(req, res) {
  // Using our Library model, "find" every library in our db
  db.Library.find({})
    .then(function(dbLibrary) {
      // If any Libraries are found, send them to the client
      res.json(dbLibrary);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Route to see what library looks like WITH populating
app.get("/api/populated", function(req, res) {
  // Using our Library model, "find" every library in our db and populate them with any associated books
  db.Library.find({})
    // Specify that we want to populate the retrieved libraries with any associated books
    .populate("books")
    .then(function(dbLibrary) {
      // If any Libraries are found, send them to the client with any associated Books
      res.json(dbLibrary);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});
app.get("/api/photo", function(req, res) {
  db.Book.find({})
    .then(function(dbBook) {
      //Strategy for showing photos:
        // Use jQuery to get the text and data from dbBook and write to page.
      $("#results").text(dbBook);
      res.json(dbBook)
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
})

// index route loads view.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/index.html"));
});

// Loads test.html
app.get("/test/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/html/test.html"))
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
