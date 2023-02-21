let startingPage = {
  title:"Coding Quiz Challenge",
  statement:"Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
}
let questionObj = {
    question:"Arrays in JavaScript can be used to store _________.",
    answers:["A","B","C","D"],
    answer:"A"
}
let questionObj2={
   question:"Commonly used data types DO Not include:",
    answers:["strings","booleans","alerts","numbers"],
    answer:"alerts"
}

timerCount =0;

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
  //start timer
  //display question
  //wait for user input
  //if button pressed Check anser and move to bext question
}


//start countDown
function countdown() {
    var timeLeft = 75;
  
    //Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      //
      // YOUR CODE HERE
      if (timeLeft === 0) {
        timerEl.textContent = ""
        clearInterval(timeInterval);
      } else {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;
      }
     
      //
    },1000);
  }


function testAnswer(){
  //get current answer
  let answer = localStorage.getItem("currentAnswer");

  if (answer === "button text") {
    
  }


}

function loadStartPage(){
  let headerElement = document.querySelector("header");
  let aElement = document.createElement("a");
  aElement.href="#";
  aElement.textContent = "View High Scores";
  let labelElement = document.createElement("label");
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
  cardFooter.addEventListener('click',loadQuestion,false)
  card.appendChild(cardFooter);

  
  let container = document.querySelector(".quiz-question-container")
  container.appendChild(card);

}
function loadQuestion(){
  document.querySelector(".quiz-question-container").innerHTML="";

  // let headerElement = document.querySelector("header");
  // let aElement = document.createElement("a");
  // aElement.href="#";
  // aElement.textContent = "View High Scores";
  // let labelElement = document.createElement("label");
  // labelElement.textContent = "Time: " + timerCount;
  // headerElement.appendChild(aElement);
  // headerElement.appendChild(labelElement);
  
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
      cardContent.appendChild(cardContentItem);
      
  }
  
  card.appendChild(cardContent);
  
  let container = document.querySelector(".quiz-question-container")
  container.appendChild(card);
}

loadStartPage();