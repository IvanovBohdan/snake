import "./style.css";
import { GameBoard } from "./scripts/GameBoard";
import { Game } from "./scripts/Game";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const canvasContainer = document.getElementById(
    "canvas-container"
) as HTMLDivElement;

console.log(canvasContainer.clientWidth, canvasContainer.clientHeight);
const cellSize = 20;
const width = Math.floor(canvasContainer.clientWidth / cellSize) * cellSize;
const height = width;

const gameBoard = new GameBoard(canvas, width, height, cellSize);

const game = new Game(gameBoard);
game.start();
