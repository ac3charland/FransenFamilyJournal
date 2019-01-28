const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const fs = require("fs");
// Require all models
const db = require("../../models");


// POST route for saving a new Book to the db and associating it with a Library
router.post("/submit", upload.single('image'), function (req, res, next) {

    const photoData = fs.readFileSync(req.file.path);

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
        .then(function (dbBook) {
            // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
            // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Library.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });
        })
        .then(function (dbLibrary) {
            // If the Library was updated successfully, send it back to the client
            res.json(dbLibrary);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

// Route for getting all books from the db
router.get("/books", function (req, res) {
    // Using our Book model, "find" every book in our db
    db.Book.find({})
        .then(function (dbBook) {
            // If any Books are found, send them to the client
            res.json(dbBook);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

// Route for getting all libraries from the db
router.get("/library", function (req, res) {
    // Using our Library model, "find" every library in our db
    db.Library.find({})
        .then(function (dbLibrary) {
            // If any Libraries are found, send them to the client
            res.json(dbLibrary);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

// Route to see what library looks like WITH populating
router.get("/populated", function (req, res) {
    // Using our Library model, "find" every library in our db and populate them with any associated books
    db.Library.find({})
        // Specify that we want to populate the retrieved libraries with any associated books
        .populate("books")
        .then(function (dbLibrary) {
            // If any Libraries are found, send them to the client with any associated Books
            res.json(dbLibrary);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});
router.get("/photo", function (req, res) {
    db.Book.find({})
        .then(function (dbBook) {
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

module.exports = router;