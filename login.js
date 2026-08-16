document.addEventListener("DOMContentLoaded", function () {

    console.log("=================================");
    console.log("AI Allocation Engine Login");
    console.log("Login JavaScript loaded successfully");
    console.log("=================================");

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }

    if (!emailInput) {
        console.error("Email input not found.");
        return;
    }

    if (!passwordInput) {
        console.error("Password input not found.");
        return;
    }

    if (!loginButton) {
        console.error("Login button not found.");
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("Login button clicked");

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // -----------------------------
        // VALIDATION
        // -----------------------------

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

        // -----------------------------
        // READ REGISTERED USERS
        // -----------------------------

        let users = [];

        try {

            const storedUsers = localStorage.getItem("users");

            if (storedUsers) {
                users = JSON.parse(storedUsers);
            }

            if (!Array.isArray(users)) {
                users = [];
            }

        } catch (error) {

            console.error("Error reading users:", error);

            showLoginMessage(
                "Unable to read registered users.",
                "error"
            );

            return;
        }

        console.log("Users found:", users.length);

        // -----------------------------
        // CHECK USER
        // -----------------------------

        const user = users.find(function (registeredUser) {

            if (!registeredUser) {
                return false;
            }

            const registeredEmail =
                String(registeredUser.email || "")
                    .trim()
                    .toLowerCase();

            const registeredPassword =
                String(registeredUser.password || "");

            return (
                registeredEmail === email &&
                registeredPassword === password
            );

        });

        // -----------------------------
        // INVALID LOGIN
        // -----------------------------

        if (!user) {

            console.log("Login failed");

            showLoginMessage(
                "Invalid email or password. Please register first.",
                "error"
            );

            return;
        }

        // -----------------------------
        // LOGIN SUCCESS
        // -----------------------------

        console.log("Login successful:", user);

        try {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

        } catch (error) {

            console.error(
                "Unable to save login session:",
                error
            );

            showLoginMessage(
                "Unable to create login session.",
                "error"
            );

            return;
        }

        showLoginMessage(
            "Login successful! Opening dashboard...",
            "success"
        );

        loginButton.disabled = true;
        loginButton.textContent = "Opening Dashboard...";

        // -----------------------------
        // OPEN DASHBOARD
        // -----------------------------

        setTimeout(function () {

            window.location.href = "./dashboard.html";

        }, 700);

    });

});


/* ==========================================
   SHOW LOGIN MESSAGE
========================================== */

function showLoginMessage(text, type) {

    const message =
        document.getElementById("loginMessage");

    if (!message) {
        return;
    }

    message.textContent = text;

    message.className = "message " + type;

}
