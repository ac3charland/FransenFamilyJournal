console.log("Script is running!")

$(document).ready(function() {
    $("#login-submit").click(function(event) {
        event.preventDefault()

        let email = $("#email").val();
        let password = $("#password").val();
        let newUser = {
            user: {
                email: email,
                password: password
            }
        }
        $.post("/api/users/login", newUser).then(function(response) {
            console.log(response);
            $("#response").text(JSON.stringify(response));
            console.log("Saving token: " + response.user.token);
            localStorage.setItem("ffjtoken", response.user.token);
        })

    })
})