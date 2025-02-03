//[STEP 0]: Make sure our document is A-OK
document.addEventListener("DOMContentLoaded", function () {
    // What kind of interface we want at the start 
    const APIKEY = "679717f9f9d2bbe70d181e2e";
    getContacts();
    document.getElementById("update-contact-container").style.display = "none";
    document.getElementById("add-update-msg").style.display = "none";
  
    //[STEP 1]: Create our submit form listener
    document.getElementById("contact-submit").addEventListener("click", function (e) {
      // Prevent default action of the button 
      e.preventDefault();
  
      //[STEP 2]: Let's retrieve form data
      // For now, we assume all information is valid
      // You are to do your own data validation
      let contactName = document.getElementById("contact-name").value;
      let contactEmail = document.getElementById("contact-email").value;
      let contactMessage = document.getElementById("contact-msg").value;
  
      //[STEP 3]: Get form values when the user clicks on send
      // Adapted from restdb API
      let jsondata = {
        "name": contactName,
        "email": contactEmail,
        "message": contactMessage
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
          document.getElementById("contact-submit").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-contact-form").reset();
        }
      }
  
      //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://mokesell-1e1c.restdb.io/rest/users", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("contact-submit").disabled = false;
          //@TODO update frontend UI 
          document.getElementById("add-update-msg").style.display = "block";
          setTimeout(function () {
            document.getElementById("add-update-msg").style.display = "none";
          }, 3000);
          // Update our table 
          getContacts();
        });
    });//end click 
  
  
    //[STEP] 6
    // Let's create a function to allow you to retrieve all the information in your contacts
    // By default, we only retrieve 10 results
    function getContacts(limit = 100, all = true) {
  
      //[STEP 7]: Create our AJAX settings
      let settings = {
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }
  
      //[STEP 8]: Make our AJAX calls
      // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
      // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
      fetch("https://mokesell-1e1c.restdb.io/rest/users", settings)
        .then(response => response.json())
        .then(response => {
          let content = "";
  
          for (var i = 0; i < response.length && i < limit; i++) {
            //console.log(response[i]);
            //[METHOD 1]
            // Let's run our loop and slowly append content
            // We can use the normal string append += method
            /*
            content += "<tr><td>" + response[i].name + "</td>" +
              "<td>" + response[i].email + "</td>" +
              "<td>" + response[i].message + "</td>
              "<td>Del</td><td>Update</td</tr>";
            */
  
            //[METHOD 2]
            // Using our template literal method using backticks
            // Take note that we can't use += for template literal strings
            // We use ${content} because -> content += content 
            // We want to add on previous content at the same time
            content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
            <td>${response[i].email}</td>
            <td>${response[i].message}</td>
            <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;
  
          }
  
          //[STEP 9]: Update our HTML content
          // Let's dump the content into our table body
          document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;
  
          document.getElementById("total-contacts").innerHTML = response.length;
        });
    }
  
    document.getElementById("signup-submit").addEventListener("click", function (e) {
      e.preventDefault();
  
      let username = document.getElementById("signup-username").value;
      let email = document.getElementById("signup-email").value;
      let password = document.getElementById("signup-password").value;
  
      let userData = {
          "username": username,
          "email": email,
          "password": password // Ideally, hash before storing
      };
  
      let settings = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          },
          body: JSON.stringify(userData)
      };
  
      fetch("https://mokesell-1e1c.restdb.io/rest/users", settings)
          .then(response => response.json())
          .then(data => {
              console.log("User Created:", data);
              localStorage.setItem("loggedInUser", JSON.stringify(data));
              updateAccountButton(data.username);
              document.getElementById("authModal").style.display = "none"; // Close modal
          })
          .catch(error => console.error("Error:", error));
  });
  document.getElementById("login-submit").addEventListener("click", function (e) {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        }
    };

    fetch(`https://mokesell-1e1c.restdb.io/rest/users?q={"email":"${email}"}`, settings)
        .then(response => response.json())
        .then(users => {
            if (users.length > 0 && users[0].password === password) {
                console.log("Login Successful:", users[0]);
                localStorage.setItem("loggedInUser", JSON.stringify(users[0]));
                updateAccountButton(users[0].username);
                document.getElementById("authModal").style.display = "none"; // Close modal
            } else {
                alert("Invalid email or password.");
            }
        })
        .catch(error => console.error("Error:", error));
});
function updateAccountButton(username) {
  let accountBtn = document.querySelector(".account-access p");
  accountBtn.textContent = username;
}
document.addEventListener("DOMContentLoaded", function () {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
      updateAccountButton(user.username);
  }
});




//Modal for account to work
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("authModal");
  const accountBtn = document.querySelector(".account-access p");
  const closeBtn = document.querySelector(".close-btn");

  function toggleModal() {
      if (modal.style.display === "flex") {
          modal.style.display = "none";
      } else {
          modal.style.display = "flex";
      }
  }

  // Open modal when clicking "Account"
  accountBtn.addEventListener("click", toggleModal);

  // Close modal when clicking the X button
  closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
  });

  // Close modal when clicking outside the modal-content
  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});

  // Game files

  function startGame() {
    // Fetch a game image from the backend
    fetch('Catch-The-Beat-Java--master/') // Replace with your backend endpoint
        .then(response => response.blob())
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            document.getElementById('gameImage').src = imageUrl; // Set the game image
        })
        .catch(error => console.error('Error loading game image:', error));

    // Fetch a sound file for the game (e.g., start sound)
    const startSound = new Audio('http://localhost:8080/sounds/start.wav');
    startSound.play(); // Play the start sound
}

// This function can be used to communicate with your Java backend to fetch game data
function fetchGameData() {
    fetch('http://localhost:8080/get-game-data')  // Your API endpoint
        .then(response => response.json())
        .then(data => {
            console.log('Game data:', data);
            // Handle the game data (e.g., set player score, level, etc.)
        })
        .catch(error => console.error('Error fetching game data:', error));
}
  

document.getElementById('scroll-left').addEventListener('click', function() {
  document.getElementById('trending-items').scrollBy({ left: -200, behavior: 'smooth' });
});

document.getElementById('scroll-right').addEventListener('click', function() {
  document.getElementById('trending-items').scrollBy({ left: 200, behavior: 'smooth' });
});






