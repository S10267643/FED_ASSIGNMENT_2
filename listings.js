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

function displayListings(listings) {
    const trendingContainer = document.getElementById("trending-listings");
    const forYouContainer = document.getElementById("foryou-listings");

    let trendingCount = 0;
    let forYouCount = 0;

    // Shuffle listings randomly
    const shuffledListings = listings.sort(() => Math.random() - 0.5);

    shuffledListings.forEach(listing => {
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

        // Assign to Trending (Max 10 items)
        if (trendingCount < 10) {
            trendingContainer.appendChild(card);
            trendingCount++;
        } 
        // Assign to For You (Max 20 items)
        else if (forYouCount < 20) {
            forYouContainer.appendChild(card);
            forYouCount++;
        }
    });
}

// Trending Side Scroll Function
function scrollTrending(direction) {
    const container = document.querySelector(".trending");
    const scrollAmount = 270 * 5; // Adjust for card width
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// Load Listings on Page Load
document.addEventListener("DOMContentLoaded", fetchListings);
