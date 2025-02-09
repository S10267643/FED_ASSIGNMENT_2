

//signup 
document.addEventListener("DOMContentLoaded", function () {
    

//[STEP 1]: Create our submit form listener
document.getElementById("acct_submit").addEventListener("click", async function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: Let's retrieve form data
    // For now, we assume all information is valid
    // You are to do your own data validation
    let username = document.getElementById("acct_name").value;
    let email = document.getElementById("acct_email").value;
    let password = document.getElementById("acct_password").value;
    

    //[STEP 2.5]: Validate form data
    console.log(APIvalidation.replace("xxx",username).replace("yyy",email));
    response = await fetch(APIvalidation.replace("xxx",username).replace("yyy",email), {
      headers: { "x-apikey": APIKEY }
  });
  user= await response.json();
  if  (user.length > 0) {
    alert("Username or Email already exists.");
    return;
  }



    //[STEP 3]: Get form values when the user clicks on send
    // Adapted from restdb API
    let jsondata = {
      "email": email,
      "username": username,
      "password": password
    };

    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      method: "POST", //[cher] we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.getElementById("acct_submit").disabled = true;
        // Clear our form using the form ID and triggering its reset feature
        
      }
    }

    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch(APIaccounts, settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("acct_submit").disabled = false;
        document.getElementById("signup").reset();
        alert("Account created successfully. Please log in.")
      });
      
  });//end click 

});



//login 
document.addEventListener("DOMContentLoaded", function () {
  
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
          let search = await fetch(APIaccounts, settings);
          const data = await search.json();
          let check = false;
        
          for (let i of data) {
              if (i.email === email && i.password === password && i.username === username) {
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
          alert("Error occurred during login. Please try again." + error.value);
      }
  });

  function updateAccountButton(username) {
      accountBtn.textContent = username;
      accountBtn.addEventListener("click", function () {
          window.location.href = "account.html"; // Redirect to account page
      });
  }


});
