// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const GRID_SIZE = 16;
const TILE_COUNT_X = 20;
const TILE_COUNT_Y = 18;

// Game state
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 10, y: 10 };
let score = 0;
let gameRunning = false;
let gameLoop = null;

// Button references
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnStart = document.getElementById('btn-start');

// Colors (Game Boy style)
const COLOR_BG = '#0f380f';
const COLOR_SNAKE = '#306230';
const COLOR_SNAKE_HEAD = '#0f380f';
const COLOR_FOOD = '#8bac0f';

// Initialize game
function initGame() {
    snake = [
        { x: 5, y: 9 },
        { x: 4, y: 9 },
        { x: 3, y: 9 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    scoreElement.textContent = score;
    placeFood();
}

// Place food at random position
function placeFood() {
    let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * TILE_COUNT_X);
        food.y = Math.floor(Math.random() * TILE_COUNT_Y);
        
        validPosition = !snake.some(segment => 
            segment.x === food.x && segment.y === food.y
        );
    }
}

// Update game state
function update() {
    if (!gameRunning) return;
    
    // Update direction
    direction = { ...nextDirection };
    
    // Simulate button press based on direction
    animateDirectionButton(direction);
    
    // Calculate new head position
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };
    
    // Check wall collision
    if (head.x < 0 || head.x >= TILE_COUNT_X || 
        head.y < 0 || head.y >= TILE_COUNT_Y) {
        gameOver();
        return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        placeFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
}

// Animate button press based on snake direction
function animateDirectionButton(dir) {
    // Remove all previous pressed states
    [btnUp, btnDown, btnLeft, btnRight].forEach(btn => {
        btn.classList.remove('pressed', 'auto-press');
    });
    
    // Add pressed state to corresponding button
    let activeButton = null;
    if (dir.y === -1) {
        activeButton = btnUp;
    } else if (dir.y === 1) {
        activeButton = btnDown;
    } else if (dir.x === -1) {
        activeButton = btnLeft;
    } else if (dir.x === 1) {
        activeButton = btnRight;
    }
    
    if (activeButton) {
        activeButton.classList.add('pressed');
        // Brief animation
        setTimeout(() => {
            activeButton.classList.remove('pressed');
        }, 150);
    }
}

// Render game
function render() {
    // Clear canvas
    ctx.fillStyle = COLOR_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Snake head - darker
            ctx.fillStyle = COLOR_SNAKE_HEAD;
        } else {
            // Snake body
            ctx.fillStyle = COLOR_SNAKE;
        }
        ctx.fillRect(
            segment.x * GRID_SIZE + 1, 
            segment.y * GRID_SIZE + 1, 
            GRID_SIZE - 2, 
            GRID_SIZE - 2
        );
    });
    
    // Draw food
    ctx.fillStyle = COLOR_FOOD;
    ctx.fillRect(
        food.x * GRID_SIZE + 2, 
        food.y * GRID_SIZE + 2, 
        GRID_SIZE - 4, 
        GRID_SIZE - 4
    );
    
    // Draw grid (optional, subtle)
    ctx.strokeStyle = 'rgba(48, 98, 48, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= TILE_COUNT_X; x++) {
        ctx.beginPath();
        ctx.moveTo(x * GRID_SIZE, 0);
        ctx.lineTo(x * GRID_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= TILE_COUNT_Y; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * GRID_SIZE);
        ctx.lineTo(canvas.width, y * GRID_SIZE);
        ctx.stroke();
    }
    
    // Draw game over message
    if (!gameRunning && score > 0) {
        ctx.fillStyle = COLOR_SNAKE;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = '16px Arial';
        ctx.fillText('Press START', canvas.width / 2, canvas.height / 2 + 20);
    } else if (!gameRunning) {
        ctx.fillStyle = COLOR_SNAKE;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press START', canvas.width / 2, canvas.height / 2);
    }
}

// Game loop
function gameLoopFn() {
    update();
    render();
}

// Start game
function startGame() {
    if (gameRunning) return;
    
    initGame();
    gameRunning = true;
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameLoopFn, 150); // ~6.67 fps
    
    render();
}

// Game over
function gameOver() {
    gameRunning = false;
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
    }
    render();
}

// Change direction
function changeDirection(newDir) {
    // Prevent reversing into itself
    if (direction.x === -newDir.x && direction.y === -newDir.y) {
        return;
    }
    nextDirection = newDir;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            changeDirection({ x: 0, y: -1 });
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            changeDirection({ x: 0, y: 1 });
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            changeDirection({ x: -1, y: 0 });
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            changeDirection({ x: 1, y: 0 });
            break;
        case ' ':
        case 'Enter':
            e.preventDefault();
            startGame();
            break;
    }
});

// D-pad button controls
btnUp.addEventListener('click', () => changeDirection({ x: 0, y: -1 }));
btnDown.addEventListener('click', () => changeDirection({ x: 0, y: 1 }));
btnLeft.addEventListener('click', () => changeDirection({ x: -1, y: 0 }));
btnRight.addEventListener('click', () => changeDirection({ x: 1, y: 0 }));

// Start button
btnStart.addEventListener('click', startGame);

// Initialize display
initGame();
render();
