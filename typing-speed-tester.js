//Define const
const typingTester = document.querySelector(".typing-tester"); //main div with all user input
const userInput = document.querySelector("#user-input"); //div with text-area
const testArea = document.querySelector("#text-area"); //text-area for user input
const originText = document.querySelector("#origin-text p").innerHTML; //text to type
const theTimer = document.querySelector("#clock"); //timer
const resetButton = document.querySelector("#reset"); //rest button

var timer = [0,0,0,0]; //sets initial time var to 0
var interval;
var timerRunning = false; //prevents clock from reasuming running /when the script originaly loads, the timer is not running/


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time<=9) { 
    time = "0" + time; //if time is 1-digit number, it converts value to string and adds 0 at the beginning
  }
  return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]); //displays time in a proper manner 00:00:00
  theTimer.innerHTML = currentTime;
  timer[3]++; //increases timer the milisec value 
  
  //breaks number from runTimmer function into proper values
  timer[0] = Math.floor((timer[3]/100)/60); //defines minutes
  timer[1] = Math.floor((timer[3]/100) - timer[0]*60); //defines seconds
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); //defines miliseconds
}


// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value; //checks match of the complete text 
  let originTextMatch = originText.substring(0, textEntered.length); //checks match letter by letter
  
  if (textEntered == originText) {
    clearInterval(interval); //stops clock from running, when texts match each other
    testArea.style.borderColor = "#7CFC00"; //sets borders around textarea to green if text matches exactly to origin
  } else {
    if (textEntered == originTextMatch) {
      testArea.style.borderColor = "#00BFFF"; //sets borders around textarea to blue if letter by letter text matches the origin text
    } else {
      testArea.style.borderColor = "#FF8C00"; //sets borders around textarea to orange if texts don't match
    }
  }
}


// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length; 
  if (textEnteredLength === 0 && !timerRunning) { //detects the very first keypres only
    timerRunning = true; //clock not starts again
    interval = setInterval(runTimer, 10); //runs the function every 10ms
  }
  console.log(textEnteredLength);
}


// Reset everything:
function reset() {
  clearInterval(interval); //ensures that browser doesn't run interval in the background
  interval = null; //sets interval to 0
  timer = [0,0,0,0]; //sets proper timing
  timerRunning = false; //enables timerRunning to start the function
  
  //visual reset:
  testArea.value = ""; //clears textarea
  theTimer.innerHTML = "00:00:00"; //clears times
  testArea.style.borderColor = "#B9B9B4" //sets default border around textarea
}


// Event listeners for keyboard input and the reset button:
//event that starts clock when user press any key:
testArea.addEventListener("keypress", start, false); 

//event that checks if the text entered maches the origin text:
testArea.addEventListener("keyup", spellCheck, false);

//event that enables rest button:
resetButton.addEventListener("click", reset, false);
