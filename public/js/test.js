function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary)
};

$(document).ready(function() {
    console.log("test.js is running")
    var message = $("<h2>")
    message.text("I remember jQuery")
    $("#results").append(message);

    $.get("/api/books/books", function(req, res) {
        console.log("Here's the res response from /api/books:")
        console.log(res)
    })
    .then(function(response) {
        console.log("Here's the .then response from /api/books:");
        console.log(response[0]);
        var res = $("<ul>");

        var author = $("<li>");
        author.text(response[0].author);

        var title = $("<li>");
        title.text(response[0].title);

        var description = $("<li>");
        description.text(response[0].description);

        var imageEnclosure = $("<li>");
        var image = $("<img>");
        var data = arrayBufferToBase64(response[0].image.data.data)
        var srcString = "data:" + response[0].image.contentType + ";base64," + data;
        image.attr("src", srcString);
        imageEnclosure.append(image);

        res.append(author);
        res.append(title);
        res.append(description);
        res.append(imageEnclosure);


        $("#results").append(res);
        res.json(response[0]);

    })
})
