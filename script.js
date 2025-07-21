// 1. Canvas Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let boardWidth = 600;
let boardHeight = 500;
canvas.width = boardWidth;
canvas.height = boardHeight;

// 2. Game State Variables
let gameStart = false;
let score = 0;
let lives = 5;
let timer = 0;
let timerInterval = null;

// 3. Ball and Paddle Position
let ball = {
    x: boardWidth / 2,
    y: boardHeight - 25,
    radius: 15,
    dx: 3,
    dy: -4
};

let paddlePos = {
    x: (boardWidth - boardWidth / 3) / 2,
    y: (boardHeight - boardHeight / 3) / 2
};

// 4. On Load Initialization
window.onload = function () {
    focus();
    render();
    navClick();
};

// 5. Focus & Controls
function focus() {
    document.body.setAttribute('tabIndex', '0');
    document.body.focus();

    document.body.addEventListener('keydown', function (e) {
        const moveAmount = 20;

        if (isVertical()) {
            if (e.code === 'ArrowUp') paddlePos.y -= moveAmount;
            if (e.code === 'ArrowDown') paddlePos.y += moveAmount;
            paddlePos.y = Math.max(0, Math.min(boardHeight - boardHeight / 3, paddlePos.y));
        } else {
            if (e.code === 'ArrowLeft') paddlePos.x -= moveAmount;
            if (e.code === 'ArrowRight') paddlePos.x += moveAmount;
            paddlePos.x = Math.max(0, Math.min(boardWidth - boardWidth / 3, paddlePos.x));
        }
        gameStartTrigger();
    });

    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (isVertical()) {
            const newY = mouseY - (boardHeight / 3) / 2;
            if (Math.abs(paddlePos.y - newY) > 1) {
                paddlePos.y = Math.max(0, Math.min(boardHeight - boardHeight / 3, newY));
                gameStartTrigger();
            }
        } else {
            const newX = mouseX - (boardWidth / 3) / 2;
            if (Math.abs(paddlePos.x - newX) > 1) {
                paddlePos.x = Math.max(0, Math.min(boardWidth - boardWidth / 3, newX));
                gameStartTrigger();
            }
        }
    });
}

// 6. Game Start Trigger
function gameStartTrigger() {
    if (!gameStart) {
        gameStart = true;
        update();
        startTimer();
    }
}

// 7. Timer Functions
function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// 8. Shape Button Navigation
const navItems = document.querySelectorAll('.nav ul li');
function navClick() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            canvas.classList.remove('inverse-u-shape', 'inverse-c-shape', 'u-shape', 'c-shape');
            navItems.forEach(i => i.classList.remove('active'));

            const clikId = item.id;
            item.classList.add('active');

            if (clikId === 'inverse_u_shape') canvas.classList.add('inverse-u-shape');
            else if (clikId === 'inverse_c_shape') canvas.classList.add('inverse-c-shape');
            else if (clikId === 'u_shape') canvas.classList.add('u-shape');
            else if (clikId === 'c_shape') canvas.classList.add('c-shape');

            gameStart = false;
            stopTimer();
            score = 0;
            lives = 5;
            timer = 0;
            document.getElementById('scores').textContent = score;
            document.getElementById('lives').textContent = lives;
            document.getElementById('timer').textContent = timer;

            resetBallAndPaddle();
            render();
        });
    });
}

// 9. Ball & Paddle Drawing
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
}

function drawPaddle() {
    ctx.fillStyle = 'black';
    if (isVertical()) {
        const paddleWidth = 10;
        const paddleHeight = boardHeight / 3;
        const x = canvas.classList.contains('c-shape') ? boardWidth - paddleWidth : 0;
        ctx.fillRect(x, paddlePos.y, paddleWidth, paddleHeight);
    } else {
        const paddleWidth = boardWidth / 3;
        const paddleHeight = 10;
        const y = canvas.classList.contains('u-shape') ? 0 : boardHeight - paddleHeight;
        ctx.fillRect(paddlePos.x, y, paddleWidth, paddleHeight);
    }
}

function drawBall() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// 10. Collision & Logic
function isVertical() {
    return canvas.classList.contains('inverse-c-shape') || canvas.classList.contains('c-shape');
}

function checkCollisionWithPaddle() {
    if (isVertical()) {
        const paddleWidth = 10;
        const paddleHeight = boardHeight / 3;
        const paddleX = canvas.classList.contains('c-shape') ? boardWidth - paddleWidth : 0;

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
    } else {
        const paddleWidth = boardWidth / 3;
        const paddleHeight = 10;
        const paddleY = canvas.classList.contains('u-shape') ? 0 : boardHeight - paddleHeight;

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
    }
}

function update() {
    if (!gameStart) return;
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx = -ball.dx;
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.dy = -ball.dy;

    let outOfBounds = false;
    if (canvas.classList.contains('c-shape') && ball.x + ball.radius > boardWidth) outOfBounds = true;
    if (canvas.classList.contains('inverse-c-shape') && ball.x - ball.radius < 0) outOfBounds = true;
    if (canvas.classList.contains('u-shape') && ball.y - ball.radius < 0) outOfBounds = true;
    if (canvas.classList.contains('inverse-u-shape') && ball.y + ball.radius > boardHeight) outOfBounds = true;

    if (outOfBounds) {
        gameStart = false;
        stopTimer();
        lives--;
        document.getElementById('lives').textContent = lives;

        if (lives <= 0) {
            gameStart = false;
            handleGameOver();
            return;
        }

        resetBallAndPaddle();
        render();
        return;
    }

    checkCollisionWithPaddle();
    render();
    requestAnimationFrame(update);
}

// 11. Ball Reset
function resetBallAndPaddle() {
    paddlePos.x = (boardWidth - boardWidth / 3) / 2;
    paddlePos.y = (boardHeight - boardHeight / 3) / 2;

    if (canvas.classList.contains('c-shape')) {
        ball.x = boardWidth - 10 - ball.radius;
        ball.y = boardHeight / 2;
        ball.dx = -4;
        ball.dy = 2;
    } else if (canvas.classList.contains('inverse-c-shape')) {
        ball.x = 10 + ball.radius;
        ball.y = boardHeight / 2;
        ball.dx = 4;
        ball.dy = 2;
    } else if (canvas.classList.contains('u-shape')) {
        ball.x = boardWidth / 2;
        ball.y = 10 + ball.radius;
        ball.dx = 2;
        ball.dy = 4;
    } else if (canvas.classList.contains('inverse-u-shape')) {
        ball.x = boardWidth / 2;
        ball.y = boardHeight - 10 - ball.radius;
        ball.dx = 2;
        ball.dy = -4;
    }
}

// 12. Game Over + Ranking
function handleGameOver() {
    alert("Game Over!");

    let playerName = prompt("Enter your name:");
    if (!playerName || playerName.trim() === "") {
        playerName = "Guest";
    }

    let records = JSON.parse(localStorage.getItem("BounceBallRecord")) || [];

    records.push({
        name: playerName,
        score: score,
        time: timer
    });

    records.sort((a, b) => {
        if (b.score === a.score) return a.time - b.time;
        return b.score - a.score;
    });

    localStorage.setItem("BounceBallRecord", JSON.stringify(records));

    let top5 = records.slice(0, 5);
    let message = "";
    top5.forEach((r, i) => {
        message += `Rank ${i + 1} : ${r.name} - (Score: ${r.score}, Timer: ${r.time}s)\n`;
    });

    alert(message);

    // ✅ Reset semua state
    gameStart = false;
    score = 0;
    timer = 0;
    lives = 5;

    document.getElementById('scores').textContent = score;
    document.getElementById('timer').textContent = timer;
    document.getElementById('lives').textContent = lives;

    resetBallAndPaddle();
    render();
}