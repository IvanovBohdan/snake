import { Position } from "../types";
import { getRandomNumber } from "../utils";

export class GameBoard {
    private context: CanvasRenderingContext2D | null;
    public rows: number;
    public columns: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private width: number = 500,
        private height: number = 500,
        private cellSize: number = 10
    ) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = canvas.getContext("2d");
        this.rows = Math.floor(height / cellSize);
        this.columns = Math.floor(width / cellSize);
    }

    public clearCanvas(): void {
        this.context?.clearRect(0, 0, this.width, this.height);
    }

    public drawPauseScreen(): void {
        if (!this.context) throw new Error("No context");

        this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.fillStyle = "white";
        this.context.font = "30px Arial";
        this.context.textAlign = "center";
        this.context.fillText("Paused", this.width / 2, this.height / 2);
    }

    public drawGrid(): void {
        if (!this.context) throw new Error("No context");

        this.context.lineWidth = 0.5;
        this.context?.beginPath();
        for (let x = 0; x <= this.width; x += this.cellSize) {
            this.context?.moveTo(x, 0);
            this.context?.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += this.cellSize) {
            this.context?.moveTo(0, y);
            this.context?.lineTo(this.width, y);
        }
        this.context?.stroke();
    }

    public drawRect(x: number, y: number, color: string = "green"): void {
        if (!this.context) throw new Error("No context");

        this.context.fillStyle = color;
        this.context.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }

    public drawCircle(x: number, y: number, color: string = "green"): void {
        if (!this.context) throw new Error("No context");

        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(
            x * this.cellSize + this.cellSize / 2,
            y * this.cellSize + this.cellSize / 2,
            this.cellSize / 2,
            0,
            Math.PI * 2
        );
        this.context.fill();
    }

    public drawRectsArray(rects: Position[], color: string = "green"): void {
        for (const bodyPart of rects) {
            this.drawRect(bodyPart.x, bodyPart.y, color);
        }
    }

    public getRandomPosition(exclude: Position[] = []): Position {
        let randomPosition: Position = {
            x: getRandomNumber(0, this.columns - 1),
            y: getRandomNumber(0, this.rows - 1),
        };

        if (
            exclude.find(
                (position) =>
                    position.x === randomPosition.x &&
                    position.y === randomPosition.y
            )
        ) {
            return this.getRandomPosition(exclude);
        }

        return randomPosition;
    }
}
