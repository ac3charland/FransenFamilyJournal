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


// POST route for saving a new Entry to the db and associating it with a Library
router.post("/submit", upload.single('image'), function (req, res, next) {
    console.log("Submitting post. Here's the req:");
    console.log(req.body);


    // db.Users.findById(id)
    //     .then((user) => {
    //         if (!user) {
    //             return res.sendStatus(400);
    //         }

    //         uploadUser = user;
    //     });
    let image;
    if (req.file) {
        image = {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        }
    }

    // Create a new Book in the database
    db.Entry.create(
        {
            user_id: req.body.user_id,
            author: req.body.author,
            title: req.body.title,
            body: req.body.body,
            image: image
        }
    )
        .then(function(dbEntry) {
            res.json(dbEntry);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

// Route for getting all books from the db
router.get("/", function (req, res) {
    // Using our Book model, "find" every book in our db
    db.Entry.find({})
        .then(function (entries) {
            // If any Books are found, send them to the client
            res.json(entries);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

router.get("/:id", function (req, res) {
    let id = req.params.id;

    db.Entry.findById(id)
        .then((entry) => {
            if(!entry) {
                return res.sendStatus(400);
            }

        return res.json(entry);
        })
})

module.exports = router;