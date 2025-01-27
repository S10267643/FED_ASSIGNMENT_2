document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "679717f9f9d2bbe70d181e2e";

  // Handle Sign-Up form submission
  document.getElementById("signUpForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const newUser = {
      fullName,
      email,
      password
    };

    try {
      const apiUrl = "https://mokesell-1e1c.restdb.io/rest/system_jobs"; // Update with your actual DB URL
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "your_restdb_api_key",  // Replace with your API key
          "cache-control": "no-cache"
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        alert("Account created successfully!");
        toggleModal(); // Close the modal after successful submission
      } else {
        alert("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error creating your account. Please try again.");
    }
  });

  // Handle Delete Account functionality
  document.getElementById("deleteAccountBtn").addEventListener("click", async function() {
    const userId = document.getElementById("userId").value; // Assuming you have an input for user ID (hidden or visible)
    
    if (userId) {
      try {
        const apiUrl = `https://mokesell-1e1c.restdb.io/rest/system_jobs/${userId}`; // Update with your actual DB URL and the user ID
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-apikey": "your_restdb_api_key",  // Replace with your API key
            "cache-control": "no-cache"
          }
        });

        if (response.ok) {
          alert("Account deleted successfully!");
          // Optionally, close the modal or navigate to another page
        } else {
          alert("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error deleting your account. Please try again.");
      }
    } else {
      alert("No user selected to delete.");
    }
  });

  // Modal toggle function
  
  

  function toggleModal() {
    const modal = document.getElementById("authModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  }





