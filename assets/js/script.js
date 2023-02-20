let questionObj = {
    question:"Arrays in JavaScript can be used to store _________.",
    answers:["A","B","C","D"],
    answer:"A"
}
timerCount =0;

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

//create header of card
let cardHeader = document.createElement("h2");
cardHeader.textContent = questionObj.question;
// cardHeader.textContent = "Quiz Question of Obj";

card.appendChild(cardHeader);

//create content of card

let cardContent = document.createElement("ol");




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

//credits
//https://stackoverflow.com/questions/507138/how-to-add-a-class-to-a-given-element

//create arrays of questions cards obj
//starting page.
//btn press - timer started and first question is loaded.
//do while timer !=0 
//once anwerd and if timer still going 





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