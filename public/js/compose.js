function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

$(document).ready(function() {
    
    $("#entry-submit").submit(function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        var token = localStorage.getItem("ffj");
        var parsedToken = parseJwt(token);

        var userId = parsedToken.id;

        formData.append("user_id", userId);

        $("#loading").attr("hidden", false);

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