const APIKEY = "67a8388f4dfa0c7c1531a3ea";
const APIURL = "https://mokeselltests-4525.restdb.io/rest/listings";



// Fetch the listing details by ID
async function fetchListingDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get("id");

    if (!listingId) {
        document.body.innerHTML = "<h2>Listing Not Found</h2>";
        return;
    }

    try {
        const response = await fetch(APIURL, {
            headers: { "x-apikey": APIKEY }
        });

        if (!response.ok) throw new Error("Failed to fetch listings.");

        const listings = await response.json();
        const listing = listings.find(item => item._id === listingId); // Match using _id

        if (!listing) {
            document.body.innerHTML = "<h2>Listing Not Found</h2>";
            return;
        }

        // Populate HTML with listing data
        document.getElementById("listing-img").src = listing.img;
        document.getElementById("listing-name").textContent = listing["listing-name"];
        document.getElementById("listing-desc").textContent = listing.desc;
        document.getElementById("listing-price").textContent = `$${listing.price}`;
    } catch (error) {
        console.error("Error fetching listing details:", error);
        document.body.innerHTML = "<h2>Listing Not Found</h2>";
    }
}

document.addEventListener("DOMContentLoaded", fetchListingDetails);


