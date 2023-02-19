

//create a card
let card = document.createElement("div");
card.classList.add("quiz-question-card");


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