function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary)
};

function createEntryTile(entry) {
    let entryHtml = $("<div>");

    let image = $("<img>");
    let data = arrayBufferToBase64(entry.image.data.data);
    let srcString = "data:" + entry.image.contentType + ";base64," + data;
    image.attr("src", srcString);
    entryHtml.append(image);

    let title = $("<h2>");
    title.text(entry.title);
    entryHtml.append(title);

    let author = $("<h4>");
    author.text("By " + entry.author);
    entryHtml.append(author);

    let body = $("<p>");
    let fullBodyText = entry.body;
    let sampleBodyText;
    if (fullBodyText.length > 200) {
        sampleBodyText = fullBodyText.substring(0, 200) + "(...)";
    } else {
        sampleBodyText = fullBodyText;
    }
    
    body.text(sampleBodyText);
    entryHtml.append(body);
    // Formatting body display:
    // https://stackoverflow.com/questions/15612747/show-first-3-lines-in-html-paragraph

    console.log("Returning the following entry:")
    console.log(entryHtml);
    return entryHtml;
}

$(document).ready(function() {
    $.get("/api/entry/")
    .then(function(response) {
        console.log("Here's the .then response from /api/entry/:");
        console.log(response);

        let entriesAdded = 0;

        response.map(dbEntry => {
            console.log("Adding the following entry to the DOM:");
            console.log(dbEntry);
            if (entriesAdded % 2 === 0) {
                console.log("Even entry")
                let row = $("<div>");
                const rowNumber = entriesAdded % 2;
                row.attr("id", "row" + rowNumber);
                row.addClass("row");

                let column = $("<div>");
                column.attr("id", "entry" + entriesAdded);
                column.addClass("col-md-6");

                let domEntry = createEntryTile(dbEntry);
                console.log("Here's the output of createEntryTile():");
                console.log(domEntry);
                column.append(domEntry);
                row.append(column);
                $("#results").append(column);
            } else {
                const rowNumber = entriesAdded % 2;
                const rowId = "#row" + rowNumber;
                let row = $(rowId);

                let column = $("<div>");
                column.attr("id", "entry" + entriesAdded);
                column.addClass("col-md-6");

                let domEntry = createEntryTile(entry);
                column.append(domEntry);
                row.append(column);
            }
            entriesAdded++;
        })
    })
})