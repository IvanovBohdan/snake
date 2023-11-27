import { Position } from "../types";
import { Direction } from "../types";
import { getRandomColor } from "../utils";
import { GameBoard } from "./GameBoard";

export class Snake {
    private body: Array<Position>;
    private direction: Direction;
    public color: string = getRandomColor();

    constructor(
        private readonly gameBoard: GameBoard,
        initialPosition: Position = { x: 0, y: 0 }
    ) {
        this.body = [{ x: initialPosition.x, y: initialPosition.y }];
        this.direction = Direction.Right;
    }

    private get directionVector(): Position {
        switch (this.direction) {
            case Direction.Up:
                return { x: 0, y: -1 };
            case Direction.Down:
                return { x: 0, y: 1 };
            case Direction.Left:
                return { x: -1, y: 0 };
            case Direction.Right:
                return { x: 1, y: 0 };
        }
    }

    public move(grow: Boolean): void {
        const currentHead = this.body[0];
        const newHead = {
            x:
                (currentHead.x +
                    this.directionVector.x +
                    this.gameBoard.columns) %
                this.gameBoard.columns,
            y:
                (currentHead.y + this.directionVector.y + this.gameBoard.rows) %
                this.gameBoard.rows,
        };
        this.body.unshift(newHead);
        if (!grow) {
            this.body.pop();
        }
    }

    public changeDirection(newDirection: Direction): void {
        switch (this.direction) {
            case Direction.Up:
                if (newDirection !== Direction.Down) {
                    this.direction = newDirection;
                }
                break;
            case Direction.Down:
                if (newDirection !== Direction.Up) {
                    this.direction = newDirection;
                }
                break;
            case Direction.Left:
                if (newDirection !== Direction.Right) {
                    this.direction = newDirection;
                }
                break;
            case Direction.Right:
                if (newDirection !== Direction.Left) {
                    this.direction = newDirection;
                }
                break;
        }
    }

    public checkSelfCollision(): boolean {
        const restOfBody = this.body.slice(1);
        for (const bodyPart of restOfBody) {
            if (this.checkCollisionWithPosition(bodyPart)) {
                return true;
            }
        }
        return false;
    }

    public checkCollisionWithPosition(position: Position): boolean {
        const currentHead = this.body[0];
        return currentHead.x === position.x && currentHead.y === position.y;
    }

    public getHead(): Position {
        return this.body[0];
    }

    public getBody(): Array<Position> {
        return this.body;
    }

    public draw(): void {
        this.gameBoard.drawRectsArray(this.body, this.color);
    }
}
