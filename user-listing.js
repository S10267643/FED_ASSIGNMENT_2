

// Get the listing ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// Fetch and display the listing details
async function fetchListingDetails() {
    if (!listingId) {
        document.body.innerHTML = "<h2>Listing Not Found</h2>";
        return;
    }

    try {
        const response = await fetch(`${APIlisting}/${listingId}`, {
            headers: { "x-apikey": APIKEY }
        });

        if (!response.ok) throw new Error("Failed to fetch listing.");

        const listing = await response.json();

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


async function deleteListing() {
    if (!listingId) {
        alert("Listing not found.");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${APIlisting}/${listingId}`, {
            method: "DELETE",
            headers: { "x-apikey": APIKEY }
        });

        if (!response.ok) throw new Error("Failed to delete listing.");

        alert("Listing deleted successfully!");
        window.location.href = "account.html"; // Redirect to account page after deletion
    } catch (error) {
        console.error("Error deleting listing:", error);
        alert("Failed to delete the listing.");
    }
}

// Function to go back to the account page
function goBack() {
    window.location.href = "account.html";
}

// Function to send a chat message (placeholder function)
function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    
    if (chatInput.value.trim() === "") return;

    const message = document.createElement("p");
    message.textContent = chatInput.value;
    message.style.background = "#007bff";
    message.style.color = "white";
    message.style.padding = "10px";
    message.style.borderRadius = "5px";
    message.style.margin = "5px 0";
    message.style.textAlign = "right";

    chatBox.appendChild(message);
    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Load listing details when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchListingDetails();
    document.getElementById("delete-btn").addEventListener("click", deleteListing);
});
