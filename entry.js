// Function to start the game
function startGame() {
    $("#entry-page").hide();
    $("#game-page").show();
    var playerName = localStorage.getItem('playerName');
    if (playerName) {
      document.getElementById('player-name').textContent = "Player: " + playerName;
    }
    nextSequence();
  }
  
  // Handle name entry form submission
  document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var name = document.getElementById('name-input').value;
    if (name) {
      localStorage.setItem('playerName', name);
      startGame(); // Start the game after name entry
    }
  });
  
