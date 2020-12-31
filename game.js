document.addEventListener("DOMContentLoaded", (e) => {
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
    let currentPlayerScore = 0; // fix

    // Kallar på api, startar spelet, sparar användarnamn.
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        // If player forgets to add something as name
        if(playerName.value == ""){
            alert("Choose a name");
        }else{
            let player = new Player(playerName.value, 0);
            player.welcomePlayer();
            fetchQuizData();
            startButton.style.display = "none";
            nextButton.style.display = "block";
            restartButton.style.display = "block";
        }
    })

    let nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", () => {
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
        if (confirm("Är du säker på att du vill starta om?")) {
            location.reload();
        }
    })

    nextButton.style.display = "none";
    restartButton.style.display = "none";
    doneButton.style.display = "none";
})