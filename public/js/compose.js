$(document).ready(function() {
    console.log("compose.js is running!")
    $("#entry-submit").submit(function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        
        console.log("formData:")
        console.log(formData);

        jQuery.ajax({
            url: '/api/entry/submit',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function (data) {
                location = "/";
            }
        });
    });

})