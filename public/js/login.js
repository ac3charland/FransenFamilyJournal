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
            // Clear the previous cookie by setting it it equal to nothing and its expiration date to a past time
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            document.cookie = "token=" + response.user.token + "; Secure; HttpOnly"
            console.log("Printing cookies:")
            console.log(document.cookie);
        })

    })
})