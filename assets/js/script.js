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
localStorage.setItem("myListOfQuestions",JSON.stringify(questionsList));
//window.localStorage.setItem("myObject", JSON.stringify(myObject));
questionCounter = 0;
timerCount =0;
let timeLeft = 75;
//credits
//https://stackoverflow.com/questions/507138/how-to-add-a-class-to-a-given-element
//create arrays of questions cards obj
//starting page.
//btn press - timer started and first question is loaded.
//do while timer !=0 
//once anwerd and if timer still going 
//game logic
//btn pressed - timer started
function game(){
  
  //check timer
  if (timeLeft <=0) {
    //cal score
    //send to initial page
  }
  let Questions = JSON.parse(localStorage.getItem("myListOfQuestions"));  

  // if (Questions.length > questionCounter) {

  let q = Math.floor(Math.random() * Questions.length);

  //send the question to the page
  sendQ(Questions[q]);

  //show the question that was removed
  let qArray = Questions.splice(q,1);

  //write the new array back to local storage
  window.localStorage.setItem("myListOfQuestions",JSON.stringify(Questions));

  // }
  //   localStorage.setItem("questionAnswered",false);
  //   do {
  //   } while (localStorage.getItem("questionAnswered"));
  // }

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
      } else {
        timertochange.textContent = "Time: "+timeLeft + " seconds remaining";
        timeLeft--;
      }
     
      //
    },1000);
}
function testAnswer(){
  //get current answer
  let answer = localStorage.getItem("currentAnswer");
  // localStorage.setItem("questionAnswered",true);
  questionCounter++;
  if (answer === this.textContent) {
    //you got the answer correct 
    //add points

  } else {
    //you got it wrong
    //-50dkp
    if (timeLeft > 10) {
      timeLeft = timeLeft-10;
    }
    else{
      timeLeft = 0;
    }

  }

  //next question
  game();

}
function loadStartPage(){
  let headerElement = document.querySelector("header");
  let aElement = document.createElement("a");
  aElement.href="#";
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
function sendQ(questionGiven){
  document.querySelector(".quiz-question-container").innerHTML="";
  //create a card
  let card = document.createElement("div");
  card.classList.add("quiz-question-card");
  
  //create header of card
  let cardHeader = document.createElement("h2");
  cardHeader.textContent = questionGiven.question;
  // cardHeader.textContent = "Quiz Question of Obj";
  card.appendChild(cardHeader);
  
  //create content of card
  let cardContent = document.createElement("ol");
  //give the localstorage the answer of the question
  localStorage.setItem("currentAnswer",questionGiven.answer);
  
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
  localStorage.setItem("currentAnswer",questionObj.answer);
  
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
loadStartPage();