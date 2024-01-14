
/**
 * Shows and hide the Rules window to the user according to the parameter.
 * @param {boolean} show - Boolean to verify if its to show or close window
 */

function showInstructions(show) {
    var rulesContainer = document.getElementById('instructions');
    instructions.style.display = show ? 'block' : 'none';
}