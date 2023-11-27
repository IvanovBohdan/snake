export class Score {
    public score = 0;
    public highScore = Number(window.localStorage.getItem("highScore")) || 0;

    constructor() {
        this.updateScore();
        this.updateHighScore();
    }
    addScore() {
        this.score++;
        this.updateScore();
    }
    updateScore() {
        const score = document.getElementById("score");
        if (score) {
            score.innerText = this.score.toString();
        }
        this.updateHighScore();
    }
    resetScore() {
        this.score = 0;
        this.updateScore();
    }
    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            window.localStorage.setItem("highScore", this.highScore.toString());
        }
        const highScore = document.getElementById("high-score");
        if (highScore) {
            highScore.innerText = this.highScore.toString();
        }
    }
}
