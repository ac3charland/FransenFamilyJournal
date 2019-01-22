$(document).ready(function() {
    console.log("test.js is running")
    var message = $("<h2>")
    message.text("I remember jQuery")
    $("#results").append(message);
})
