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


async function uploadImage(file) {
    const API_KEY = "67a057fa417fee624eb30f33";
    const API_URL = "https://mokesell-536e.restdb.io/media";

    let formData = new FormData();
    formData.append("myfile", file);  // Attach file

    console.log("Uploading image:", file.name);  // Debug log

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-apikey": API_KEY  // NO Content-Type, FormData sets it
            },
            body: formData
        });

        let data = await response.json();
        console.log("Image upload response:", data);

        if (data.ids && data.ids.length > 0) {
            const imageUrl = `https://mokesell-536e.restdb.io/media/${data.ids[0]}`;
            console.log("Image URL:", imageUrl);
            return imageUrl;
        } else {
            throw new Error("Image upload failed: No ID returned");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed. Check console for details.");
        return null;
    }
}

document.getElementById('newListingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('listingTitle').value;
    const price = document.getElementById('listingPrice').value;
    const description = document.getElementById('listingDescription').value;
    const images = document.getElementById('listingImages').files;

    if (!title || !price || !description || images.length === 0) {
        alert('Please fill out all fields and upload at least one image.');
        return;
    }

    const imageUrl = await uploadImage(images[0]);  // Upload image first

    if (!imageUrl) {
        alert("Image upload failed. Please try again.");
        return;
    }

    // Now create the listing with the image URL
    const formData = {
        "listing-name": title,
        "price": price,
        "desc": description,
        "img": imageUrl  // Store the uploaded image URL
    };

    const API_KEY = "67a057fa417fee624eb30f33";
    const API_URL = "https://mokesell-536e.restdb.io/rest/listings";

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY,
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(formData),
        });

        let data = await response.json();
        console.log("Listing created:", data);
        closeNewListingModal();
        loadListings();  // Reload listings to show the new one
    } catch (error) {
        console.error("Error adding listing:", error);
        alert("An error occurred while adding your listing.");
    }
});
function loadListings() {
    const API_KEY = "67a057fa417fee624eb30f33";
    const API_URL = "https://mokesell-536e.restdb.io/rest/listings";

    fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY,
            "Cache-Control": "no-cache",
        },
    })
    .then(response => response.json())
    .then(data => {
        const listingsGrid = document.querySelector('.listings-grid');
        listingsGrid.innerHTML = '';  // Clear current listings

        data.forEach(listing => {
            const card = document.createElement('div');
            card.classList.add('listing-card');

            // Default image placeholder if no image exists
            let imageUrl = listing.img || "https://via.placeholder.com/150";

            card.innerHTML = `
                <img src="${imageUrl}" alt="${listing['listing-name']}" class="listing-image">
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
    const APIKEY = "67a057fa417fee624eb30f33";
    const API_URL = "https://mokesell-536e.restdb.io/rest/accounts";
    
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

    fetch(API_URL, settings)
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
