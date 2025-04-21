//ensure DOM is loaded first
document.addEventListener("DOMContentLoaded", function() {
/*function that fetchs/gets a random meal from the MealDB API */
/*async defimes asynchronous function to use await inside it to wait for API responses */
async function fetchRandomMeal(){

    /* to handle errors nicely if something goes wrong while fetching use try...catch block */
    try{
        //send a GET request to the mealDB API to get a random meal.await in use so that next line can't run until we get tha data back
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    
        //convert response🔝 into a real javascript object so as to work with it
        const data = await response.json();

        //API  returns an object with a meals array inside, grab the first item (meals[0]) that will be the random meal
        const meal = data.meals[0];

        //EXTRACTING USEFUL MEAL INFO
        //grab image URL of the meal to display to user
        const image = meal.strMealThumb;
        
        //name of the meal
        const name = meal.strMeal;
        
        //category of the food
        const category = meal.strCategory;

        //region and origin of the meal
        const area = meal.strArea;

        //extracting ingredients and measurments
        //create an empty array to fill with ingredients and their amounts
        const ingredients  = [];

       // MealDB gives up to 20 ingredients per meal, named like:strIngredient1, strIngredient2, ...  strMeasure1, strMeasure2, ...
       //loop from 1 to 20 to check all of them. 
       for (let i = 1; i <= 20; i++){

        //bracket notation to dynamically get each ing and it's measure
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        //check if ingredient exists and not just an empty string /whitespace
        //if valid combne it with its measure then add it the ingredients array
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${ingredient} – ${measure}`);
          }    
    }
        //  return a object with only the properties I’ll use in the game.
        // helps me keep game logic nice and organized
    return {
      image,
      name,
      category,
      area,
      ingredients
    };
    // if something breaks 👎❌
  } catch (error) {
    console.error("❌ Failed to fetch meal:", error);
    return null;

    }
}

//When a new round starts:
//Show the meal game section.
//Hide all other sections (like start screen or end screen).
//Inject the image and ingredients into the DOM.
//Clear old guess input and feedback.



//LOGIC IS ALL ABOUT IT
//handle submit
//read input
//compare
//feedback


//disable guess - Prevent multiple guesses until the next round
// variables to hold current round data and score
let currentMeal = null;
let score = 0;
let roundsPlayed = 0;
const maxRounds = 3; // do 3 rounds

//handle Submit button Click
document.getElementById("submit-btn").addEventListener("click", () => {
  const userInput = document.getElementById("userS-guess").value.trim().toLowerCase();
  const feedback = document.getElementById("feedback");

  //Do nothing if there's no current meal
  if (!currentMeal) return;

  //convert correct answers to lowercase for case-insensitive comparison
  const correctCategory = currentMeal.category.toLowerCase();
  const correctArea = currentMeal.area.toLowerCase();

  //compare user's guess
  if (userInput === correctArea) {

    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `Incorrect! The correct answer was: ${currentMeal.area}`;
    feedback.style.color = "red";
  }

  //disable guess input and submit until next round
  document.getElementById("userS-guess").disabled = true;
  document.getElementById("submit-btn").disabled = true;

  //2 seconds pass, then move to next round or end
  setTimeout(() => {
    roundsPlayed++;
    if (roundsPlayed < maxRounds) {
      nextRound(); //  write this to load the next meal
    } else {
      endGame(); // write this to show the final screen
    }
  }, 2000);
});

// state variables  ----- purpose
//round ---- Tracks current round (1 to 3)
//score ---- Tracks how many correct guesses
//mealHistory ---- Stores past 3 meals for summary display

let round = 1;                 // start from round 1
let mealHistory = [];          // stores each meal object shown

//🎮 “start Game” Button Logic
document.getElementById("start-btn").addEventListener("click", () => {
    //reset everything at the start
    round = 1;
    score = 0;
    mealHistory = [];
  
    //clean up the UI
    document.getElementById("meal-summary").innerHTML = "";
    document.getElementById("score").textContent = "0";
    document.getElementById("end").classList.add("hidden");
  
    //Start the first round
    nextRound();
  });

//nextRound() Function
async function nextRound() {
    //if 3 rounds over, end the game
    if (round > maxRounds) {
      endGame();
      return;
    }
  
    //fetch a new random meal
    const meal = await fetchRandomMeal();
  
    //if fetching failed
    if (!meal) {
      alert("Something went wrong fetching a meal.");
      return;
    }
  
    currentMeal = meal;        //store for checking answer
    mealHistory.push(meal);    //Keep track of what showed
    //to generate the masked hint
    // Mask the category to use as a hint __ali_ / italic
    function generateHint(category) {
        if (!category || category.length < 2) return category;
        
        const firstLetter = category[0];
        const hidden = category.slice(1).replace(/./g, "_");
        return `${firstLetter}${hidden}`;
    }
    document.getElementById("hint").textContent = `Hint (Category): ${generateHint(meal.category)}`;
    //update the placeholder
    document.getElementById("userS-guess").placeholder = "Guess the origin (e.g Italian)";
    //display meal content
    displayMealRound(meal);         //write function separately
  
    //reset input and feedback
    document.getElementById("userS-guess").value = "";
    document.getElementById("userS-guess").disabled = false;
    document.getElementById("submit-btn").disabled = false;
    document.getElementById("feedback").textContent = "";
  
    // show meal display section only
    document.getElementById("meal-display").classList.remove("hidden");
    document.getElementById("end").classList.add("hidden");
  
    round++; //move to the next round number
  }
  
//endGame() Function
function endGame() {
    //Hide game view, show end screen
    document.getElementById("meal-display").classList.add("hidden");
    document.getElementById("end").classList.remove("hidden");
  
    //display final score
    document.getElementById("score").textContent = score;
  
    //summary of the meals
    const summaryList = document.getElementById("meal-summary");
    summaryList.innerHTML = ""; //clear old content
  
    mealHistory.forEach((meal, index) => {
      const li = document.createElement("li");
      li.textContent = `Round ${index + 1}: ${meal.name} – Origin: ${meal.area}`;
      summaryList.appendChild(li);
    });
    //after hiding the meal display, also clear the hint
    document.getElementById("hint").textContent = "";
  }
  document.getElementById("restart-btn").addEventListener("click", () => {
    document.getElementById("start-btn").click(); //Reuse the start game logic
  });

//boost interactivity 
//Clear input on focus
//Animate image
//Smooth enable/disable on elements

//to add extra interactivity
//clear the guess input on focus
document.getElementById("userS-guess").addEventListener("focus", () => {
    document.getElementById("userS-guess").value = "";
  });


//disable/enable the guess input more dynamically
//make sure these exist after each round
document.getElementById("userS-guess").disabled = false;
document.getElementById("submit-btn").disabled = false;
//disable right after feedback is give, which is already done
document.getElementById("userS-guess").blur(); // lose focus after submit

//displayMealRound is declared twice
//hence redefining displayMealRound() in two places. SOL:merge them
function displayMealRound(meal) {
    document.getElementById("meal-display").classList.remove("hidden");
    document.querySelector("header").classList.add("hidden");
    document.getElementById("end").classList.add("hidden");

    const mealImg = document.getElementById("meal-img");

    //force reflow to restart animation
    mealImg.classList.remove("pop");
    void mealImg.offsetWidth;

    mealImg.src = meal.image;
    mealImg.alt = `Image of ${meal.name}`;
    mealImg.classList.add("pop");

    const list = document.getElementById("ingredient-list");
    list.innerHTML = ""; //clear old list items

    meal.ingredients.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    //show the name of the meal as a hint
    document.getElementById("meal-name").textContent = `Meal Name: ${meal.name}`;
    //show full category
    document.getElementById("hint").textContent = `Category: ${meal.category}`;
    document.getElementById("userS-guess").value = "";
    document.getElementById("feedback").textContent = "";
}

//FINAL TECH-TOUCH 😒😂
//lets users press Enter instead of clicking “Submit”
document.getElementById("userS-guess").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      document.getElementById("submit-btn").click();
    }
  });
  
//addd a dedicated reset funtiom
function resetGame() {
    round = 1;
    score = 0;
    mealHistory = [];
    document.getElementById("meal-summary").innerHTML = "";
    document.getElementById("score").textContent = "0";
    document.getElementById("end").classList.add("hidden");
    document.getElementById("hint").textContent = "";
    nextRound();
}
});
