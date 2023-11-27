import { Position } from "../types";
import { getRandomColor } from "../utils";
import { GameBoard } from "./GameBoard";

export class Food {
    public position: Position;
    public color: string = getRandomColor();

    constructor(private readonly gameBoard: GameBoard) {
        this.position = this.gameBoard.getRandomPosition();
    }

    public random(snakeBody: Position[]) {
        this.position = this.gameBoard.getRandomPosition(snakeBody);
        this.color = getRandomColor();
    }

    public draw() {
        this.gameBoard.drawCircle(this.position.x, this.position.y, this.color);
    }
}
