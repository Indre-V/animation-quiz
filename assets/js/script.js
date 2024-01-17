const startQuizArea = document.querySelector("#start-area");
const questionArea = document.querySelector("#question-area");
const nextButton = document.getElementById('next-btn')
const progressText = document.getElementById("progress-text");
const progressBarFull = document.getElementById("bar-full");

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('btn-a'));

const timeCount = document.getElementById('seconds');

const hideArea = (area) => area.classList.add("hide"); // function to hide
const displayArea = (area) => area.classList.remove("hide"); // function to display area

let currentQuestion = {};
let userScore = 0;
let questionNumber = 0;

let selectedLevel = '';
let questions = []; // Add questions array

let timeCounter;


/**
 * Timer on the quiz
 */

function startTimer(time) {
  let remainingTime = time;

  function updateDisplay() {
    const seconds = remainingTime % 60;
    const formattedTime = seconds.toString().padStart(2, '0');
    timeCount.textContent = formattedTime;
  }

  updateDisplay();

  timeCounter = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime < 0) {
      clearInterval(timeCounter);
      getNewQuestion();
      startTimer(20);
    }
  }, 1000);
}

// function to shuffle answers
const shuffle = (answers) => answers.sort(() => Math.random() - 0.5)

// fetch API to Load questions
fetch('https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple')
  .then(results => results.json())
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(apiQuestions => formatQuestions(apiQuestions));
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

// Function to format questions
const formatQuestions = (apiQuestions) => {
  return {
    difficulty: apiQuestions.difficulty,
    question: apiQuestions.question,
    correctAnswer: apiQuestions.correct_answer,
    answers: shuffle([...apiQuestions.incorrect_answers, apiQuestions.correct_answer])
  };
};

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionNumber = 0;
  userScore = 0;
  getNewQuestion();
  startTimer(20);
  
  
};

const getNewQuestion = () => {
 

  if (questionNumber < questions.length) {
    let currentQuestion = questions[questionNumber];

    // Display question text
    document.getElementById('question').innerText = currentQuestion.question;

    // Display answer options
    const answerButtons = document.querySelectorAll('.btn-a');

    for (let i = 0; i < answerButtons.length; i++) {
      // Assign each answer to a specific button
      answerButtons[i].innerText = currentQuestion.answers[i];
    }


    // code adapted from https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript/blob/master/6.%20Create%20a%20Progress%20Bar/game.js

    progressText.innerText = `Question ${questionNumber + 1}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionNumber / MAX_QUESTIONS) * 100}%`;

  
    questionNumber++;

    
  } else {
    gameOver();
  }
};

nextButton.addEventListener('click', () => {
  clearInterval(timeCounter);
  getNewQuestion(); 
  startTimer(20);
})

//function to activate level buttons
const activateButton = (selectedLevelBtn) => {
  document
    .querySelectorAll(".level-btns")
    .forEach((button) => button.classList.remove("active"));
  selectedLevelBtn.classList.add("active");
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
