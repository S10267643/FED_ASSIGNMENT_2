// search function
document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const searchTerm = document.getElementById("search-input").value.trim();

  if (searchTerm) {
      // Redirect to loading page first
      window.location.href = `loading.html?query=${encodeURIComponent(searchTerm)}`;
  }
});



  // Game files
  function startGame() {
    // Fetch a game image from the backend
    fetch('Catch-The-Beat-Java--master/') // Replace with your backend endpoint
        .then(response => response.blob())
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            document.getElementById('gameImage').src = imageUrl; // Set the game image
        })
        .catch(error => console.error('Error loading game image:', error));

    // Fetch a sound file for the game (e.g., start sound)
    const startSound = new Audio('http://localhost:8080/sounds/start.wav');
    startSound.play(); // Play the start sound
}

// This function can be used to communicate with your Java backend to fetch game data
function fetchGameData() {
    fetch('http://localhost:8080/get-game-data')  // Your API endpoint
        .then(response => response.json())
        .then(data => {
            console.log('Game data:', data);
            // Handle the game data (e.g., set player score, level, etc.)
        })
        .catch(error => console.error('Error fetching game data:', error));
}

// This is for the trending container left and right buttons
const trendingContainer = document.querySelector('.trending-product-grid');
const trendingPrevButton = document.getElementById('trendingprevButton');
const trendingNextButton = document.getElementById('trendingnextButton'); 

// Scroll left (previous)
trendingPrevButton.addEventListener('click', () => {
  trendingContainer.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

// Scroll right (next)
trendingNextButton.addEventListener('click', () => {
  trendingContainer.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});
  
// This is for the discount container left and right buttons
const discountContainer = document.querySelector('.discount-product-grid');
const discountPrevButton = document.getElementById('discountprevButton');
const discountNextButton = document.getElementById('discountnextButton'); 

// Scroll left (previous)
discountPrevButton.addEventListener('click', () => {
  discountContainer.scrollBy({
    left: -300, 
    behavior: 'smooth'
  });
});

// Scroll right (next)
discountNextButton.addEventListener('click', () => {
  discountContainer.scrollBy({
    left: 300, 
    behavior: 'smooth'
  });
});
  


