//variables we need
var buttonColours = ['red', 'blue', 'green', 'yellow'];//array with 4 colours of the simon game
var gamePattern = []; //array for save the previous colors in the pattern game.
var userClickedPattern = []; //array for save the user chosen pattern.

// random number for next sequence
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4); //random number 0 to 3 

  //chosen color
  const randomChosenColour = buttonColours[randomNumber]; //the color for random number chosen
  gamePattern.push(randomChosenColour); //adding chosen color for save previous moves for the game.

  //selecting button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeTo('fast',0.0).fadeTo('fast', 1.0);

  // selecting audio with the same name to the color chosen
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3"); 
  audio.play();
}

$('.btn').click(function (e) { 
  e.preventDefault();
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
});

