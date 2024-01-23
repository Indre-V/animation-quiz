
const startQuizAreaRef = document.querySelector("#start-area");
const questionAreaRef = document.querySelector("#question-area");
const gameOverAreaRef = document.querySelector("#game-over");

const progressTextRef = document.querySelector("#progress-text");

const scoreRef = document.querySelectorAll(".score");
const scoreMessageRef = document.querySelector("#score-message");


const usernameRef = document.querySelector("#username");
const secondsRef = document.querySelector("#seconds");


const questionElementRef = document.querySelector("#question");
const answerButtonsRef = document.querySelectorAll(".btn-a");
const answerButtonsArray = Array.from(document.getElementsByClassName("btn-a"));
 
const showInstructionsRef = document.querySelector("#show-instructions");
const showContactFormRef = document.querySelector("#show-contactForm");
const closeInstructionsBtnRef = document.querySelector("#close-instructions");
const closeContactFormBtnRef = document.querySelector("#close-contactForm");

const hideArea = (area) => area.classList.add("hide"); 
const displayArea = (area) => area.classList.remove("hide"); 


let score = 0;
let questionNumber = 0;


let questions = [];
let acceptingAnswers = true;
let timeCounter;

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;



/**
 * This function increments the correct score and updated the score display
 * @param {number} num - Increments the score by set number.
 */

const incrementScore = (num) => {
    score += num;
    scoreRef.innerHTML = score;
};

/**
 * Sets timer for the quiz 
 * Counts down from specified time
 * When time runs out Next() function is called
 * @param {number} time - The time is set in seconds
 */
const updateDisplay = (remainingTime) => {
        const formattedTime = (remainingTime % 60).toString().padStart(2, "0");
        secondsRef.textContent = formattedTime;
};

const startTimer = (time) => {
    let remainingTime = time;

    updateDisplay(remainingTime);

    timeCounter = setInterval(() => {
        remainingTime--;
        updateDisplay(remainingTime);

        if (remainingTime < 0) {
            next();
        }
    }, 1000);
};


 //Finish game 

const gameOver = () => {
    displayArea(gameOverAreaRef);
    hideArea(questionAreaRef);
    displayFinalScore();
};


 /*
* Display final score
 * Score message based on the score
 * Retrieves username entered 
*/

const displayFinalScore = () => {
    const usernameEntered = usernameRef.value;
    const score = parseInt(scoreRef.textContent);

    let scoreMessage = "";

    if (score < 5) {
        scoreMessage = `${usernameEntered} can do better! Keep trying.`;
    } else {
        scoreMessage = `Congratulations! ${usernameEntered} done a great job!`;
    }

    scoreMessageRef.textContent = scoreMessage;

    // document.querySelector(".correct-score").textContent = score;
};


/*
*Reset the game
*Activate reload page
*/

const resetGame = () => {
    location.reload();
}

document.querySelector("#play-again-btn").addEventListener("click", resetGame);

const shuffle = (answers) => answers.sort(() => Math.random() - 0.5);

/**
 * Fetches trivia questions from the Open Trivia Database API based on the specified difficulty.
 * @param {string} difficulty - adjustable setting chosen.
 * @returns {Promise<Array>} - returns a promise of formatted questions.
 * @throws {Error} throws an error if does not fetch.
 */

const fetchQuestions = async (difficulty) => {

    //show loader

    const apiLink = "https://opentdb.com/api.php?amount=10&category=32&type=multiple&difficulty=" + difficulty;

    return fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch API questions.`);
            }
            return response.json();
        })
        .then(apiData => apiData.results.map(apiQuestion => formatQuestions(apiQuestion)))
        .catch(error => {
            //hide spinner
            handleFetchError(error);
            throw error;
        });
};

/*
* @param {object} apiQuestions - The  data from the API.
* @returns {object} A formatted question object with properties obtained from API
*/

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

/**
 *
 * Function to start the game when Start Quiz clicked
 * Sets score and question number variables to 0 and starts the timer.
 * @param {string} difficulty -  Fetches quiz questions based on the selected difficulty level,
 * @returns {Promise<void>} A promise that resolves when the game is successfully started.
 * @param {Error} error - hadles error if fails to start
 */

const startGame = async (difficulty) => {
    try {
        questions = await fetchQuestions(difficulty);
        console.log("load", difficulty);
        questionNumber = 0;
        score = 0;
        getNewQuestion();
        startTimer(20);
        
    } catch (error) {
        handleFetchError(error);
    }
}

/* Loads and display new question onto the quiz.
 * Resents button styles, enables answer buttons for the new question.
 * Display question text, answer choices, progress bar.
 * Assign each answer to a specific button.
 * If no questions left, call gameOver function
 */

const getNewQuestion = () => {
    resetButtonStyles();
    acceptingAnswers = true;

    console.log("displayQuestions", questions);

    answerButtonsRef.forEach((btn) => {
        btn.disabled = false;
    });

    if (questionNumber < questions.length) {
        let currentQuestion = questions[questionNumber];

        questionElementRef.innerHTML = currentQuestion.question;

        answerButtonsRef.forEach((button, i) => {
            button.innerHTML = currentQuestion.answers[i];
            button.addEventListener("click", () =>
                checkAnswer(answerButtonsRef[i].innerHTML)
            );
        });

         progressTextRef.innerHTML = `Question ${questionNumber + 1}/${MAX_QUESTIONS}`;

        questionNumber++;
    } else {
        gameOver();
    }
};

/**
 *Function to check if the selected answer is correct
*Find button corresponding to the selected answer
*Call function to prevent users from selecting multiple answers
*Check if the selected answer is correct
*Add 'correct' class for the correct answer to turn green
*/
    const checkAnswer = (selectedAnswer) => {

        const currentQuestion = questions[questionNumber - 1];
        const selectedButton = answerButtonsArray.find(
            (button) => button.innerHTML === selectedAnswer
        );
    
        const classToApply = selectedAnswer === currentQuestion.correctAnswer ? "correct" : "wrong";
    
        selectedButton.classList.add(classToApply);
    
       if (acceptingAnswers && selectedButton) {
                if (selectedAnswer === currentQuestion.correctAnswer) {
                    incrementScore(CORRECT_BONUS);
                } else {
                    const correctButton = answerButtonsArray.find(
                        (button) => button.innerHTML === currentQuestion.correctAnswer
                    );
                    correctButton.classList.add("correct");
                }
        
            disableAnswerButtons();
    
            setTimeout(() => {
                selectedButton.classList.remove(classToApply);
                clearStatusClass(answerButtonsArray);
                clearInterval(timeCounter);
                getNewQuestion();
                startTimer(20);
            }, 1000);
        }
    
        currentQuestion.answerChecked = true;
        acceptingAnswers = false;
    };

       

//resets answer buttons for the next question

const resetButtonStyles = () => {
    clearStatusClass(answerButtonsRef);
};

/**
 * clears the color and status of the buttons
 * @param {HTMLElement[]} elements - An array of HTML elements of buttons.
 */
const clearStatusClass = (element) => {
    element.forEach((btn) => {
        btn.classList.remove("correct", "wrong");
        btn.classList.remove("disabled");
       
    });
};

//prevents user from selecting multiple answers

const disableAnswerButtons = () => {
    
    answerButtonsRef.forEach((btn) => {
        btn.classList.add("disabled");
        btn.disabled = true;
    });
};

//NEXT button functionality which clears timer, displays new question and start timer again


const next = () => {
    clearInterval(timeCounter);
    getNewQuestion();
    startTimer(20);
    acceptingAnswers = true;
};

/*function to activate level buttons
* add selected level to question display area
*/
const activateButton = (selectedLevelBtn) => {
    document
        .querySelectorAll(".level-btns")
        .forEach((button) => button.classList.remove("active"));
    selectedLevelBtn.classList.add("active");

    document.querySelector("#selected-level").textContent = selectedLevelBtn.textContent;

};

/* Wait for document to fully load and execute content
* @param {Event} event - The form submission event.
*Username and Level selection process
*Hide start area and display question area
*alert when is either level or username missing
*/

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#start").addEventListener("submit", async function(event) {
        event.preventDefault();

        const selectedLevel = document.querySelector(".level-btns.active");
        const usernameEntered = document.querySelector("#username");

        (usernameEntered.value && selectedLevel)
        ? (
            hideArea(startQuizAreaRef),
            displayArea(questionAreaRef),
            await startGame(selectedLevel.dataset.level)
          )
        : alert("Please select Username and Level.");
    });
    document.querySelectorAll(".level-btns").forEach(function(button) {
        button.addEventListener("click", function() {
            activateButton(button);
        });
    });
});

/**
 * API fetch error handling
 * page reloads if error occurs
 * @param {error} error
 */
const handleFetchError = (error) => {
    alert("Error fetching data. Please try again later.");
    setTimeout(() => {
        location.reload();
    }, 1000);

};

/** 
 * Shows and hide the Rules window to the user according to the parameter.
 * @param {boolean} show - Boolean to verify if its to show or close window
 */

const showSupport = (show, id) => {
    let supportElement = document.querySelector(`#${id}`);
    supportElement.style.display = show ? "block" : "none";
};

showInstructionsRef.addEventListener("click", (event) => {
    event.preventDefault();
    showSupport(true, "instructions");
})

showContactFormRef.addEventListener("click", (event) => {
    event.preventDefault();
    showSupport(true, "feedback");
})

closeInstructionsBtnRef.addEventListener("click", (event) => {
    event.preventDefault();
    showSupport(false, "instructions");

})

closeContactFormBtnRef.addEventListener("click", (event) => {
    event.preventDefault();
    showSupport(false, "feedback");
})