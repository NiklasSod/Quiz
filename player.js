class Player {
    constructor(playerName, playerScore) { 
        this.playerName = playerName;
        this.playerScore = playerScore;
    }

    // updates temporary playername with users choice
    setName(localName) {
        this.playerName = localName;
    }

    updateMessage(){
        document.getElementById("playerName").innerHTML =
        `Welcome ${this.playerName}. Current score is ${this.playerScore} out of 10.`;
    }
}