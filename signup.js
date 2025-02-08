let settings = {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
  },
  body: JSON.stringify(jsondata),
  mode: "cors"  // Add this line
};




document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "67a7acd693d83b6c60235224";

  document.getElementById("signup").addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      let username = document.getElementById("acct_name").value.trim();
      let email = document.getElementById("acct_email").value.trim();
      let password = document.getElementById("acct_password").value.trim();

      if (!username || !email || !password) {
          alert("All fields are required!");
          return;
      }

      let jsondata = {
          "username": username,
          "email": email,
          "password": password
      };

      let settings = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          },
          body: JSON.stringify(jsondata)
      };

      try {
          document.getElementById("acct_submit").disabled = true; // Disable button while processing

          let response = await fetch("https://mokesell-536e.restdb.io/rest/accounts", settings);

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }

          let data = await response.json();
          console.log("Signup Response:", data);

          alert("Account created successfully! Please log in.");
          document.getElementById("signup").reset(); // Reset form
      } catch (error) {
          console.error("Signup Error:", error);
          alert("Error signing up. Check the console for more details.");
      } finally {
          document.getElementById("acct_submit").disabled = false; // Re-enable button
      }
  });
});


  // Login event listener
const APIKEY = "67a7acd693d83b6c60235224";

  document.getElementById("login").addEventListener("submit", async function (event) {
      event.preventDefault();

      let username = document.getElementById("username").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();

      if (!username || !email || !password) {
          alert("All fields are required!");
          return;
      }

      let settings = {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          }
      };

      try {
          let response = await fetch("https://mokesell-536e.restdb.io/rest/accounts", settings);
          let users = await response.json();
          let userFound = users.find(user => user.email === email && user.password === password && user.username === username);

          if (userFound) {
              alert("Login successful. Welcome to MokeSell!");

              localStorage.setItem("username", userFound.username);
              localStorage.setItem("email", userFound.email);
              localStorage.setItem("password", userFound.password);

              updateAccountButton(userFound.username);
              window.location.href = "account.html"; // Redirect after login
          } else {
              alert("Invalid credentials. Please try again.");
          }
      } catch (error) {
          console.error("Login error:", error);
          alert("Error logging in. Please try again.");
      }
  });

  function updateAccountButton(username) {
      let accountBtn = document.querySelector(".btn-info");
      if (accountBtn) {
          accountBtn.textContent = username;
          accountBtn.addEventListener("click", function () {
              window.location.href = "account.html"; // Redirect to account page
          });
      }
  }

  // Check if user is already logged in and update button
  let loggedInUser = localStorage.getItem("username");
  if (loggedInUser) {
      updateAccountButton(loggedInUser);
  }


