function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary)
};

function createEntryTile(entry) {
    let entryWrapper = $("<div>");
    entryWrapper.addClass("entry");
    entryWrapper.addClass("d-flex align-items-end");
    entryWrapper.attr("id", entry._id);

    let entryHtml = $("<div>");
    entryHtml.addClass("p-3 mx-auto");

    if (entry.image) {
        let image = $("<img>");
        let data = arrayBufferToBase64(entry.image.data.data);
        let srcString = "data:" + entry.image.contentType + ";base64," + data;
        image.attr("src", srcString);
        image.addClass("entry-img multi-entry-img");
        image.addClass("img-fluid");
        image.addClass("mx-auto d-block");
        image.addClass("mb-2");
        entryHtml.append(image);
    }

    let author = $("<h4>");
    author.text(entry.author);
    entryHtml.append(author);

    if (entry.title) {
        let title = $("<h2>");
        title.text(entry.title);
        entryHtml.append(title);
    }

    let components = entry.timeStamp.split("T")[0].split('-');
    let year = parseInt(components[0], 10);
    let month = parseInt(components[1], 10);
    let day = parseInt(components[2], 10);
    let dateString = 'Submitted ' + month + '/' + day + '/' + year
    let date = $("<h5>");
    date.text(dateString);
    entryHtml.append(date);

    let body = $("<p>");
    let fullBodyText = entry.body;
    body.text(fullBodyText);
    body.addClass("max-lines");
    entryHtml.append(body);

    entryWrapper.append(entryHtml);
    return entryWrapper;
}

$(document).ready(function () {

    // Modal code goes here first

    /* if (!document.cookie called visited) {
        display the modal
    }
    */
    var visited = readCookie("visited");
    if (!visited) {
        $("#welcome-modal").modal();
    }

    // Add a cookie that tells the site that the user has visited.
    document.cookie = "visited=true";

    $.get("/api/entry/")
        .then(function (response) {
            response.map(dbEntry => {
                let domEntry = createEntryTile(dbEntry);
                $("#results").append(domEntry)
            })

            $("#loading").css('display', 'none');

            $(".entry").on("click", function () {
                location = "/entry/" + this.id;
            })
        })
})