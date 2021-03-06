var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width / 2 + (ballRadius / 2);
var y = canvas.height - 30;
var dx = 1;
var dy = -1;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleSpeed = 5;

var rightPressed = false;
var leftPressed = false;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath;
}


function draw() {
    // Suppression du contenu précédemment affiché à chaque frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawPaddle();

    x += dx;
    y += dy;

    // Collision avec les bords
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }

    if (rightPressed) {
        paddleX += paddleSpeed;
        // Collision droite du paddle
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    if (leftPressed) {
        paddleX -= paddleSpeed;
        // Collision gauche du paddle
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

// Listener pour l'appui des touches du clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Prise en charge de IE/Edge avec Right ou Left sinon Arrow....
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Répète indefiniment l'appel de la fonction draw toute les 10ms
setInterval(draw, 10);