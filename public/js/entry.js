function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary)
};

$(document).ready(function() {
    const id = window.location.pathname.substr(7)

    $.get("/api/entry/" + id)
    .then(function(response) {

        // Write text to DOM
        if (response.title) {
            $("#title").text(response.title);
        }
        $("#author").text(response.author);
        $("#body").text(response.body);
        let components = response.timeStamp.split("T")[0].split('-');
        let year = parseInt(components[0], 10);
        let month = parseInt(components[1], 10);
        let day = parseInt(components[2], 10);
        let dateString = 'Submitted ' + month + '/' + day + '/' + year
        $("#date").text(dateString)

        // If post had an image, display image to DOM
        if (response.image) {
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