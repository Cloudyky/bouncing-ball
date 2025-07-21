# Bounce Ball Game 🏓

A dynamic HTML5 Canvas-based paddle ball game featuring four different gameplay modes with unique paddle orientations.

## 🎮 Game Overview

Control a paddle to keep an orange ball bouncing and score points! The game features multiple orientations that change how and where you position your paddle, creating varied gameplay experiences.

## ✨ Features

- **4 Unique Game Modes**: U-shape, Inverse-U, C-shape, and Inverse-C orientations
- **Dual Control System**: Play with either keyboard (arrow keys) or mouse
- **Lives System**: Start with 5 lives, lose one when ball exits the danger zone
- **Scoring**: Earn points for each successful paddle collision
- **Timer**: Track your gameplay duration
- **Leaderboard**: Top 5 high scores saved locally in your browser
- **Real-time Physics**: Realistic ball bouncing with velocity changes

## 🕹️ How to Play

### Controls
- **Keyboard**: Use arrow keys to move the paddle
- **Mouse**: Move mouse to position the paddle
- **Game Start**: Move the paddle to begin playing

### Game Modes
Click the navigation buttons to switch between modes:

| Mode | Paddle Position | Ball Danger Zone |
|------|-----------------|------------------|
| **U-Shape** | Top horizontal | Ball exits through top |
| **Inverse-U** | Bottom horizontal | Ball exits through bottom |
| **C-Shape** | Right vertical | Ball exits through right side |
| **Inverse-C** | Left vertical | Ball exits through left side |

### Scoring
- **+1 point** for each paddle collision
- **-1 life** when ball exits through the danger zone
- **Game Over** when all 5 lives are lost

## 🏗️ Technical Implementation

### Code Structure

#### 1. Canvas Setup (Lines 1-8)
```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```
- Initializes HTML5 Canvas with 600x500 pixel dimensions
- Gets 2D rendering context for drawing operations

#### 2. Game State Management (Lines 10-31)
```javascript
let gameStart = false;
let score = 0;
let lives = 5;
let timer = 0;
```
- Tracks game status, player progress, and timing
- Ball and paddle objects store position and velocity data

#### 3. Input System (Lines 39-80)
- **Keyboard Events**: Arrow key detection with 20-pixel movement increments
- **Mouse Events**: Real-time mouse position tracking with smooth paddle following
- **Movement Validation**: Position clamping to keep paddle within bounds

#### 4. Game Loop Architecture (Lines 207-241)
```javascript
function update() {
    if (!gameStart) return;
    ball.x += ball.dx;
    ball.y += ball.dy;
    // ... collision detection and rendering
    requestAnimationFrame(update);
}
```
- Uses `requestAnimationFrame` for smooth 60fps gameplay
- Handles ball physics, collision detection, and rendering

#### 5. Collision Detection System
**Wall Collisions**: Ball velocity reversal when hitting canvas edges
```javascript
if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) 
    ball.dx = -ball.dx;
```

**Paddle Collisions**: Different logic for horizontal vs vertical paddle modes
- **Vertical Mode**: Checks X-axis overlap and Y-axis range
- **Horizontal Mode**: Checks Y-axis overlap and X-axis range

**Out-of-Bounds Detection**: Mode-specific danger zones
```javascript
if (canvas.classList.contains('c-shape') && ball.x + ball.radius > boardWidth) 
    outOfBounds = true;
```

#### 6. Rendering System (Lines 137-169)
- **Double Buffering**: Clear canvas → Draw background → Draw paddle → Draw ball
- **Dynamic Paddle Rendering**: Position and orientation based on current game mode
- **Ball Animation**: Orange circle with smooth position updates

#### 7. Mode Switching (Lines 103-135)
- **CSS Class Management**: Adds/removes shape classes for different modes
- **State Reset**: Clears score, lives, timer when switching modes
- **Position Reset**: Returns ball and paddle to starting positions

#### 8. Persistence Layer (Lines 272-318)
```javascript
let records = JSON.parse(localStorage.getItem("BounceBallRecord")) || [];
```
- **Local Storage**: Saves high scores persistently in browser
- **Ranking Algorithm**: Sorts by score (descending), then time (ascending)
- **Top 5 Display**: Shows leaderboard after game over

## 🎯 Game Physics

### Ball Behavior
- **Starting Velocity**: Varies by mode (e.g., dx: 3, dy: -4)
- **Wall Bouncing**: Perfect elastic collisions with canvas boundaries
- **Paddle Interaction**: Velocity component reversal on collision
- **Reset Mechanics**: Mode-specific starting positions and velocities

### Paddle Mechanics
- **Size Variations**: 
  - Horizontal modes: 1/3 board width × 10px height
  - Vertical modes: 10px width × 1/3 board height
- **Movement Constraints**: Clamped within canvas boundaries
- **Collision Detection**: Rectangle-circle intersection algorithms

## 🚀 Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- JavaScript enabled

### Installation
1. Include the JavaScript code in your HTML file
2. Create a canvas element with id="canvas"
3. Add navigation elements with appropriate IDs:
   - `u_shape`
   - `inverse_u_shape` 
   - `c_shape`
   - `inverse_c_shape`
4. Include display elements for score, lives, and timer

### HTML Structure Required
```html
<canvas id="canvas"></canvas>
<nav class="nav">
    <ul>
        <li id="u_shape">U-Shape</li>
        <li id="inverse_u_shape">Inverse-U</li>
        <li id="c_shape">C-Shape</li>
        <li id="inverse_c_shape">Inverse-C</li>
    </ul>
</nav>
<div>
    Score: <span id="scores">0</span>
    Lives: <span id="lives">5</span>
    Timer: <span id="timer">0</span>
</div>
```

## 📊 Performance Considerations

- **Frame Rate**: Optimized for 60fps using `requestAnimationFrame`
- **Memory Management**: Efficient object reuse, minimal garbage collection
- **Event Handling**: Throttled mouse movement to prevent excessive updates
- **Storage**: Lightweight JSON serialization for leaderboard data

## 🔧 Customization Options

### Easy Modifications
- **Ball Speed**: Adjust `dx` and `dy` values in ball object and reset functions
- **Paddle Size**: Modify width/height calculations in drawing functions
- **Lives Count**: Change initial `lives = 5` value
- **Canvas Dimensions**: Update `boardWidth` and `boardHeight` variables
- **Colors**: Modify `fillStyle` values in drawing functions

### Advanced Customizations
- **New Game Modes**: Add additional CSS classes and corresponding logic
- **Power-ups**: Extend collision detection for special ball behaviors
- **Multiplayer**: Add second paddle and ball tracking
- **Sound Effects**: Integrate Web Audio API for collision sounds

## 🐛 Known Limitations

- Uses `localStorage` which may not be available in all environments
- No mobile touch controls implemented
- Fixed canvas size (not responsive)
- Single-player only

## 📄 License

This code is provided as-is for educational and entertainment purposes.

# Line-by-Line Code Explanation: Bounce Ball Game

## Section 1: Canvas Setup (Lines 1-8)
```javascript
const canvas = document.getElementById('canvas');
```
**Line 1:** Gets reference to HTML canvas element with id 'canvas'

```javascript
const ctx = canvas.getContext('2d');
```
**Line 2:** Gets 2D rendering context for drawing on the canvas

```javascript
let boardWidth = 600;
let boardHeight = 500;
```
**Lines 4-5:** Sets game board dimensions (600x500 pixels)

```javascript
canvas.width = boardWidth;
canvas.height = boardHeight;
```
**Lines 6-7:** Applies the dimensions to the actual canvas element

## Section 2: Game State Variables (Lines 10-16)
```javascript
let gameStart = false;
let score = 0;
let lives = 5;
let timer = 0;
let timerInterval = null;
```
**Lines 10-14:** Initialize game state variables:
- `gameStart`: Boolean to track if game is active
- `score`: Player's current score
- `lives`: Player's remaining lives (starts with 5)
- `timer`: Game timer in seconds
- `timerInterval`: Reference to timer interval for cleanup

## Section 3: Ball and Paddle Objects (Lines 18-31)
```javascript
let ball = {
    x: boardWidth / 2,
    y: boardHeight - 25,
    radius: 15,
    dx: 3,
    dy: -4
};
```
**Lines 18-24:** Ball object with:
- `x, y`: Position (starts center horizontally, near bottom)
- `radius`: Ball size (15 pixels)
- `dx, dy`: Velocity components (3 right, 4 up)

```javascript
let paddlePos = {
    x: (boardWidth - boardWidth / 3) / 2,
    y: (boardHeight - boardHeight / 3) / 2
};
```
**Lines 26-29:** Paddle position object, centered on both axes

## Section 4: Initialization (Lines 33-37)
```javascript
window.onload = function () {
    focus();
    render();
    navClick();
};
```
**Lines 33-37:** When page loads, call three setup functions

## Section 5: Input Controls (Lines 39-80)
```javascript
function focus() {
    document.body.setAttribute('tabIndex', '0');
    document.body.focus();
```
**Lines 39-41:** Makes document body focusable for keyboard events

```javascript
document.body.addEventListener('keydown', function (e) {
    const moveAmount = 20;
```
**Lines 43-44:** Sets up keyboard listener, defines movement speed

```javascript
if (isVertical()) {
    if (e.code === 'ArrowUp') paddlePos.y -= moveAmount;
    if (e.code === 'ArrowDown') paddlePos.y += moveAmount;
    paddlePos.y = Math.max(0, Math.min(boardHeight - boardHeight / 3, paddlePos.y));
}
```
**Lines 46-50:** For vertical paddle modes (C-shapes):
- Up/Down arrows move paddle vertically
- Clamps paddle position within bounds

```javascript
else {
    if (e.code === 'ArrowLeft') paddlePos.x -= moveAmount;
    if (e.code === 'ArrowRight') paddlePos.x += moveAmount;
    paddlePos.x = Math.max(0, Math.min(boardWidth - boardWidth / 3, paddlePos.x));
}
```
**Lines 51-55:** For horizontal paddle modes (U-shapes):
- Left/Right arrows move paddle horizontally
- Clamps paddle position within bounds

```javascript
gameStartTrigger();
```
**Line 56:** Triggers game start when player moves

```javascript
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
```
**Lines 59-62:** Mouse movement listener, calculates mouse position relative to canvas

```javascript
if (isVertical()) {
    const newY = mouseY - (boardHeight / 3) / 2;
    if (Math.abs(paddlePos.y - newY) > 1) {
        paddlePos.y = Math.max(0, Math.min(boardHeight - boardHeight / 3, newY));
        gameStartTrigger();
    }
}
```
**Lines 64-69:** For vertical modes:
- Calculates new Y position centered on mouse
- Only updates if movement is significant (>1 pixel)
- Clamps position and triggers game start

```javascript
else {
    const newX = mouseX - (boardWidth / 3) / 2;
    if (Math.abs(paddlePos.x - newX) > 1) {
        paddlePos.x = Math.max(0, Math.min(boardWidth - boardWidth / 3, newX));
        gameStartTrigger();
    }
}
```
**Lines 70-75:** For horizontal modes: same logic but for X-axis

## Section 6: Game Start (Lines 82-89)
```javascript
function gameStartTrigger() {
    if (!gameStart) {
        gameStart = true;
        update();
        startTimer();
    }
}
```
**Lines 82-89:** Starts game if not already started:
- Sets gameStart flag to true
- Begins update loop
- Starts the timer

## Section 7: Timer Functions (Lines 91-105)
```javascript
function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
    }, 1000);
}
```
**Lines 91-97:** Timer function:
- Stops any existing timer
- Creates new interval that increments timer every second
- Updates timer display in HTML

```javascript
function stopTimer() {
    clearInterval(timerInterval);
}
```
**Lines 99-101:** Stops the timer interval

## Section 8: Shape Navigation (Lines 103-135)
```javascript
const navItems = document.querySelectorAll('.nav ul li');
function navClick() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
```
**Lines 103-106:** Gets navigation items and sets up click listeners

```javascript
canvas.classList.remove('inverse-u-shape', 'inverse-c-shape', 'u-shape', 'c-shape');
navItems.forEach(i => i.classList.remove('active'));
```
**Lines 107-108:** Removes all shape classes and active states

```javascript
const clikId = item.id;
item.classList.add('active');
```
**Lines 110-111:** Gets clicked item ID and marks it active

```javascript
if (clikId === 'inverse_u_shape') canvas.classList.add('inverse-u-shape');
else if (clikId === 'inverse_c_shape') canvas.classList.add('inverse-c-shape');
else if (clikId === 'u_shape') canvas.classList.add('u-shape');
else if (clikId === 'c_shape') canvas.classList.add('c-shape');
```
**Lines 113-116:** Adds appropriate shape class based on clicked navigation

```javascript
gameStart = false;
stopTimer();
score = 0;
lives = 5;
timer = 0;
document.getElementById('scores').textContent = score;
document.getElementById('lives').textContent = lives;
document.getElementById('timer').textContent = timer;
```
**Lines 118-125:** Resets all game state and updates HTML displays

```javascript
resetBallAndPaddle();
render();
```
**Lines 127-128:** Resets positions and redraws the game

## Section 9: Drawing Functions (Lines 137-169)
```javascript
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
}
```
**Lines 137-143:** Main render function:
- Clears the canvas
- Fills with white background
- Draws paddle and ball

```javascript
function drawPaddle() {
    ctx.fillStyle = 'black';
    if (isVertical()) {
        const paddleWidth = 10;
        const paddleHeight = boardHeight / 3;
        const x = canvas.classList.contains('c-shape') ? boardWidth - paddleWidth : 0;
        ctx.fillRect(x, paddlePos.y, paddleWidth, paddleHeight);
    }
```
**Lines 145-152:** Draws paddle for vertical modes:
- Sets black color
- Paddle is 10px wide, 1/3 board height
- X position: right edge for C-shape, left edge for inverse-C-shape

```javascript
else {
    const paddleWidth = boardWidth / 3;
    const paddleHeight = 10;
    const y = canvas.classList.contains('u-shape') ? 0 : boardHeight - paddleHeight;
    ctx.fillRect(paddlePos.x, y, paddleWidth, paddleHeight);
}
```
**Lines 153-157:** Draws paddle for horizontal modes:
- Paddle is 1/3 board width, 10px tall
- Y position: top for U-shape, bottom for inverse-U-shape

```javascript
function drawBall() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}
```
**Lines 160-166:** Draws orange circular ball at current position

## Section 10: Game Logic (Lines 171-232)
```javascript
function isVertical() {
    return canvas.classList.contains('inverse-c-shape') || canvas.classList.contains('c-shape');
}
```
**Lines 171-173:** Helper function to check if current mode uses vertical paddle

```javascript
function checkCollisionWithPaddle() {
    if (isVertical()) {
        const paddleWidth = 10;
        const paddleHeight = boardHeight / 3;
        const paddleX = canvas.classList.contains('c-shape') ? boardWidth - paddleWidth : 0;
```
**Lines 175-179:** Collision detection setup for vertical paddle

```javascript
if (
    ball.x + ball.radius >= paddleX &&
    ball.x - ball.radius <= paddleX + paddleWidth &&
    ball.y >= paddlePos.y &&
    ball.y <= paddlePos.y + paddleHeight
) {
    ball.dx = -ball.dx;
    score++;
    document.getElementById('scores').textContent = score;
}
```
**Lines 181-189:** Vertical collision detection:
- Checks if ball overlaps with paddle rectangle
- Reverses horizontal velocity and increases score

```javascript
} else {
    const paddleWidth = boardWidth / 3;
    const paddleHeight = 10;
    const paddleY = canvas.classList.contains('u-shape') ? 0 : boardHeight - paddleHeight;
```
**Lines 190-193:** Collision setup for horizontal paddle

```javascript
if (
    ball.y + ball.radius >= paddleY &&
    ball.y - ball.radius <= paddleY + paddleHeight &&
    ball.x >= paddlePos.x &&
    ball.x <= paddlePos.x + paddleWidth
) {
    ball.dy = -ball.dy;
    score++;
    document.getElementById('scores').textContent = score;
}
```
**Lines 195-203:** Horizontal collision detection:
- Checks ball overlap with paddle
- Reverses vertical velocity and increases score

```javascript
function update() {
    if (!gameStart) return;
    ball.x += ball.dx;
    ball.y += ball.dy;
```
**Lines 207-211:** Main game loop:
- Returns if game not started
- Updates ball position by velocity

```javascript
if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx = -ball.dx;
if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.dy = -ball.dy;
```
**Lines 213-214:** Wall collision detection - reverses velocity when hitting edges

```javascript
let outOfBounds = false;
if (canvas.classList.contains('c-shape') && ball.x + ball.radius > boardWidth) outOfBounds = true;
if (canvas.classList.contains('inverse-c-shape') && ball.x - ball.radius < 0) outOfBounds = true;
if (canvas.classList.contains('u-shape') && ball.y - ball.radius < 0) outOfBounds = true;
if (canvas.classList.contains('inverse-u-shape') && ball.y + ball.radius > boardHeight) outOfBounds = true;
```
**Lines 216-220:** Checks if ball went out of bounds on the "open" side of each shape

```javascript
if (outOfBounds) {
    gameStart = false;
    stopTimer();
    lives--;
    document.getElementById('lives').textContent = lives;
```
**Lines 222-226:** When ball goes out of bounds:
- Stops game and timer
- Decreases lives
- Updates display

```javascript
if (lives <= 0) {
    gameStart = false;
    handleGameOver();
    return;
}
```
**Lines 228-232:** If no lives left, trigger game over

```javascript
resetBallAndPaddle();
render();
return;
```
**Lines 234-236:** Otherwise reset positions and redraw

```javascript
checkCollisionWithPaddle();
render();
requestAnimationFrame(update);
```
**Lines 239-241:** Check paddle collision, render frame, schedule next update

## Section 11: Reset Function (Lines 244-270)
```javascript
function resetBallAndPaddle() {
    paddlePos.x = (boardWidth - boardWidth / 3) / 2;
    paddlePos.y = (boardHeight - boardHeight / 3) / 2;
```
**Lines 244-246:** Reset paddle to center position

```javascript
if (canvas.classList.contains('c-shape')) {
    ball.x = boardWidth - 10 - ball.radius;
    ball.y = boardHeight / 2;
    ball.dx = -4;
    ball.dy = 2;
```
**Lines 248-252:** C-shape mode: ball starts near right edge, moving left

```javascript
} else if (canvas.classList.contains('inverse-c-shape')) {
    ball.x = 10 + ball.radius;
    ball.y = boardHeight / 2;
    ball.dx = 4;
    ball.dy = 2;
```
**Lines 253-257:** Inverse-C mode: ball starts near left edge, moving right

```javascript
} else if (canvas.classList.contains('u-shape')) {
    ball.x = boardWidth / 2;
    ball.y = 10 + ball.radius;
    ball.dx = 2;
    ball.dy = 4;
```
**Lines 258-262:** U-shape mode: ball starts near top center, moving down

```javascript
} else if (canvas.classList.contains('inverse-u-shape')) {
    ball.x = boardWidth / 2;
    ball.y = boardHeight - 10 - ball.radius;
    ball.dx = 2;
    ball.dy = -4;
}
```
**Lines 263-267:** Inverse-U mode: ball starts near bottom center, moving up

## Section 12: Game Over & Rankings (Lines 272-318)
```javascript
function handleGameOver() {
    alert("Game Over!");
```
**Lines 272-273:** Show game over alert

```javascript
let playerName = prompt("Enter your name:");
if (!playerName || playerName.trim() === "") {
    playerName = "Guest";
}
```
**Lines 275-278:** Get player name, default to "Guest" if empty

```javascript
let records = JSON.parse(localStorage.getItem("BounceBallRecord")) || [];
```
**Line 280:** Load existing high scores from browser storage

```javascript
records.push({
    name: playerName,
    score: score,
    time: timer
});
```
**Lines 282-286:** Add current game result to records

```javascript
records.sort((a, b) => {
    if (b.score === a.score) return a.time - b.time;
    return b.score - a.score;
});
```
**Lines 288-291:** Sort records by score (descending), then by time (ascending for ties)

```javascript
localStorage.setItem("BounceBallRecord", JSON.stringify(records));
```
**Line 293:** Save updated records to browser storage

```javascript
let top5 = records.slice(0, 5);
let message = "";
top5.forEach((r, i) => {
    message += `Rank ${i + 1} : ${r.name} - (Score: ${r.score}, Timer: ${r.time}s)\n`;
});
```
**Lines 295-299:** Create top 5 leaderboard message

```javascript
alert(message);
```
**Line 301:** Display leaderboard

```javascript
// ✅ Reset semua state
gameStart = false;
score = 0;
timer = 0;
lives = 5;
```
**Lines 303-307:** Reset all game state variables

```javascript
document.getElementById('scores').textContent = score;
document.getElementById('timer').textContent = timer;
document.getElementById('lives').textContent = lives;
```
**Lines 309-311:** Update HTML displays with reset values

```javascript
resetBallAndPaddle();
render();
```
**Lines 313-314:** Reset positions and redraw the game

## Summary
This is a paddle ball game with 4 different orientations (U-shape, inverse-U, C-shape, inverse-C). Players control a paddle to keep an orange ball bouncing, earning points for each paddle hit. The game tracks score, time, and lives, with a leaderboard system using localStorage. The ball physics include wall bouncing and paddle collision detection, with game over occurring when the ball exits through the "open" side of the chosen shape.