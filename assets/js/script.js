let startingPage = {
  title:"Coding Quiz Challenge",
  statement:"Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
}
let question1 = {
  question:"Arrays in JavaScript can be used to store _________.",
  answers:["numbers and strings","other arrays","booleans","all of the above"],
  answer:"all of the above"
}
let question2 = {
  question:"The condition in an if / else statement is enclosed with _________.",
  answers:["quotes","curly brackets","parenthesis","square brackets"],
  answer:"parenthesis"
}
let question3={
  question:"Commonly used data types DO Not include:",
  answers:["strings","booleans","alerts","numbers"],
  answer:"alerts"
}
let questionsList = [question1,question2,question3]
//calculate question score
let qScorePer = 100/questionsList.length;

window.sessionStorage.setItem("myListOfQuestions",JSON.stringify(questionsList));
window.sessionStorage.setItem("testScore",JSON.stringify(0))
//window.localStorage.setItem("myObject", JSON.stringify(myObject));
questionCounter = 0;
timerCount =0;
let timeLeft = 10;
//credits
//https://stackoverflow.com/questions/507138/how-to-add-a-class-to-a-given-element

function game(previousAnswer){
  
 
 
  let Questions = JSON.parse(window.sessionStorage.getItem("myListOfQuestions"));  

  // if (Questions.length > questionCounter) {
  if (Questions.length == 0) {
    //call game over
    clearInterval(1);
    loadEndGame();
    
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
    },1000,saveID(timeInterval));
}
function saveID(TI){
  sessionStorage.setItem("timerId",JSON.stringify(TI));
}
function testAnswer(){
  //get current answer
  let answer = sessionStorage.getItem("currentAnswer");
  let testScore = window.sessionStorage.getItem("testScore");
  // localStorage.setItem("questionAnswered",true);
  questionCounter++;
  let previousAnswer;
  if (answer === this.textContent) {
    //you got the answer correct 
    //add points
    testScore = Number(testScore) + Number(qScorePer);
    sessionStorage.setItem("testScore",testScore);
    previousAnswer=true;

  } else {
    //you got it wrong
    //-50dkp
    previousAnswer=false;
    if (timeLeft > 10) {
      timeLeft = timeLeft-10;
    }
    else{
      timeLeft = 0;
    }

  }

  //next question
  game(previousAnswer);

}
function loadStartPage(){
  let headerElement = document.querySelector("header");
  let aElement = document.createElement("a");
  aElement.href="highscores.html";
  aElement.textContent = "View High Scores";
  let labelElement = document.createElement("label");
  labelElement.classList.add("timer-mod");
  labelElement.textContent = "Time: " + timerCount;
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
  cardFooter.addEventListener('click',createDelay,false);
  card.appendChild(cardFooter);

  
  let container = document.querySelector(".quiz-question-container")
  container.appendChild(card);

}
function loadEndGame(){
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
  cardfooterinput.id="initials"
  cardfooterinput.placeholder = "Enter Initials...";
  cardfooterinput.style.marginRight="1rem";
  cardfooterinput.style.fontSize="2.7rem"
  let cardFooter = document.createElement("button");
  cardFooter.textContent = "Submit";
  cardFooter.addEventListener('click',addScore,false);

  let cardfooterstyle = document.createElement("div")
  cardfooterstyle.classList.add("enter-initials");

  cardfooterstyle.appendChild(cardfooterinput);
  
  cardfooterstyle.appendChild(cardFooter);
  card.appendChild(cardfooterstyle)


let container = document.querySelector(".quiz-question-container");
  container.appendChild(card);
  


}

function addScore(){
  let initialsOfPerson = document.querySelector("#initials");

  let person = {
    name:initialsOfPerson.value,
    score: sessionStorage.getItem("testScore")
  }

  let leaderBoard = [person]

  window.localStorage.setItem("leaderBoard",JSON.stringify(leaderBoard))
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
      cardContentItem.appendChild(buttonHit);
      cardContentItem.addEventListener('click',testAnswer,false)
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
function loadHighScores(){
  let high = JSON.parse(window.localStorage.getItem("leaderBoard"));
  let docOl = document.querySelector(".high-scores");
  high.forEach(element => {
    let liToAdd = document.createElement("li");
    liToAdd.textContent = element.name + " - " + element.score;
    docOl.appendChild(liToAdd);

  });
}
// https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
var path = window.location.pathname;
var page = path.split("/").pop();
if (page === "index.html") {
  loadStartPage();
} else if (page === "highscores.html") {
  loadHighScores();
}

