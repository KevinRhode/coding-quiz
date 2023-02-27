//starting page content
let startingPage = {
  title:"Coding Quiz Challenge",
  statement:"Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
}
//Question Content
let question1 = {
  question:"Arrays in JavaScript can be used to store _________.",
  answers:["numbers and strings","other arrays","booleans","all of the above"],
  answer:"all of the above"
}
//Question Content
let question2 = {
  question:"The condition in an if / else statement is enclosed with _________.",
  answers:["quotes","curly brackets","parenthesis","square brackets"],
  answer:"parenthesis"
}
//Question Content
let question3={
  question:"Commonly used data types DO Not include:",
  answers:["strings","booleans","alerts","numbers"],
  answer:"alerts"
}
//Question Content
let question4={
  question:"String values must be enclosed within __________ when being assigned to variables.",
  answers:["commas","curly brackets","quotes","parenthesis"],
  answer:"quotes"
}
//Question Content
let question5={
  question:"A very useful tool used during development and debugging for printing content to the debugger is:",
  answers:["JavaScript","terminal/bash","for loops","console.log"],
  answer:"console.log"
}
//list of questions to be sent to sesstionStorage for quiz
let questionsList = [question1,question2,question3,question4,question5]
//calculate question score
let qScorePer = 100/questionsList.length;

//set sessionStorage for questions
window.sessionStorage.setItem("myListOfQuestions",JSON.stringify(questionsList));
//for test score (assumes you get all wrong)
window.sessionStorage.setItem("testScore",JSON.stringify(0))
//window.localStorage.setItem("myObject", JSON.stringify(myObject));
questionCounter = 0;

//global for ID of Time Interval
let timerID;


// timerCount =0;
let timeLeft = 75;
//credits
//https://stackoverflow.com/questions/507138/how-to-add-a-class-to-a-given-element

function game(previousAnswer){
  
  let Questions = JSON.parse(window.sessionStorage.getItem("myListOfQuestions"));  

  // if (Questions.length > questionCounter) {
  if (Questions.length == 0) {
    //call game over
    clearInterval(timerID);
    loadEndGame(previousAnswer);
    
  } else {
    let q = Math.floor(Math.random() * Questions.length);

    //send the question to the page
    sendQ(Questions[q],previousAnswer);
  
    //show the question that was removed (and remove it by splice, questions array was modified)
    let qArray = Questions.splice(q,1);
  
    //write the new array back to local storage
    window.sessionStorage.setItem("myListOfQuestions",JSON.stringify(Questions));
  }


}
//start countDown
function countdown() {
    //var timeLeft = 75;
    let timertochange= document.querySelector(".timer-mod");
    //Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      //
      // YOUR CODE HERE
      if (timeLeft === 0) {
        timertochange.textContent = "Time: "
        clearInterval(timeInterval);
        loadEndGame();
      } else {
        timertochange.textContent = "Time: "+timeLeft + " seconds remaining";
        timeLeft--;
      }
     
      //
    },1000);

    //set ID for clearInterval when a user runs out of questions instead of running out of time
    timerID = timeInterval;
}
// function saveID(TI){
//   sessionStorage.setItem("timerId",JSON.stringify(TI));
// }
function testAnswer(){
  //get current answer
  let answer = sessionStorage.getItem("currentAnswer");
  let testScore = window.sessionStorage.getItem("testScore");
  // localStorage.setItem("questionAnswered",true);

  //I think i can get rid of
  questionCounter++;
  let previousAnswer;
  if (answer === this.textContent) {
    //you got the answer correct 
    //add points
    testScore = Number(testScore) + Number(qScorePer);
    //update test score
    sessionStorage.setItem("testScore",testScore);
    //set previous answer to show user
    previousAnswer=true;

  } else {
    //you got it wrong
    //-50dkp
    previousAnswer=false;
    if (timeLeft > 10) {
      //penalty for wrong answer
      timeLeft = timeLeft-10;
    }
    else{
      // if less then 10 secs lets sent to zero to handle game end
      timeLeft = 0;
    }

  }

  //next question
  game(previousAnswer);

}
function loadStartPage(){
  let headerElement = document.querySelector("header");
  let aElement = document.createElement("a");
  //link for page
  aElement.href="./highscores.html";
  aElement.textContent = "View High Scores";
  let labelElement = document.createElement("label");
  labelElement.classList.add("timer-mod");
  labelElement.textContent = "Time: 0";//"Time: " + timerCount;

  //add to document
  headerElement.appendChild(aElement);
  headerElement.appendChild(labelElement);
  
  //create a card
  let card = document.createElement("div");
  card.classList.add("quiz-question-card");
  card.style.alignItems = "center";
  //create header of card
  let cardHeader = document.createElement("h2");
  cardHeader.textContent = startingPage.title;
  
  // cardHeader.textContent = "Quiz Question of Obj";
  
  card.appendChild(cardHeader);
  
  //create content of card
  let cardContent = document.createElement("p");
  cardContent.textContent = startingPage.statement;
  // cardContent.style.textAlign="center";
  card.appendChild(cardContent);

  let cardFooter = document.createElement("button");
  cardFooter.textContent ="Start Quiz";
  cardFooter.classList.add("start-quiz");
  cardFooter.addEventListener('click',countdown,false);
  //to get the timing right, for when a user clicks start quiz. for the timer to not show 0, and then change.
  cardFooter.addEventListener('click',createDelay,false);
  
  card.appendChild(cardFooter);
  
  let container = document.querySelector(".quiz-question-container")
  container.appendChild(card);

}
function validate(evt){
  if (document.querySelector("#initialsText").value === "") {//no unput on the text box
    //https://stackoverflow.com/questions/23556533/how-do-i-make-an-input-field-accept-only-letters-in-javascript
    document.querySelector("#initialsText").placeholder = "Please Enter Initials...";
    evt.preventDefault();
    
  } else if (!/^[a-zA-Z\s*]*$/g.test(document.querySelector("#initialsText").value)) { //check to see if letters, upper and lower or whitespace (added /s* for many spaces)
    // clear input
    document.querySelector("#initialsText").value = "";
    //tell user what went wrong throuhg the placeholder of the input
    document.querySelector("#initialsText").placeholder = "Only Letters...";
    evt.preventDefault();
  } else if (document.querySelector("#initialsText").value.length < 2) {//need minimun 2 initials
     // clear input
    document.querySelector("#initialsText").value = "";
    //tell user what went wrong throuhg the placeholder of the input
    document.querySelector("#initialsText").placeholder = "Min 2 characters...";
    evt.preventDefault();
  }
  else {
    //input validated, call add score
    addScore();
  }
 
}
function loadEndGame(previousAnswer){
  document.querySelector(".quiz-question-container").innerHTML="";
  //create a card
  let card = document.createElement("div");
  card.classList.add("quiz-question-card");

  //create header of card
  let cardHeader = document.createElement("h2");
  cardHeader.textContent = "All done!";
  // cardHeader.textContent = "Quiz Question of Obj";
  card.appendChild(cardHeader);

  let cardContent = document.createElement("p");
  cardContent.textContent = "Your final score is: "+sessionStorage.getItem("testScore");
  card.appendChild(cardContent);
  let cardfooterinput = document.createElement("input");
  cardfooterinput.type = "text";
  cardfooterinput.id="initialsText"
  cardfooterinput.placeholder = "Enter Initials...";
  cardfooterinput.style.marginRight="1rem";
  cardfooterinput.style.fontSize="2rem"
  let cardFooter = document.createElement("button");
  cardFooter.textContent = "Submit";
  
  //cardFooter.addEventListener('click',addScore,false);
  // cardFooter.addEventListener('click',goHighScores,false);
  cardFooter.addEventListener('mouseover',removeFooter,false);
  cardFooter.addEventListener('click',validate)
  let cardfooterstyle = document.createElement("div")
  cardfooterstyle.classList.add("enter-initials");
  
  cardfooterstyle.id="initials";
  cardfooterstyle.name="initals";

  cardfooterstyle.appendChild(cardfooterinput);
  
  cardfooterstyle.appendChild(cardFooter);
  card.appendChild(cardfooterstyle)



  
//create Footer for result of answer
let cardFootersfooter = document.createElement("div");
cardFootersfooter.classList.add("answer-result");
//handle first question when there is no answer posible
if (previousAnswer === undefined) {
  cardFootersfooter.textContent = "";
} else{
  cardFootersfooter.textContent = previousAnswer === true ? "Correct!":"Wrong!";
}


// card.appendChild(cardFooter);
card.appendChild(cardFootersfooter);

let container = document.querySelector(".quiz-question-container");
  container.appendChild(card);
}
function removeFooter(){
  // document.querySelector(".answer-result").style.color = "red";
  this.style.marginBottom = 0;
  let foot = document.querySelector(".answer-result");
  // foot.innerHTML = "";
  if (foot != null) {
    foot.outerHTML = "";
  }
  
}
function addScore(){
  let initialsOfPerson = document.querySelector("#initialsText");

  let person = {
    name:initialsOfPerson.value,
    score: sessionStorage.getItem("testScore")
  }
  try {
    //try to add user to score with previous scores
    let leaderBoard = JSON.parse(window.localStorage.getItem("leaderBoard"));
    leaderBoard.push(person);
    window.localStorage.setItem("leaderBoard",JSON.stringify(leaderBoard));
  } catch (error) {
    //first time finishing the test or if there are no scores saved
    let leaderBoard = [person];
    window.localStorage.setItem("leaderBoard",JSON.stringify(leaderBoard));
  } 

  //go to high score page
  goHighScores();
  
}
function sendQ(questionGiven,previousAnswer){
  document.querySelector(".quiz-question-container").innerHTML="";
  //create a card
  let card = document.createElement("div");
  card.classList.add("quiz-question-card");
  
  //create header of card
  let cardHeader = document.createElement("h3");
  cardHeader.textContent = questionGiven.question;
  // cardHeader.textContent = "Quiz Question of Obj";
  card.appendChild(cardHeader);
  
  //create content of card
  let cardContent = document.createElement("ol");
  //give the localstorage the answer of the question
  sessionStorage.setItem("currentAnswer",questionGiven.answer);
  
  for (let index = 0; index < questionGiven.answers.length; index++) {
      
      let cardContentItem = document.createElement("li");
      let buttonHit = document.createElement("button");
      // buttonHit.type="button";
      buttonHit.innerText=questionGiven.answers[index];
      buttonHit.addEventListener('click',testAnswer,false)
      cardContentItem.appendChild(buttonHit);
      
      cardContent.appendChild(cardContentItem);
      
  }
  
  card.appendChild(cardContent);

  //create Footer for result of answer
  let cardFooter = document.createElement("div");
  cardFooter.classList.add("answer-result");
  
  if (previousAnswer === undefined) {
    cardFooter.textContent = "";
  } else{
    cardFooter.textContent = previousAnswer === true ? "Correct!":"Wrong!";
  }


  card.appendChild(cardFooter);
    
  let container = document.querySelector(".quiz-question-container")
  container.appendChild(card);


}
function loadQuestion(){
  document.querySelector(".quiz-question-container").innerHTML="";
  
  //create a card
  let card = document.createElement("div");
  card.classList.add("quiz-question-card");
  
  //create header of card
  let cardHeader = document.createElement("h2");
  cardHeader.textContent = questionObj.question;
  // cardHeader.textContent = "Quiz Question of Obj";
  
  card.appendChild(cardHeader);
  
  //create content of card
  
  let cardContent = document.createElement("ol");
  //give the localstorage the answer of the question
  sessionStorage.setItem("currentAnswer",questionObj.answer);
  
  for (let index = 0; index < questionObj.answers.length; index++) {
      
      let cardContentItem = document.createElement("li");
      let buttonHit = document.createElement("button");
      // buttonHit.type="button";
      buttonHit.innerText=questionObj.answers[index];
      cardContentItem.appendChild(buttonHit);
      cardContentItem.addEventListener('click',testAnswer,false)
      cardContent.appendChild(cardContentItem);
      
  }
  
  card.appendChild(cardContent);
  
  let container = document.querySelector(".quiz-question-container")
  container.appendChild(card);
}
function createDelay(){
  setTimeout(game,1000);
}
function goHome(){
  window.location.href="./index.html";


  // window.location.href="../index.html";
}
function goHighScores(evt){


  window.location.href="./highscores.html"


  // if (evt === undefined) {
  //   window.location.href="./assets/highscores.html";
  // } else {
  //   window.location.href="./highscores.html";
  // }
  
  
  
}
//to sort object list by score property
function compareScore(a,b){
  let value1 = a.score;
  let value2 = b.score;
  return value2-value1;
    
}
// function clearKeys(){
//   //used to testing
//   window.localStorage.clear();
// }
function clearLeaderBoard(){
  //set leaderBoard to ""
  window.localStorage.setItem("leaderBoard", "");
  goHighScores();

}
function loadHighScores(){
  let high;
  let SeeIf = window.localStorage.getItem("leaderBoard");
  let objPlaceHolder = {
    name: "No one has played",
    score: 0
  }
  let placeholderOfLeaderBoard = [objPlaceHolder]
  // let iffiif = window.localStorage.getItem("noKey");
  if (SeeIf === "") {
    //someone cleared the scores
    high = placeholderOfLeaderBoard;
  } else if (SeeIf === null){
    //no one has played the game and went to highscores
    high = placeholderOfLeaderBoard;
  }else{
    high = JSON.parse(window.localStorage.getItem("leaderBoard"));
    high.sort(compareScore);
  }
  
  
  let docOl = document.querySelector(".high-scores");
  if (high !== undefined) {
    for (let index = 0; index < high.length; index++) {
      let liToAdd = document.createElement("li");
      //liToAdd.style.margin= "2px 0";
      liToAdd.textContent = (index+1)+". "+ high[index].name + " - " + Number(high[index].score).toFixed(0) ;
      docOl.appendChild(liToAdd);
      
    }
  }
 

  //add buttons
  let goback = document.createElement("button");
  goback.textContent = "Go Back";
  goback.addEventListener('click',goHome,false);
  document.querySelector(".high-scores-footer").appendChild(goback);

  let clearHighScores = document.createElement("button");
  clearHighScores.textContent = "Clear Highscores";
  clearHighScores.addEventListener('click',clearLeaderBoard,false);
  // clearHighScores.addEventListener('click',goHighScores,false);
  document.querySelector(".high-scores-footer").appendChild(clearHighScores);



  // high.forEach(element => {
   

  // });
}
function init(){
  // https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
var path = window.location.pathname;
// var path2 = window.location.origin;
// var path3 = window.location.hostname;
// var path4 = window.location.href;
var page = path.split("/").pop();
if (page === "index.html") {
  loadStartPage();
} else if (page === "highscores.html") {
  loadHighScores();
} else if (path === "/coding-quiz/") {
  //test for gitpages
  loadStartPage();
}
}
init()
