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