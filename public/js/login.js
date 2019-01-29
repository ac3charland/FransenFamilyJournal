console.log("Script is running!")

$(document).ready(function() {
    $("#register-submit").submit(function(event) {
        event.preventDefault()

        console.log("Submitting register form...")

        let email = $("#registerEmail").val();
        let password1 = $("#registerPassword1").val();
        let password2 = $("#registerPassword2").val();
        let newUser = {
            user: {
                email: email,
                password: password1,
                passwordCheck: password2
            }
        }
        $.post("/api/users/", newUser).then(function (response) {
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
    $("#login-submit").submit(function(event) {
        event.preventDefault()

        let email = $("#loginEmail").val();
        let password = $("#loginPassword").val();
        let user = {
            user: {
                email: email,
                password: password
            }
        }
        $.post("/api/users/login", user).then(function(response) {
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