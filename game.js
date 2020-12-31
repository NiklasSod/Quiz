document.addEventListener("DOMContentLoaded", (e) => {
let player = new Player();

    let quizApi = "https://quizapi.io/api/v1/questions?apiKey=7HEMuIla3VnkS52lZemeOXarWH5JBYssoxWODP0R&category=code&difficulty=easy&limit=10";

    async function fetchQuizData() {
        const response = await fetch(
            quizApi
        );
        const data = await response.json();
        questions = new Questions(data);
        console.log(questions); // remove later
        questions.showCurrentQuestion();
    }

    let playerName = document.getElementById("chooseName");

    // Kallar på api, startar spelet, sparar användarnamn.
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        // If player forgets to add something as name
        if(playerName.value == ""){
            alert("Choose a name");
        }else{
            player.setPlayerName(playerName.value);
            player.setPlayerScore(0);
            // let player = new Player(playerName.value, 0);
            fetchQuizData();
            startButton.style.display = "none";
            nextButton.style.display = "block";
            restartButton.style.display = "block";
        }
    })

    let nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", () => {
        player.setPlayerScore(0);

        questions.showCurrentQuestion();

        if (currentQuestionNr == 10) {
            doneButton.style.display = "block";
            nextButton.style.display = "none";
        }
    })

    let doneButton = document.getElementById("doneButton");
    doneButton.addEventListener("click", () => {
        console.log("Grattis mannen") // fix
    })

    let restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to restart?")) {
            location.reload();
        }
    })
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    doneButton.style.display = "none";
})