const API_KEY = "67a057fa417fee624eb30f33";
const API_URL = "https://mokesell-536e.restdb.io/rest/listings";

async function fetchListings() {
    try {
        const response = await fetch(API_URL, {
            headers: { "x-apikey": API_KEY }
        });
        const data = await response.json();
        displayListings(data);
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

function getRandomCategory() {
    const categories = ["trending-listings", "foryou-listings"];
    return categories[Math.floor(Math.random() * categories.length)];
}

function displayListings(listings) {
    listings.forEach(listing => {
        const card = document.createElement("section");
        card.classList.add("listing-card");

        card.innerHTML = `
            <img src="${listing.img}" alt="${listing['listing-name']}">
            <div class="details">
                <h3>${listing['listing-name']}</h3>
                <p>${listing.desc}</p>
                <p class="price">$${listing.price}</p>
            </div>
        `;

        // Assign the listing to a random section
        const randomSection = document.getElementById(getRandomCategory());
        randomSection.appendChild(card);
    });
}

// Load Listings on Page Load
document.addEventListener("DOMContentLoaded", fetchListings);
