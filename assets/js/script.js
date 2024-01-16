const startQuizArea = document.querySelector("#start-area");
const questionArea = document.querySelector ("#question-area");


const hideArea = area => area.classList.add("hide");// function to hide
const displayArea = area => area.classList.remove("hide");// function to display area 



//function to activate level buttons
const activateButton = selectedLevelBtn => {
    document.querySelectorAll('.level-btns').forEach(button => button.classList.remove('active'));
    selectedLevelBtn.classList.add('active');
};

// Wait for document to load
document.addEventListener('DOMContentLoaded', function () {

    const start = document.getElementById('start');
     const usernameEntered = document.getElementById('username');

    // add event listener for Start Quiz button when Username and Level Selected 
    start.addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedLevel = document.querySelector('.level-btns.active');

        if (usernameEntered.value && selectedLevel) {
            // Hide start area and display question area functions
            hideArea(startQuizArea);
            displayArea(questionArea);

            //add function to load quiz questions based on the level selected

        } else {
            alert('Please select Username and Level.');
        }
    });

     // Add event listener to level buttons

     document.querySelectorAll('.level-btns').forEach(function (button) {
        button.addEventListener('click', function () {
            activateButton(button);
         });
     });

    
});