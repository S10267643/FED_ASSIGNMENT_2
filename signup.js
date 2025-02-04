
document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const openAuthModal = document.getElementById("openAuthModal");
    const closeBtn = document.querySelector(".close-btn");

    // Ensure modal opens when clicking "Account" button
    openAuthModal.addEventListener("click", function () {
        authModal.style.display = "flex";
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        authModal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === authModal) {
            authModal.style.display = "none";
        }
    });
});

    signUpForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        const userData = { name, email, password };

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
                signUpForm.reset();
            } else {
                alert("Error signing up. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch(`${API_URL}?q={"email":"${email}"}`, {
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
                localStorage.setItem("user", JSON.stringify(user));
                loginForm.reset();
            } else {
                alert("Incorrect password. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred.");
        }
    });
});