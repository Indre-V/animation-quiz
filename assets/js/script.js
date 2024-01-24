
const startQuizAreaRef = document.querySelector("#start-area");
const questionAreaRef = document.querySelector("#question-area");
const gameOverAreaRef = document.querySelector("#game-over");

const startButtonRef = document.querySelector("#start");


const levelBtnsRef = document.querySelectorAll(".level-btns");
const selectedLevelRef= document.querySelector("#selected-level");

const progressTextRef = document.querySelector("#progress-text");

const scoreRef = document.querySelector("#score");
const correctScoreRef = document.querySelector('#correct-score');
const scoreMessageRef = document.querySelector("#score-message");

const playAgainRef= document.querySelector("#play-again-btn");


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
let questionNumber = 10;


let quizQuestions = [];
let acceptingAnswers = true;
let timeCounter;

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;



/** 
 * Increments the correct score
 * @param {number} num - Increments the score by set number.
 */

const incrementScore = (num) => {
    score += num;
    scoreRef.innerHTML = score;
};

/**
 * Sets timer for the quiz 
 * Counts down from specified time
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
*Display final score
*Score message based on the score
*Retrieves username entered 
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

    correctScoreRef.textContent = score;
};


/*
*Reset the game
*Activate reload page
*/

const resetGame = () => {
    location.reload();
}

playAgainRef.addEventListener("click", resetGame);

const shuffle = (answers) => answers.sort(() => Math.random() - 0.5);

/**
 * Fetches trivia questions from the Open Trivia Database API based on the specified difficulty.
 * @param {string} difficulty - adjustable setting chosen.
 * @returns {Promise<Array>} - returns a promise of formatted questions.
 * @throws {Error} throws an error if does not fetch.
 */

const fetchQuestions = async (difficulty) => {
// show loader
const apiLink = `https://opentdb.com/api.php?amount=10&category=32&type=multiple&difficulty=${difficulty}`;

     return fetch(apiLink)
    .then(response => {
        if (!response.ok) {
             throw new Error(`Failed to fetch API questions.`);
            }
            return response.json();
        })
    .then (apiData => formatQuestions(apiData.results))
    .catch(error => {
            //hide spinner
            handleFetchError(error);
            throw error;
        });
};


/** 
* @param {object} apiQuestions - The  data from the API.
* @returns {object} A formatted question object with properties obtained from API
*/

const formatQuestions = (apiQuestions) => {
    return apiQuestions.map(apiQuestion => ({
        difficulty: apiQuestion.difficulty,
        question: apiQuestion.question,
        correctAnswer: apiQuestion.correct_answer,
        answers: shuffle([
            ...apiQuestion.incorrect_answers,
            apiQuestion.correct_answer,
        ]),
    }));
};

/**
 * Start the game when Start Quiz clicked
 * @param {string} difficulty -  Fetches quiz questions based on the selected difficulty level,
 * @returns {Promise<void>} A promise that resolves when the game is successfully started.
 * @param {Error} error - hadles error if fails to start
 */

const startGame = async (difficulty) => {
    try {
        quizQuestions = await fetchQuestions(difficulty);
        console.log("load", difficulty);
        questionNumber = 0;
        score = 0;
        getNewQuestion();
        startTimer(20);
        
    } catch (error) {
        handleFetchError(error);
    }
}

/*
* Loads and displays new question onto the quiz.
* Display question text, answer choices
* Assign each answer to a specific button.
*/

const getNewQuestion = () => {
    clearStatusClass(answerButtonsRef);
    acceptingAnswers = true;

    console.log("displayQuestions", quizQuestions);

    answerButtonsRef.forEach((btn) => {
        btn.disabled = false;
    });

 
    if (questionNumber <=10) {
        let currentQuestion = quizQuestions[questionNumber];

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
*Checks if the selected answer is correct
*Find button corresponding to the selected answer
*Check if the selected answer is correct
*Add a class to display correct answer
*/
    const checkAnswer = (selectedAnswer) => {

        const currentQuestion = quizQuestions[questionNumber - 1];
        const selectedButton = answerButtonsArray.find(
            (button) => button.innerHTML === selectedAnswer
        );
    
        const classToApply = selectedAnswer === currentQuestion.correctAnswer ? "correct" : "wrong";
    
        selectedButton.classList.add(classToApply);
    
       if (acceptingAnswers && selectedButton) {
                if (selectedAnswer === currentQuestion.correctAnswer) {
                    console.log("add score", scoreRef)
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
                clearStatusClass(answerButtonsRef);
                clearInterval(timeCounter);
                getNewQuestion();
                startTimer(20);
            }, 1000);
        }
    
        currentQuestion.answerChecked = true;
        acceptingAnswers = false;
    };

       

/**
 * Clears the color and status of the buttons
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

//Moves to next question if timed out


const next = () => {
    clearInterval(timeCounter);
    getNewQuestion();
    startTimer(20);
    acceptingAnswers = true;
};

/*
*Activate level buttons
*Adds selected level to question display area
*/
const activateButton = (selectedLevelBtn) => {
        levelBtnsRef
        .forEach((button) => button.classList.remove("active"));
    selectedLevelBtn.classList.add("active");

    selectedLevelRef.textContent = selectedLevelBtn.textContent;

};

/** 
*Wait for document to fully load and execute content
*@param {Event} event - The form submission event.
*Username and Level selection process
*Hide start area and display question area
*Alert when is either level or username missing
*/

document.addEventListener("DOMContentLoaded", function() {
    startButtonRef.addEventListener("submit", async function(event) {
        event.preventDefault();

        const selectedLevel = document.querySelector(".level-btns.active");
        const usernameEntered = usernameRef;

        (usernameEntered.value && selectedLevel)
        ? (
            hideArea(startQuizAreaRef),
            displayArea(questionAreaRef),
            await startGame(selectedLevel.dataset.level)
          )
        : alert("Please select Username and Level.");
    });
    levelBtnsRef.forEach(function(button) {
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