//Coding Quiz:

// Selects element by class and id in order to target html code and create the dynamics of the game.
var startGame = document.querySelector(".start-button");
var gameInstructions = document.querySelector(".instructions");
var timeEl = document.querySelector(".time");
var quizContainer = document.querySelector("#container");
var answerContainer = document.querySelector("#answer-container");
var score = document.getElementById("score");
var formEl = document.querySelector("form");
var h3El = document.querySelector("#final-score");
var h2El = document.querySelector("#all-done");
var buttonEl = document.querySelector(".submit-button");
var allScores = document.getElementById("all-scores");
var initialsEl = document.getElementById("initials-input");
var scoresDivEl = document.getElementById("scores-div");
var backButtonEl = document.getElementById("back-button");
var clearButtonEl = document.getElementById("clear-button");
var timeInterval;
var mainEl = document.querySelector("main");
//important global variables
var nextMoveIndex = 1;
var timeLeft = 70;
var gameScores = [];

//Array of all questions and answers
var questions = [
  {
    question: "Commonly used data types DO NOT include: ",
    answers: {
      1: "strings",
      2: "booleans",
      3: "alerts",
      4: "numbers",
    },
    correctAnswer: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within: ",
    answers: {
      1: "quotes",
      2: "curly braces",
      3: "parentheses",
      4: "square brackets",
    },
    correctAnswer: "curly braces",
  },
  {
    question: "Arrays in JavaScript can be used to store: ",
    answers: {
      1: "numbers and strings",
      2: "other arrays",
      3: "booleans",
      4: "all of the above",
    },
    correctAnswer: "all of the above",
  },

  {
    question: "String values must be enclosed within: ",
    answers: {
      1: "commas",
      2: "curly braces",
      3: "quotes",
      4: "parentheses",
    },
    correctAnswer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is : ",
    answers: {
      1: "JavaScrip",
      2: "terminal/bash",
      3: "for loops",
      4: "console.log",
    },
    correctAnswer: "console.log",
  },
];

//display the questions and hide game start.
startGame.addEventListener("click", function questionsLayout() {
  document.getElementById("container").style.visibility = "visible";
  startGame.setAttribute("style", "display: none");
  gameInstructions.setAttribute("style", "display: none");
});

startGame.addEventListener("click", function () {
  countdown();
  showQuestions(questions[0]);
});

//TIMER 
function countdown() {
  //running the timer
  timeInterval = setInterval(function () {
    // Display time and decrease by second
    timeEl.textContent = timeLeft;
    timeLeft--;

    // Once the timer hits zero, game is ended
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      timeEl.textContent = "0";
      quizContainer.innerHTML = " ";
      nextMoveIndex = 0;
      quizContainer.setAttribute("display", "none");
      //startGame.setAttribute("style", "display: block;");
      h3El.textContent = "Your final score is:  " + timeLeft;
    }
    // Stop timer when user finished all the questions and end game.
    else if (nextMoveIndex === 6) {
      clearInterval(timeInterval);
      // Reset stats so user can start a new game
    }
  }, 1000);
}
//traverse the dom to target needed question elements to display, match questions and answers and append.
function showQuestions(currentQuestion) {
  var questionEl = document.querySelector(".question-title");
  var answersEl = document.querySelector(".questions-list");
  var possibleAnswer1 = document.querySelector("#possible-answer1");
  var possibleAnswer2 = document.querySelector("#possible-answer2");
  var possibleAnswer3 = document.querySelector("#possible-answer3");
  var possibleAnswer4 = document.querySelector("#possible-answer4");

  questionEl.textContent = currentQuestion.question;
  possibleAnswer1.textContent = currentQuestion.answers[1];
  possibleAnswer2.textContent = currentQuestion.answers[2];
  possibleAnswer3.textContent = currentQuestion.answers[3];
  possibleAnswer4.textContent = currentQuestion.answers[4];

  answersEl.append(possibleAnswer1);
  answersEl.append(possibleAnswer2);
  answersEl.append(possibleAnswer3);
  answersEl.append(possibleAnswer4);
  quizContainer.append(questionEl);
  quizContainer.append(answersEl);
}

//adding the moving from one question to the next until the end of the quiz, including correct and incorrect answer events.
quizContainer.addEventListener("click", function (event) {
  if (nextMoveIndex === 5 && timeLeft > 1) {
    answerContainer.textContent = "FINISHED!";
    clearInterval(timeInterval);
    h3El.textContent = timeLeft;
    questionNumber = 0;
    displayMessage();
    
  } else if (
    event.target.textContent !== questions[nextMoveIndex - 1].correctAnswer
  ) {
    answerContainer.textContent = "Incorrect answer.";
    timeLeft -= 10;
  } else {
    answerContainer.textContent = "Correct answer!";
    console.log(timeLeft);
    nextMoveIndex++;
    showQuestions(questions[nextMoveIndex - 1]);
  }
});
//showing final page: input form and final score.
function displayMessage() {
  quizContainer.style.visibility = "hidden";
  formEl.style.visibility = "visible";
  h3El.style.visibility = "visible";
  h3El.textContent = "Your final score is:  " + timeLeft;
}

//showing final stage with high scores list.
buttonEl.addEventListener("click", function displayFinalPage() {
  allScores.style.visibility = "visible";
  scoresDivEl.style.visibility = "visible";
  formEl.style.visibility = "hidden";

   
  mainEl.appendChild(h2El);
});

//enter initials and score to shore score.
var initials = document.getElementById("initials-input");
buttonEl.addEventListener("click", function (event) {
  event.preventDefault();

  console.log(initials);
  const results = {
    initials: initials.value.trim(),
    score: timeLeft,
  };
  gameScores.push(results);
  console.log(gameScores);

  setTimeout(() => renderGameScores(), 2000);
  event.stopPropagation();
});
//add high scores in list

function renderGameScores() {
  for (let i = 0; i < gameScores.length; i++) {
    storeResults();
    var highScore = document.createElement("li");
    highScore.innerHTML = gameScores[i].initials + " " + gameScores[i].score;
    allScores.style.visibility = "visible";
    allScores.appendChild(highScore);
    console.log(allScores);
  }
}

  

// save scores to localStorage (using web API).
function storeResults() {
  console.log(gameScores);
  localStorage.setItem("games", JSON.stringify(gameScores));
}

//display localStorage on final game page.
function pickUp() {
  var storeResults = JSON.parse(localStorage.getItem("games"));
  if (storeResults !== null) {
    gameScores = storeResults;
    return;
  } 
  
}


//start a new game using the go-back button.
backButtonEl.addEventListener("click", function () {
  location.reload();
});
//clear high scores using the the clear-button.
clearButtonEl.addEventListener("click", function (event) {
  console.log("CLEAR");
  localStorage.removeItem("games");
  allScores.replaceChildren();
});
//calling the function to add the stored high scores to the webpage.
pickUp();
