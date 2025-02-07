const API_KEY = "67a057fa417fee624eb30f33";
const API_URL = "https://mokesell-536e.restdb.io/rest/listings";

// Get the ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// Retrieve stored IDs to find the correct listing
const storedIDs = JSON.parse(localStorage.getItem("listingIDs")) || {};

// Find the listing name from the stored IDs
const listingName = Object.keys(storedIDs).find(name => storedIDs[name] === listingId);

// Fetch and display the listing details if found
async function fetchListingDetails() {
    if (!listingName) {
        document.body.innerHTML = "<h2>Listing Not Found</h2>";
        return;
    }

    try {
        const response = await fetch(API_URL, {
            headers: { "x-apikey": API_KEY }
        });

        if (!response.ok) throw new Error("Failed to fetch listings.");

        const listings = await response.json();
        const listing = listings.find(item => item["listing-name"] === listingName);

        if (!listing) {
            document.body.innerHTML = "<h2>Listing Not Found</h2>";
            return;
        }

        document.getElementById("listing-img").src = listing.img;
        document.getElementById("listing-name").textContent = listing["listing-name"];
        document.getElementById("listing-desc").textContent = listing.desc;
        document.getElementById("listing-price").textContent = `$${listing.price}`;
    } catch (error) {
        console.error("Error fetching listing details:", error);
        document.body.innerHTML = "<h2>Listing Not Found</h2>";
    }
}

// Load the listing details on page load
document.addEventListener("DOMContentLoaded", fetchListingDetails);
