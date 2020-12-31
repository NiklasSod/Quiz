let playerName;
let playerScore;
class Player {
    constructor() { }
    setPlayerScore(score) {
        this.playerScore = score;
        // this.playerScore = score;
        console.log("Hej");
        // must update +1 on correct answered question
        // so setPlayerScore should trigger on next cuestion press when answer is correct
    }
    setPlayerName(name) {
        playerName = name;
        localStorage.setItem("playerName", playerName);
        document.getElementById("playerName").innerHTML =
            "Welcome " + localStorage.getItem("playerName") + ". Current score is 0 out of 10.";
    }
}