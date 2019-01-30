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
    
    let entryHtml = $("<div>");
    entryHtml.addClass("p-3");

    let image = $("<img>");
    let data = arrayBufferToBase64(entry.image.data.data);
    let srcString = "data:" + entry.image.contentType + ";base64," + data;
    image.attr("src", srcString);
    image.addClass("entry-image");
    image.addClass("img-fluid");
    image.addClass("mx-auto d-block");
    image.addClass("mb-2");
    entryHtml.append(image);

    let author = $("<h4>");
    author.text(entry.author);
    entryHtml.append(author);

    let title = $("<h2>");
    title.text(entry.title);
    entryHtml.append(title);

    let body = $("<p>");
    let fullBodyText = entry.body;
    // let sampleBodyText;
    // if (fullBodyText.length > 250) {
    //     body.addClass("full-height");
    //     sampleBodyText = fullBodyText.substring(0, 250) + "(...)";
    // } else {
    //     const fullHeight = $(".full-height").first().height();
    //     console.log("fullHeight=" + fullHeight);
    //     body.addClass("partial-height");
    //     body.css("height", fullHeight);
    //     sampleBodyText = fullBodyText;
    // }
    
    body.text(fullBodyText);
    body.addClass("max-lines");
    entryHtml.append(body);
    
    entryWrapper.append(entryHtml);
    return entryWrapper;
}

$(document).ready(function() {
    $(window).resize(function() {
        let shortParagraphs = $(".partial-height");
        console.log(shortParagraphs)
        shortParagraphs.map(body => {
            const fullHeight = $(".full-height").first().height();
            console.log("Setting height to " + fullHeight);
            body.css("height", fullHeight);
        });
    })

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
    })
})