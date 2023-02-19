

//create a card
let card = document.createElement("div");
card.classList.add("quiz-question-card");

//create header of card
let cardHeader = document.createElement("h2");
cardHeader.textContent = "Quiz Question of Obj";

card.appendChild(cardHeader);

//create content of card

let cardContent = document.createElement("ol");
let cardContentItem1 = document.createElement("li");
cardContentItem1.textContent="Button Here"
let buttonHit = document.createElement("button");
// buttonHit.type="button";
buttonHit.innerText="text answer on the button";
cardContentItem1.appendChild(buttonHit);
let cardContentItem2 = document.createElement("li");
let cardContentItem3 = document.createElement("li");
let cardContentItem4 = document.createElement("li");

cardContent.appendChild(cardContentItem1);
cardContent.appendChild(cardContentItem2);
cardContent.appendChild(cardContentItem3);
cardContent.appendChild(cardContentItem4);

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