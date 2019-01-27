const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const path = require("path");

// index route loads view.html
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/html/index.html"));
});

// Loads test.html
router.get("/test/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/html/test.html"))
});

// Loads login.html
router.get("/login/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/html/login.html"))
});

module.exports = router;