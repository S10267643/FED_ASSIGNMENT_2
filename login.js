document.addEventListener("DOMContentLoaded", function () {
   APIKEY = "67a057fa417fee624eb30f33";
   let login = document.getElementById("login");
   let accountBtn = document.querySelector(".btn-info"); // Selects the Account button

   // Check if user is already logged in
   let loggedInUser = localStorage.getItem("username");
   if (loggedInUser) {
       updateAccountButton(loggedInUser);
   }

   login.addEventListener("submit", async function (event) {
       event.preventDefault();
       let username = document.getElementById("username").value;
       let email = document.getElementById("email").value;
       let password = document.getElementById("password").value;

       if (!email || !password || !username) {
           alert("Email and Password and Username cannot be empty!");
           return;
       }

       let settings = {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "x-apikey": APIKEY,
               "Cache-Control": "no-cache",
           }
       };

       try {
           let search = await fetch("https://mokesell-536e.restdb.io/rest/accounts", settings);
           const data = await search.json();
           let check = false;

           for (let i of data) {
               if (i.email === email && i.password === password) {
                   alert("Log in successful. Welcome to FindSell!");
                   check = true;

                   localStorage.setItem("username", i.username); // Store username
                   localStorage.setItem("email", i.email);
                   localStorage.setItem("password", i.password);

                   updateAccountButton(i.username);
                   break;
               }
           }

           if (!check) {
               alert("Invalid email or password, try again.");
           }
       } catch (error) {
           alert("Error occurred during login. Please try again.", error);
       }
   });

   function updateAccountButton(username) {
       accountBtn.textContent = username;
       accountBtn.addEventListener("click", function () {
           window.location.href = "account.html"; // Redirect to account page
       });
   }


});
