
document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const accountAccess = document.querySelector(".account-access");
    const closeBtn = document.querySelector(".close-btn");

    // Show modal when clicking "Account"
    accountAccess.addEventListener("click", function () {
        authModal.style.display = "flex";
    });

    // Hide modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        authModal.style.display = "none";
    });

    // Hide modal if user clicks outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === authModal) {
            authModal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // API endpoint and key
    const API_URL = "https://mokesell-536e.restdb.io/rest/users";
    const API_KEY = "67a057fa417fee624eb30f33";

    // SIGNUP FORM HANDLING
    document.getElementById("signUpForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form input values
        const name = event.target.elements[0].value;
        const email = event.target.elements[1].value;
        const password = event.target.elements[2].value;

        // Prepare user data
        const userData = {
            name: name,
            email: email,
            password: password // Ideally, hash the password before sending
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                    "Cache-Control": "no-cache",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("Sign-up successful! You can now log in.");
                event.target.reset();
            } else {
                alert("Error signing up. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });

    // LOGIN FORM HANDLING
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form input values
        const email = event.target.elements[0].value;
        const password = event.target.elements[1].value;

        try {
            const response = await fetch(${API_URL}?q={"email":"${email}"}, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                    "Cache-Control": "no-cache",
                },
            });

            const users = await response.json();

            if (users.length === 0) {
                alert("User not found. Please sign up first.");
                return;
            }

            const user = users[0];

            if (user.password === password) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(user)); // Store user session
                event.target.reset();
            } else {
                alert("Incorrect password. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });
});