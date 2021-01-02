let playerName = '';
class Player {
    constructor(playerScore) { 
    this.playerScore = playerScore;
    }
    // setPlayerScore(score) {
    //     playerScore = score;
    //     console.log(playerScore);
    //     // must update +1 on correct answered question
    //     // so setPlayerScore should trigger on next cuestion press when answer is correct
    // }
    setPlayerName(name) {
        playerName = name;
        localStorage.setItem("playerName", playerName);
    }

    updateMessage(){
        document.getElementById("playerName").innerHTML =
        `Welcome ${localStorage.getItem("playerName")}. Current score is ${this.playerScore} out of 10.`;
    }
}