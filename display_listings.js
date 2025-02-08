const API_KEY = "67a7acd693d83b6c60235224";
const API_URL = "https://mokesell-536e.restdb.io/rest/listings";
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

// Function to generate a random unique ID
function generateUniqueID() {
    return 'listing-' + Math.random().toString(36).substr(2, 9);
}

// Function to get or assign an ID for each listing
function getListingID(listing) {
    // Load stored IDs from localStorage
    let storedIDs = JSON.parse(localStorage.getItem("listingIDs")) || {};

    // If listing already has an ID, return it
    if (storedIDs[listing['listing-name']]) {
        return storedIDs[listing['listing-name']];
    }

    // Otherwise, assign a new ID
    const newID = generateUniqueID();
    storedIDs[listing['listing-name']] = newID;

    // Save updated IDs to localStorage
    localStorage.setItem("listingIDs", JSON.stringify(storedIDs));

    return newID;
}

// Fetch and display listings
async function fetchListings() {
    try {
        const response = await fetch(API_URL, {
            headers: { "x-apikey": API_KEY }
        });
        const listings = await response.json();
        displayListings(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

function displayListings(listings) {
    const trendingContainer = document.getElementById("trending-listings");
    const forYouContainer = document.getElementById("foryou-listings");

    let trendingCount = 0;
    let forYouCount = 0;

    listings.forEach(listing => {
        const card = document.createElement("div");
        card.classList.add("listing-card");

        // Use the actual listing _id from the database
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

        // Navigate to listing.html with the correct ID
        card.addEventListener("click", function () {
            window.location.href = `listing.html?id=${listingID}`;
        });

        if (trendingCount < 10) {
            trendingContainer.appendChild(card);
            trendingCount++;
        } else if (forYouCount < 20) {
            forYouContainer.appendChild(card);
            forYouCount++;
        }
    });
}


// Load Listings on Page Load
document.addEventListener("DOMContentLoaded", fetchListings);
