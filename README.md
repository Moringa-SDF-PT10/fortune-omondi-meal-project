
# Mystery Meal - A JavaScript Guessing Game

Welcome to my **Mystery Meal** game! This is a fun little JavaScript game where players guess the name of a hidden meal using hints and partial word displays, with rounds and scoring. Below is a step-by-step breakdown of how I built it from scratch.

---

## Project Overview

**Mystery Meal** is a browser-based game that uses the [MealDB API](https://www.themealdb.com/api.php) to fetch real meal data. The player is shown a meal category.

---

## Steps I Took

### 1. Set up the HTML Skeleton

I created a basic HTML file with all the essential containers and IDs that I would later use with JavaScript:

- An `h2` tag for displaying the full meal name:  
  ```html
  <h2 id="meal-name" class="meal-title"></h2>
  ```

- A `p` tag for showing the hint (meal category):  
  ```html
  <p id="hint"></p>
  ```

- Additional elements like a user input box, guess button, score display, and game container.

---

### 2. Styled with CSS

To give the game a playful, vibrant look, I created a CSS file and styled various components:

- Centered everything using Flexbox.
- Styled buttons with hover effects.
- Used vibrant colors for headings and messages.
- Applied shadows and spacing for better visibility and feedback.
- Customized the ingredients section to stand out more visually.

---

### 3.Added a Gamey Font for Titles and Hints

I wanted the game to feel more **"arcade" or "comic-style"**, so I added a fun font from Google Fonts.

#### Step-by-step:

- I picked the font `"Press Start 2P"` and added this inside the `<head>` section of my HTML:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  ```

- Then I applied the font to the meal title and hint using CSS ```

This gave the game a **retro gamer feel** and made the text pop on the screen.


### 4. Fetched Meal Data from the MealDB API

I used `fetch()` in JavaScript to get a random meal from the MealDB API

I displayed:

- The full meal name (for when revealed).
- The meal category as a hint.
- The first few ingredients to add more help.
- A masked version of the meal name with blanK. STILL IN PROGRESS THOUGH

### 5.Game Logic: Scoring, Rounds, and Hints

I implemented logic to:

- Track the **player’s score** across rounds.
- Reveal whether the answer was correct or not.
- Show **partial letters** in the name as a hint.
- Reset the game for the next round with a button click.
- Track number of rounds and end the game after 5.


### 6.Ingredients Feature (Bonus)

I added an extra feature to show a few random ingredients from the selected meal. To make this section eye-catching:

- I styled the ingredients container separately.
- Ensured the font was readable and colorful.
- Made it appear only when necessary.


### Features Summary

- Random meal fetched each round
- Category and letter hints for guessing(WORK IN PROGRESS)
- Scoring and round tracking
- Interactive UI with sound visual feedback
- Ingredients section (bonus!)
- Retro game-style fonts and styles


## Final Words

This project helped me improve my understanding of JavaScript, especially in building interactive, real-world browser-based games.

Thanks for checking it out 🙌
