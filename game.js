// Global Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highestScore = 0;

// Function to play sound for a given color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Update highest score
        if (level > highestScore) {
            highestScore = level;
            $("#highest-score").text("Highest Score: " + highestScore);
            localStorage.setItem('highestScore', highestScore);
        }

        startOver();
    }
}

// Function to reset the game variables
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

// Detect when a keyboard key has been pressed
$(document).keydown(function() {
    if (!started) {
        started = true;
        nextSequence();
    }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
