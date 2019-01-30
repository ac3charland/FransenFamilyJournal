function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary)
};

$(document).ready(function() {
    const id = window.location.pathname.substr(7)
    
    console.log("id: " + id);

    $.get("/api/entry/" + id)
    .then(function(response) {
        console.log("Here's the response from '/api/entry/" + id );
        console.log(response);

        // Write text to DOM
        $("#title").text(response.title);
        $("#author").text(response.author);
        $("#body").text(response.body);

        // If post had an image, display image to DOM
        if (response.image) {
            console.log(response.image);
            let image = $("<img>");
            const data = arrayBufferToBase64(response.image.data.data);
            const srcString = "data:" + response.image.contentType + ";base64," + data;
            image.attr("src", srcString);
            image.addClass("single-entry-img entry-img");
            image.addClass("img-fluid");
            image.addClass("float-left mt-2 mr-4 mb-4");
            $("#entry-content").prepend(image);
        }
        
        $("#loading").attr("hidden", true);
        $("#back").attr("hidden", false);
    })

})