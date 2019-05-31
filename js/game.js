//variables we need
var buttonColours = ['red', 'blue', 'green', 'yellow'];//array with 4 colours of the simon game
var gamePattern = []; //array for save the previous colors in the pattern game.
var userClickedPattern = []; //array for save the user chosen pattern.
var level = 0;
var start = false;



// random number for next sequence
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4); //random number 0 to 3 
  userClickedPattern = []; //restart user choice for comparate with game pattern.

  //chosen color
  const randomChosenColour = buttonColours[randomNumber]; //the color for random number chosen
  gamePattern.push(randomChosenColour); //adding chosen color for save previous moves for the game.

  //selecting button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeTo('fast',0.0).fadeTo('fast', 1.0);

  // selecting audio with the same name to the color chosen
  playSound(randomChosenColour);

  //change h1 to level ++
  changeTitle("Level " + level);
  level++;
}

// function  for play sound with color like argument
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3"); 
  audio.play();
}

// function for animate the click of buttons adding and removing class and wrong answer
function animatePress(currentColour, Class) {
  $(currentColour).addClass(Class);
  setTimeout(() => {
    $(currentColour).removeClass(Class);
  }, 100);
}

// function for change title 
function changeTitle(text) {
  $("#level-title").text(text);
}

//event handler click in all buttons
$('.btn').click(function (e) { 
  e.preventDefault();
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress("#" + userChosenColour, "pressed");
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


//start the game with press any key 
$(document).keypress(function (e) { 
  if (e.key === 'a' && start === false){
    nextSequence();
    start = true;
  }
});


function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}

//check answer from user and checking all choice for the user and compare with game pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //compare choice  user and game pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    animatePress('body', 'game-over');
    changeTitle("Game Over, Press A Key to Restart");
    startOver();
  }
}