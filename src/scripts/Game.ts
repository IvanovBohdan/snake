import { Snake } from "./Snake";
import { GameBoard } from "./GameBoard";
import { Direction } from "../types";
import { Food } from "./Food";
import { Score } from "./Score";

export class Game {
    private snake: Snake;
    private speed: number = 100;
    private food: Food;
    private score: Score = new Score();
    private isPaused: boolean = true;

    constructor(private gameBoard: GameBoard) {
        this.snake = new Snake(this.gameBoard);
        this.food = new Food(this.gameBoard);
    }

    private update(): void {
        if (this.snake.checkCollisionWithPosition(this.food.position)) {
            this.score.addScore();
            this.snake.move(true);
            this.food.random(this.snake.getBody());
        } else {
            this.snake.move(false);
        }
        if (this.snake.checkSelfCollision()) {
            this.restart();
        }
    }

    private render(): void {
        this.gameBoard.clearCanvas();
        this.food.draw();
        this.snake.draw();
    }

    private gameLoop(): void {
        if (!this.isPaused) {
            this.update();
            this.render();
        }
        setTimeout(() => {
            window.requestAnimationFrame(this.gameLoop.bind(this));
        }, this.speed);
    }

    public pause(): void {
        this.isPaused = true;
        this.gameBoard.drawPauseScreen();
    }

    public resume(): void {
        this.isPaused = false;
    }

    public start(): void {
        this.isPaused = false;
        document.addEventListener("keydown", (event) => {
            if (event.key === "w" || event.key === "ArrowUp") {
                this.snake.changeDirection(Direction.Up);
            }
            if (event.key === "s" || event.key === "ArrowDown") {
                this.snake.changeDirection(Direction.Down);
            }
            if (event.key === "a" || event.key === "ArrowLeft") {
                this.snake.changeDirection(Direction.Left);
            }
            if (event.key === "d" || event.key === "ArrowRight") {
                this.snake.changeDirection(Direction.Right);
            }
            if (event.key === " ") {
                this.isPaused ? this.resume() : this.pause();
            }
        });
        this.gameLoop();
    }

    public restart(): void {
        this.snake = new Snake(this.gameBoard);
        this.food = new Food(this.gameBoard);
        this.score.resetScore();
    }
}
