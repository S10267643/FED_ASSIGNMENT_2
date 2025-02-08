
const API_KEY = "67a7acd693d83b6c60235224";
const API_URL = "https://mokesell-536e.restdb.io/rest/listings";

// Get search query from URL
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("query") ? urlParams.get("query").toLowerCase() : "";
const listingId = urlParams.get("id");




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







// Retrieve stored IDs to find the correct listing
const storedIDs = JSON.parse(localStorage.getItem("listingIDs")) || {};
// Fetch and filter listings
async function fetchSearchResults() {
    try {
        const response = await fetch(API_URL, {
            headers: { "x-apikey": API_KEY }
        });
        const listings = await response.json();

        // Filter listings based on the search query
        const filteredListings = listings.filter(listing =>
            listing["listing-name"].toLowerCase().includes(searchQuery)
        );

        displayListings(filteredListings);
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

// Display listings in the search results page
function displayListings(listings) {
    const listingsContainer = document.getElementById("search-results");
    const resultsCount = document.getElementById("search-results-count");
    const noResultsMessage = document.getElementById("no-results");

    listingsContainer.innerHTML = ""; // Clear previous listings

    if (listings.length === 0) {
        noResultsMessage.style.display = "block";
        resultsCount.textContent = "0 listings found.";
        return;
    } else {
        noResultsMessage.style.display = "none";
    }

    resultsCount.textContent = `${listings.length} listing(s) found.`;

    listings.forEach(listing => {
        const card = document.createElement("div");
        card.classList.add("listing-card");

        card.innerHTML = `
            <img src="${listing.img}" alt="${listing['listing-name']}">
            <div class="details">
                <h3>${listing['listing-name']}</h3>
                <p>${listing.desc}</p>
                <p class="price">$${listing.price}</p>
            </div>
        `;

        card.addEventListener("click", function () {
            // Redirect to listing.html with correct ID in the URL
            window.location.href = `listing.html?id=${listing._id}`;
        });
        

        listingsContainer.appendChild(card);
    });
}

// Load search results on page load
document.addEventListener("DOMContentLoaded", fetchSearchResults);



