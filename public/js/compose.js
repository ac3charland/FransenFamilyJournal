function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

$(document).ready(function() {
    console.log("compose.js is running!")
    
    $("#entry-submit").submit(function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        var token = localStorage.getItem("ffj");
        var parsedToken = parseJwt(token);
        console.log("Retrieved parsed token:")
        console.log(parsedToken);

        var userId = parsedToken.id;
        console.log("Retrieved id:")
        console.log(userId)

        formData.append("user_id", userId);

        $("#loading").attr("hidden", false);
        
        console.log("formData:")
        console.log(Array.from(formData.entries()));

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