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

    let title = $("<h2>");
    title.text(entry.title);
    entryHtml.append(title);

    let body = $("<p>");
    let fullBodyText = entry.body;
    body.text(fullBodyText);
    body.addClass("max-lines");
    entryHtml.append(body);
    
    entryWrapper.append(entryHtml);
    return entryWrapper;
}

$(document).ready(function() {

    // Modal code goes here first

    /* if (!document.cookie called visited) {
        display the modal
    }
    */
    var visited = readCookie("visited");
    if (!visited) {
        console.log("Page has not been visited!");
        $("#welcome-modal").modal();
    } else {
        console.log("Page has been visited.")
    }

    // Add a cookie that tells the site that the user has visited.
   document.cookie = "visited=true";
   console.log(document.cookie);


    $.get("/api/entry/")
    .then(function(response) {

        let entriesAdded = 0;

        response.map(dbEntry => {
            if (entriesAdded % 2 === 0) {
                let row = $("<div>");
                const rowNumber = Math.floor(entriesAdded / 2);

                row.attr("id", "row" + rowNumber);
                row.addClass("row");
                row.addClass("mb-4");

                let column = $("<div>");
                column.attr("id", "entry" + entriesAdded);
                column.addClass("col-md-6");

                let domEntry = createEntryTile(dbEntry);
                column.append(domEntry);
                row.append(column);
                $("#results").append(row);
            } else {
                const rowNumber = Math.floor(entriesAdded / 2);

                let column = $("<div>");
                column.attr("id", "entry" + entriesAdded);
                column.addClass("col-md-6");

                let domEntry = createEntryTile(dbEntry);
                column.append(domEntry);
                $("#row" + rowNumber).append(column);
            }
            entriesAdded++;
        })

        $("#loading").attr('hidden', true);

        $(".entry").on("click", function() {
            console.log(this.id);
            location = "/entry/" + this.id;
        })
    })
})