document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("registerForm not found.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("registerName");
        const emailInput = document.getElementById("registerEmail");
        const passwordInput = document.getElementById("registerPassword");
        const confirmInput = document.getElementById("confirmPassword");
        const message = document.getElementById("registerMessage");

        const selectedRole = document.querySelector(
            'input[name="role"]:checked'
        );

        if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
            console.error("Registration form fields are missing.");
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        const role = selectedRole ? selectedRole.value : "";

        if (!name) {
            showRegisterMessage("Please enter your name.", "error");
            nameInput.focus();
            return;
        }

        if (!email) {
            showRegisterMessage("Please enter your email address.", "error");
            emailInput.focus();
            return;
        }

        if (!role) {
            showRegisterMessage("Please select Student or Company.", "error");
            return;
        }

        if (password.length < 6) {
            showRegisterMessage(
                "Password must contain at least 6 characters.",
                "error"
            );
            passwordInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            showRegisterMessage("Passwords do not match.", "error");
            confirmInput.focus();
            return;
        }

        const users = getUsers();

        const existingUser = users.find(function (user) {
            return (
                user.email &&
                user.email.trim().toLowerCase() === email
            );
        });

        if (existingUser) {
            showRegisterMessage(
                "This email is already registered. Please login.",
                "error"
            );
            return;
        }

        const user = {
            id: generateId("user"),
            name: name,
            email: email,
            password: password,
            role: role,
            createdAt: new Date().toISOString()
        };

        users.push(user);
        saveUsers(users);

        showRegisterMessage(
            "Account created successfully! Redirecting to login...",
            "success"
        );

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);
    });
});

function showRegisterMessage(text, type) {
    const message = document.getElementById("registerMessage");

    if (!message) {
        return;
    }

    message.textContent = text;
    message.className = "message " + type;
}
