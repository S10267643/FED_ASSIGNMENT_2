
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
  


