$(document).ready(function () {
    const pathName = window.location.pathname;
    const token = localStorage.getItem("ffj");

    $("#about-item").attr("hidden", false)
    if (token) {
        $.ajax({
            url: "/api/users/current",
            type: 'GET',
            // Fetch the stored token from localStorage and set in the header
            headers: { "Authorization": "Token " + token }
        }).then(function (response) {
            $("#login-text-item").attr("hidden", false);
            $("#logout-item").attr("hidden", false);
            if (pathName === "/compose/") {
                $("#compose-item").attr("hidden", true);
            } else {
                $("#compose-item").attr("hidden", false);
            }
            $("#login-item").attr("hidden", true);
            $("#login-text").text("Logged in as " + response.user.email);
        });
    }

    $("#compose-link").click(function (event) {
        $.ajax({
            url: "/compose/",
            type: 'GET',
            // Fetch the stored token from localStorage and set in the header
            headers: { "Authorization": "Token " + token }
        });
    })

    $("#logout-link").click(function (event) {
        localStorage.removeItem("ffj");
    })

    $('#help-link').click(function () {
        $("#welcome-modal").modal();
    })
})