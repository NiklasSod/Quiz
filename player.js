class Player {
    constructor(playerName, playerScore) { 
        this.playerName = playerName;
        this.playerScore = playerScore;
    }

    setName(localName) {
        this.playerName = localName;
    }

    updateMessage(){
        document.getElementById("playerName").innerHTML =
        `Welcome ${this.playerName}. Current score is ${this.playerScore} out of 10.`;
    }
}