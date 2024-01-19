//Elements of the code where adapted from https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript/blob/master/6.%20Create%20a%20Progress%20Bar/game.js

const startQuizArea = document.querySelector("#start-area");
const questionArea = document.querySelector("#question-area");
const gameOverArea = document.querySelector("#game-over");
const nextButton = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressBarFull = document.getElementById("bar-full");

const scoreText = document.getElementById("score");
const timeCount = document.getElementById("seconds");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerButtons = document.querySelectorAll(".btn-a");
const answerButtonsArray = Array.from(document.getElementsByClassName("btn-a"));

const hideArea = (area) => area.classList.add("hide"); // function to hide
const displayArea = (area) => area.classList.remove("hide"); // function to display area

let currentQuestion = {};
let score = 0;
let questionNumber = 0;

let selectedLevel = "";
let questions = []; // Add questions array
let acceptingAnswers = true;
let timeCounter;

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

/**
 * This function increments the correct score.
 *
 */

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

/**
 * Timer for the quiz the quiz
 *
 */

function startTimer(time) {
  let remainingTime = time;

  function updateDisplay() {
    const seconds = remainingTime % 60;
    const formattedTime = seconds.toString().padStart(2, "0");
    timeCount.textContent = formattedTime;
  }

  updateDisplay();

  timeCounter = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime < 0) {
      next();
    }
  }, 1000);
}

// Gave over function that display Final score

function gameOver() {
  displayArea(gameOverArea);
  hideArea(questionArea);
  displayFinalScore();
}

//function to display final score
//Include score message

function displayFinalScore() {
  const usernameEntered = document.getElementById("username").value;
  const score = parseInt(document.getElementById("score").textContent);

  let scoreMessage = "";

  if (score < 5) {
    scoreMessage = `${usernameEntered} can do better! Keep trying.`;
  } else {
    scoreMessage = `Congratulations! ${usernameEntered} done a great job!`;
  }

  document.getElementById("score-message").textContent = scoreMessage;

  document.querySelector(".correct-score").textContent = score;
}

// Function to restart the game

document.getElementById("play-again-btn").addEventListener("click", resetGame);

function resetGame() {
  location.reload();
}

// function to shuffle answers
const shuffle = (answers) => answers.sort(() => Math.random() - 0.5);

// fetch API to Load questions
fetch(
  "https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple"
)
  .then((results) => results.json())
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((apiQuestions) =>
      formatQuestions(apiQuestions)
    );
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

// Function to format questions
const formatQuestions = (apiQuestions) => {
  return {
    difficulty: apiQuestions.difficulty,
    question: apiQuestions.question,
    correctAnswer: apiQuestions.correct_answer,
    answers: shuffle([
      ...apiQuestions.incorrect_answers,
      apiQuestions.correct_answer,
    ]),
  };
};

// function to start the game when Start Quiz clicked

startGame = () => {
  questionNumber = 0;
  score = 0;
  getNewQuestion();
  startTimer(20);
};

/**get new question function to load a new question onto the quiz
 * Enable answer buttons for the new question
 * Display question text
 * Assign each answer to a specific button ***/

const getNewQuestion = () => {
  resetButtonStyles();

  answerButtons.forEach((button) => {
    button.disabled = false;
  });

  if (questionNumber < questions.length) {
    let currentQuestion = questions[questionNumber];

    questionElement.innerText = currentQuestion.question;

    answerButtons.forEach((button, i) => {
      button.innerText = currentQuestion.answers[i];
      button.addEventListener("click", () =>
        checkAnswer(answerButtons[i].innerText)
      );
    });

    progressText.innerText = `Question ${questionNumber + 1}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionNumber / MAX_QUESTIONS) * 100}%`;

    questionNumber++;
  } else {
    gameOver();
  }
};

// Function to check if the selected answer is correct
// Find button corresponding to the selected answer
// Check if the selected answer is correct
// Add 'correct' class for the correct answer to turn green

const checkAnswer = (selectedAnswer) => {
  const currentQuestion = questions[questionNumber - 1];

  const selectedButton = answerButtonsArray.find(
    (button) => button.innerText === selectedAnswer
  );
  if (acceptingAnswers) {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      incrementScore(CORRECT_BONUS);
      console.log("Score after correct answer:", score);

      if (selectedButton) {
        selectedButton.classList.add("correct");
      }
    } else {
      if (selectedButton) {
        selectedButton.classList.add("wrong");
      }
    }
    currentQuestion.answerChecked = true;
    disableAnswerButtons();
    acceptingAnswers = false;
  }
};

//resets answer buttons for the next question

function resetButtonStyles() {
  clearStatusClass(answerButtons);
}

// clears the color and status of the buttons
function clearStatusClass(element) {
  element.forEach((btn) => {
    btn.classList.remove("correct", "wrong");
  });
}

//prevents user from selecting multiple answers

const disableAnswerButtons = () => {
  const answerButtons = document.querySelectorAll(".btn-a");
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
};

//NEXT button functionality which clears timer, displays new question and start timer again

document.querySelector("#next-btn").addEventListener("click", next);

function next() {
  clearInterval(timeCounter);
  getNewQuestion();
  startTimer(20);
  acceptingAnswers = true;
}

//function to activate level buttons
//add selected level to question display area
const activateButton = (selectedLevelBtn) => {
  document
    .querySelectorAll(".level-btns")
    .forEach((button) => button.classList.remove("active"));
  selectedLevelBtn.classList.add("active");

  document.getElementById("selected-level").textContent = selectedLevelBtn.textContent;

};

// Wait for document to load
document.addEventListener("DOMContentLoaded", function () {
  const start = document.getElementById("start");
  const usernameEntered = document.getElementById("username");

  // add event listener for Start Quiz button when Username and Level Selected
  start.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedLevel = document.querySelector(".level-btns.active");

    if (usernameEntered.value && selectedLevel) {
      // Hide start area and display question area functions
      hideArea(startQuizArea);
      displayArea(questionArea);

      //add function to load quiz questions based on the level selected
    } else {
      alert("Please select Username and Level.");
    }
  });

  // Add event listener to level buttons

  document.querySelectorAll(".level-btns").forEach(function (button) {
    button.addEventListener("click", function () {
      activateButton(button);
    });
  });
});

/**
 * Shows and hide the Rules window to the user according to the parameter.
 * @param {boolean} show - Boolean to verify if its to show or close window
 */

function showInstructions(show) {
  let instructionsContainer = document.getElementById("instructions");
  instructionsContainer.style.display = show ? "block" : "none";
}

function showForm(show) {
  let feedbackContainer = document.getElementById("feedback");
  feedbackContainer.style.display = show ? "block" : "none";
}
