
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
document.getElementById('trendingprevButton').addEventListener('click', function() {
    const productGrid = document.querySelector('.product-grid');
    const width = productGrid.offsetWidth; // Get the width of the container
    productGrid.scrollBy({
      left: -width, // Scroll left by the container width
      behavior: 'smooth'
    });
  });
  
  document.getElementById('trendingnextButton').addEventListener('click', function() {
    const productGrid = document.querySelector('.product-grid');
    const width = productGrid.offsetWidth; // Get the width of the container
    productGrid.scrollBy({
      left: width, // Scroll right by the container width
      behavior: 'smooth'
    });
  });
  


