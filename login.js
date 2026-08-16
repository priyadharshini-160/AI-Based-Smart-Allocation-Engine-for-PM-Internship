document.addEventListener("DOMContentLoaded", function () {

    console.log("Login page loaded");


    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {

        console.error(
            "ERROR: loginForm was not found."
        );

        return;
    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            console.log("Login button clicked");


            const emailInput =
                document.getElementById("email");


            const passwordInput =
                document.getElementById("password");


            const message =
                document.getElementById("loginMessage");


            if (!emailInput || !passwordInput) {

                console.error(
                    "Email or password field not found."
                );

                return;
            }


            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            /* ==============================
               VALIDATION
            ============================== */

            if (email === "") {

                showLoginMessage(
                    "Please enter your email address.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            if (password === "") {

                showLoginMessage(
                    "Please enter your password.",
                    "error"
                );

                passwordInput.focus();

                return;
            }


            /* ==============================
               GET REGISTERED USERS
            ============================== */

            let users = [];


            try {

                users =
                    JSON.parse(
                        localStorage.getItem("users")
                    ) || [];

            } catch (error) {

                console.error(
                    "Unable to read users:",
                    error
                );

                users = [];

            }


            console.log(
                "Registered users:",
                users
            );


            /* ==============================
               FIND USER
            ============================== */

            const user =
                users.find(
                    function (registeredUser) {

                        return (
                            registeredUser.email
                                .toLowerCase()
                                === email
                            &&
                            registeredUser.password
                                === password
                        );

                    }
                );


            /* ==============================
               USER NOT FOUND
            ============================== */

            if (!user) {

                showLoginMessage(
                    "Invalid email or password. Please register first.",
                    "error"
                );

                return;
            }


            /* ==============================
               LOGIN SUCCESS
            ============================== */

            console.log(
                "Login successful:",
                user
            );


            /*
             * Store complete logged-in user
             */

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            /* ==============================
               SUCCESS MESSAGE
            ============================== */

            showLoginMessage(
                "Login successful! Opening dashboard...",
                "success"
            );


            /*
             * Small delay so user can see
             * the success message.
             */

            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                700
            );

        }
    );

});


/* =====================================================
   SHOW LOGIN MESSAGE
===================================================== */

function showLoginMessage(text, type) {

    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!message) {
        return;
    }


    message.textContent =
        text;


    message.className =
        "message " + type;

}