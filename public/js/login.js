console.log("Script is running!")

$(document).ready(function() {
    $("#register-submit").submit(function(event) {
        event.preventDefault()

        console.log("Submitting register form...")

        let email = $("#registerEmail").val();
        let password1 = $("#registerPassword1").val();
        let password2 = $("#registerPassword2").val();

        if (password1 !== password2) {
            $("#confirmPasswordHelp").text("Passwords do not match.");
            return
        } else {
            $("#confirmPasswordHelp").text("");
        }
        let newUser = {
            user: {
                email: email,
                password: password1,
                passwordCheck: password2
            }
        }
        $.post("/api/users/", newUser).then(function (response, err) {
            console.log(response);
            if (err) {
                console.log(err);
            }
            $("#response").text(JSON.stringify(response));
            console.log("Saving token: " + response.user.token);
            // // Clear the previous cookie by setting it it equal to nothing and its expiration date to a past time
            // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            // document.cookie = "token=" + response.user.token + "; Secure; HttpOnly";
            localStorage.setItem("ffj", response.user.token);
            location = "/";
        });
    });
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
            // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            // document.cookie = "token=" + response.user.token + "; Secure; HttpOnly"
            // console.log("Printing cookies:")
            // console.log(document.cookie);
            localStorage.setItem("ffj", response.user.token);
            location = "/";
        })

    })
})