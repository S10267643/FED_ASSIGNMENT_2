// Profile Image Upload
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Prevent default only if the link is an internal section link
        if (!item.getAttribute('href').includes('.html')) {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked nav item
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.getAttribute('href').substring(1);
            document.getElementById(sectionId).classList.add('active');
        }
    });
});

// Chat functionality
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <p>${message}</p>
            <span class="message-time">${time}</span>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
    }
}

document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

// New Listing Modal
function openNewListingModal() {
    const modal = document.getElementById('newListingModal');
    modal.classList.add('active');
}

function closeNewListingModal() {
    const modal = document.getElementById('newListingModal');
    modal.classList.remove('active');
}

document.getElementById('newListingForm').addEventListener('submit', function (e) {
    e.preventDefault();

     title = document.getElementById('listingTitle').value;
     price = document.getElementById('listingPrice').value;
     description = document.getElementById('listingDescription').value;
     images = document.getElementById('listingImages').value;
    username=localStorage.getItem("username");

    if (!title || !price || !description || images.length === 0) {
        alert('Please fill out all fields and upload at least one image.');
        return;
    }

    // Prepare form data for API request
    const formData = {
        "listing-name": title,
        "price": price,
        "desc": description,
        "img": images, 
        "username": username
    };



   
    
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify(formData),
    };

    // Send request to add listing to the database
    fetch(APIlisting, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Listing created:", data);
            closeNewListingModal();
            
        })
        .catch(error => {
            console.error("Error adding listing:", error);
            alert("An error occurred while adding your listing.");
        });
});













// Fetch and display listings
async function fetchListings() {
    try {
        username=localStorage.getItem("username");
        console.log(APIforuserlisting + username);

        response = await fetch(APIforuserlisting.replace("xxx",username), {
            headers: { "x-apikey": APIKEY }
        });
         listings = await response.json();
        displayListings(listings);

    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

function displayListings(listings) {

    listingContainer = document.getElementById("listings-grid");
    
    listings.forEach(listing => {
        card = document.createElement("div");
        card.classList.add("listing-card");

        // Use the actual database _id instead of a generated ID
        const listingID = listing._id;

        card.setAttribute("data-id", listingID);

        card.innerHTML = `
            <img src="${listing.img}" alt="${listing['listing-name']}">
            <div class="details">
                <h3>${listing['listing-name']}</h3>
                <p>${listing.desc}</p>
                <p class="price">$${listing.price}</p>
            </div>
        `;

        // Add click event to navigate to listing page with the correct _id
        card.addEventListener("click", function () {
            window.location.href = `user-listing.html?id=${listingID}`;
        });

        listingContainer.appendChild(card);
    });
}

// Load Listings on Page Load
document.addEventListener("DOMContentLoaded", fetchListings);

















// Password Change Modal
function openPasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.add('active');
}

function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('active');
}

document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    // Handle password change here
    console.log('Password change:', { currentPassword, newPassword });
    closePasswordModal();
});

// Handle logout
document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear(); // Remove stored user data
    window.location.href = "index.html"; // Redirect to home page
});








//mokepoints function



document.addEventListener("DOMContentLoaded", function () {
    // Get the logged-in user's information from localStorage
    let username = localStorage.getItem("username");
    let email = localStorage.getItem("email");

    // If the user is logged in, display the profile info
    if (username && email) {
        // Update the profile name and email with the stored data
        document.querySelector('.profile-name').textContent = username;
        document.querySelector('.profile-email').textContent = email;
    } else {
        // If no user is logged in, display a message or redirect to login
        alert("You need to log in first.");
        window.location.href = "login.html"; // Redirect to login if not logged in
    }

});




document.addEventListener("DOMContentLoaded", function () {
   
    
    // Get the logged-in username from localStorage
    const loggedInUser = localStorage.getItem("username");

    if (!loggedInUser) {
        // If no user is logged in, show an error or redirect
        alert("Please log in first.");
        return;
    }

    // Fetch the user data from the database
    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
    };

    fetch(APIaccounts, settings)
        .then(response => response.json())
        .then(data => {
            let user = data.find(user => user.username === loggedInUser);
            
            if (user) {
                // If the user is found, get the MokePoints
                const mokePoints = user.mokePoints || 0;  // Default to 0 if no MokePoints field
                displayMokePoints(mokePoints);
            } else {
                // If the user is not found, show an error or set points to 0
                displayMokePoints(0);
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data.");
        });
    
    function displayMokePoints(points) {
        // Display the MokePoints in the HTML
        const pointsElement = document.querySelector(".points-value");
        if (pointsElement) {
            pointsElement.textContent = points;
        }
    }
});