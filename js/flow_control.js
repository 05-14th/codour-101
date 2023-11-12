//Startup
function setRandomValueWithExpiration() {
    // Generate a random value
    const randomValue = Math.random().toString(36).substr(2, 8);
  
    // Set the random value in localStorage
    localStorage.setItem('randomValue', randomValue);
  
    // Set an expiration timestamp 12 hours from now
    const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;
    localStorage.setItem('expirationTime', expirationTime);
  }
  
  function getRandomValue() {
    const expirationTime = localStorage.getItem('expirationTime');
    if (!expirationTime || new Date().getTime() > expirationTime) {
      // The data has expired or doesn't exist; remove it
      localStorage.removeItem('randomValue');
      localStorage.removeItem('expirationTime');
      return null;
    }
  
    // Data is still valid, return the random value
    return localStorage.getItem('randomValue');
  }
  
  // Set a random value with a 12-hour expiration
  setRandomValueWithExpiration();
  
  // Get the random value
  const randomValue = getRandomValue();
  console.log(randomValue);
  
  

//Control Variables
const sbNav = document.getElementById("sb");
const sbButton = document.getElementById("sbBar");
const cNav = document.getElementById("closeNav");
const showExerciseButtons = document.querySelectorAll(".exerciseButton");
const showExerciseOptions = document.querySelectorAll(".optionButton");
const elementsToHide = document.querySelectorAll(".toggleSection");
const ansField = document.querySelectorAll(".ansInput");
var score = 0;

function showNav(){
    sbNav.style.display = "block";
}

function hideNav(){
    sbNav.style.display = "none";
}

function showExercise(event){
    const button = event.target;
    const elementId = button.getAttribute("data-element");
    const targetElement = document.getElementById(elementId);

    if(targetElement){
        if(targetElement.style.display === "none" || targetElement.style.display === ""){
            targetElement.style.display = "block";
        } else {
            targetElement.style.display = "none";
        }
    }
}

function hideAllSection(){
    elementsToHide.forEach(element => {
        element.style.display = "none";
    });
}

function showSelectedOption(event){
    const _button = event.target;
    const _elementId = _button.getAttribute("data-element");
    const _targetElement = document.getElementById(_elementId);
    hideAllSection();
    if(_targetElement){
        if(_targetElement.style.display === "none" || _targetElement.style.display === ""){
            _targetElement.style.display = "block";
        } else {
            _targetElement.style.display = "none";
        }
    }
}

//Check Answers
function getInputValuesByDataGroup(dataGroup) {
    const elements = document.querySelectorAll(`[data-group="${dataGroup}"]`);
    const values = [];
  
    elements.forEach(element => {
      if (element.tagName === 'INPUT' && element.type === 'text') {
        values.push(element.value);
      }
    });
  
    return values;
}

function getDataAnswersByGroup(dataGroup) {
    const elements = document.querySelectorAll(`[data-group="${dataGroup}"]`);
    const dataAnswers = [];
  
    elements.forEach(element => {
      const dataAnswer = element.getAttribute('data-answer');
      dataAnswers.push(dataAnswer);
    });
  
    return dataAnswers;
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
}

function correctAns(dataGroup) {
    const elements = document.querySelectorAll(`[data-group="${dataGroup}"]`);
  
    elements.forEach(element => {
      element.classList.add('correct');
    });
}

function wrongAns(dataGroup) {
    const elements = document.querySelectorAll(`[data-group="${dataGroup}"]`);
  
    elements.forEach(element => {
      element.classList.add('wrong');
    });
}

function showHidden(id){
    hiddenAns = document.getElementById("answer" + id);
    hiddenAns.style.display = "block";
}


function checkAns(id_){
    const tapButton = document.getElementById(id_);
    const scoreboard = document.getElementById("scoreboard");
    const id = id_;
    const DataAnswers = getDataAnswersByGroup(id);
    const playerAnswer = getInputValuesByDataGroup(id);
    if(arraysAreEqual(DataAnswers, playerAnswer)){
        score += 1;
        scoreboard.innerText = score;
        correctAns(id);
    }else{
        wrongAns(id);
    }
    showHidden(id);
    tapButton.disabled = true;
}





sbButton.addEventListener("click", showNav);
cNav.addEventListener("click", hideNav);
showExerciseButtons.forEach(button => {
    button.addEventListener("click", showExercise);
});
showExerciseOptions.forEach(button => {
    button.addEventListener("click", showSelectedOption);
});
ansField.forEach(input => {
    var absLength = parseInt(input.getAttribute('data-element'));
    var maxLength = parseInt(input.getAttribute('maxlength'));
    input.style.width = maxLength * absLength + 'px';
});
