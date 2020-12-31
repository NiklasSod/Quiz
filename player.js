class Player {
    constructor(playerName, playerScore) {
        this.playerName = playerName;
        this.playerScore = playerScore;
    }

    welcomePlayer() {
        localStorage.setItem("playerName", this.playerName);
        document.getElementById("playerName").innerHTML = 
        "Välkommen " + localStorage.getItem("playerName") + ".";
    }

    setPlayerScore(score) {
        this.playerScore = score;
    }
}