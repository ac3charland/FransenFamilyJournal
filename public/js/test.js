$(document).ready(function() {
    console.log("test.js is running")
    var message = $("<h2>")
    message.text("I remember jQuery")
    $("#results").append(message);

    $.get("/api/books", function(req, res) {
        console.log("Here's the res response from /api/books:")
        console.log(res)
    })
    .then(function(response) {
        console.log("Here's the .then response from /api/books:")
        console.log(response)
        res.json(response)
    })
})
