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

    const title = document.getElementById('listingTitle').value;
    const price = document.getElementById('listingPrice').value;
    const description = document.getElementById('listingDescription').value;
    const images = document.getElementById('listingImages').files;

    if (!title || !price || !description || images.length === 0) {
        alert('Please fill out all fields and upload at least one image.');
        return;
    }

    // Prepare form data for API request
    const formData = {
        "listing-name": title,
        "price": price,
        "desc": description,
        "img": ""  // Placeholder, you can upload the image to a cloud storage and then add the URL
    };

    // Add image upload handling (upload image to cloud storage)
    // (For now, we'll skip image upload and just show a placeholder image URL)
    const placeholderImage = "https://via.placeholder.com/150";  // Replace with actual image URL after uploading
    formData.img = placeholderImage;

    // API request to add new listing to database
    const API_KEY = "67a057fa417fee624eb30f33";
    const API_URL = "https://mokesell-536e.restdb.io/rest/listings";
    
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY,
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify(formData),
    };

    // Send request to add listing to the database
    fetch(API_URL, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Listing created:", data);
            closeNewListingModal();
            loadListings();  // Reload the listings to show the new listing
        })
        .catch(error => {
            console.error("Error adding listing:", error);
            alert("An error occurred while adding your listing.");
        });
});
// Function to fetch and display the listings
function loadListings() {
    const API_KEY = "67a057fa417fee624eb30f33";
    const API_URL = "https://mokesell-536e.restdb.io/rest/listings";

    // Fetch existing listings from the database
    const settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY,
            "Cache-Control": "no-cache",
        },
    };

    fetch(API_URL, settings)
        .then(response => response.json())
        .then(data => {
            const listingsGrid = document.querySelector('.listings-grid');
            listingsGrid.innerHTML = '';  // Clear the current listings

            // Loop through each listing and display it
            data.forEach(listing => {
                const card = document.createElement('div');
                card.classList.add('listing-card');

                card.innerHTML = `
                    <img src="${listing.img}" alt="${listing['listing-name']}" class="listing-image">
                    <div class="listing-content">
                        <h3>${listing['listing-name']}</h3>
                        <p class="listing-price">$${listing.price}</p>
                        <p class="listing-status ${listing.status || 'active'}">${listing.status || 'Active'}</p>
                        <div class="listing-actions">
                            <button class="edit-listing">Edit</button>
                            <button class="delete-listing" onclick="deleteListing('${listing._id}')">Delete</button>
                        </div>
                    </div>
                `;

                listingsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error loading listings:", error);
            alert("Error loading listings.");
        });
}

// Load listings when the page loads
document.addEventListener("DOMContentLoaded", loadListings);
// Function to delete a listing
function deleteListing(listingId) {
    const API_KEY = "67a057fa417fee624eb30f33";
    const API_URL = `https://mokesell-536e.restdb.io/rest/listings/${listingId}`;

    const settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY,
            "Cache-Control": "no-cache",
        },
    };

    fetch(API_URL, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Listing deleted:", data);
            loadListings();  // Reload listings to remove the deleted one
        })
        .catch(error => {
            console.error("Error deleting listing:", error);
            alert("An error occurred while deleting the listing.");
        });
}


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
    window.location.href = "loading.html"; // Redirect to home page
});












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
