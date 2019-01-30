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

        // Display image to DOM
        const data = arrayBufferToBase64(response.image.data.data);
        const srcString = "data:" + response.image.contentType + ";base64," + data;
        $("#image").attr("src", srcString);

    })

})