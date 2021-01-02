document.addEventListener("DOMContentLoaded", (e) => {

    let player = new Player("tmp", 0);

    let quizURL = "https://quizapi.io/api/v1/questions?apiKey=7HEMuIla3VnkS52lZemeOXarWH5JBYssoxWODP0R&category=code&difficulty=easy&limit=10";

    async function fetchQuizData() {
        const response = await fetch(
            quizURL
        );
        const data = await response.json();
        questions = new Questions(data);
        console.log(questions); // remove later
        questions.showCurrentQuestion();
        questions.showCurrentAnswerOptions();
    }

    let playerName = document.getElementById("chooseName");

    // Kallar på api, startar spelet, sparar användarnamn.
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        // If player forgets to add something as name
        if (playerName.value == "") {
            alert("Choose a name");
        } else {
            localStorage.setItem("playerName", playerName.value);
            player.playerScore = 0;
            player.setName(playerName.value);
            player.updateMessage();

            // let player = new Player(playerName.value, 0);
            fetchQuizData();
            startButton.style.display = "none";
            nextButton.style.display = "block";
            restartButton.style.display = "block";
        }

    })

    let nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", () => {
        calculateScore(player);
        questions.showCurrentQuestion();
        questions.showCurrentAnswerOptions();

        if (currentQuestionNr == 10) {
            doneButton.style.display = "block";
            nextButton.style.display = "none";
        }
    })

    let doneButton = document.getElementById("doneButton");
    doneButton.addEventListener("click", () => {
        doneButton.style.display = "none";
        calculateScore(player);
        currentQuestionDiv.innerHTML = "Congrats, " + playerName.value + ". Your score: " + player.playerScore + " / 10";
        currentAnswersDiv.innerHTML = "";
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

    // used to remove text with doneButton
    currentQuestionDiv = document.getElementById("currentQuestion");
    currentAnswersDiv = document.getElementById("currentAnswers");
})


function calculateScore(player) {
    let correctAnswers = questions.getAllCorrectAnswersForPreviousQuestion();
        console.log(correctAnswers);
        let checkedAnswers = questions.getCheckedChecboxesForPreviousQuestion();
        console.log(checkedAnswers);

        // if user checked correct checkboxes, update score.
        if (JSON.stringify(correctAnswers) == JSON.stringify(checkedAnswers)) {
            player.playerScore += 1;
            player.updateMessage();
            console.log("score " +player.playerScore);
        }
}