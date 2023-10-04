const canvas = document.querySelector<HTMLCanvasElement>(".game");
const ctx = canvas?.getContext("2d");
const gridSize = 20;
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let dx = 1;
let dy = 0;
let gameInterval: NodeJS.Timer;

function resetGame() {
    clearInterval(gameInterval);
    snake = [{ x: 5, y: 5 }];
    dx = 1;
    dy = 0;
    food = {
        x: Math.floor(Math.random() * ((canvas?.width as number) / gridSize)),
        y: Math.floor(Math.random() * ((canvas?.height as number) / gridSize)),
    };
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    ctx?.clearRect(0, 0, canvas?.width as number, canvas?.height as number);

    const head = {
        x: (snake[0].x + dx) as number,
        y: (snake[0].y + dy) as number,
    };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * ((canvas?.width as number) / gridSize)),
            y: Math.floor(Math.random() * ((canvas?.height as number) / gridSize)),
        };
    } else {
        snake.pop();
    }

    if (
        canvas &&
        (head.x < 0 ||
            head.x >= canvas.width / gridSize ||
            head.y < 0 ||
            head.y >= canvas.height / gridSize ||
            snake
                .slice(5)
                .some((segment) => segment.x === head.x && segment.y === head.y))
    ) {
        resetGame();
        return;
    }

    snake.forEach((segment) => {
        const snakeColor: string = "green";
        ctx!.fillStyle = snakeColor;
        ctx?.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize,
            gridSize
        );
    });

    const foodColor: string = "red";
    ctx!.fillStyle = foodColor;
    ctx?.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case "s":
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case "a":
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case "d":
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});
resetGame();
