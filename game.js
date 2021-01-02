document.addEventListener("DOMContentLoaded", (e) => {
    let player = new Player(0);

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
            // player.setPlayerName(playerName.value);
            player.playerScore = 0;
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
        let correctAnswers = questions.getAllCorrectAnswersForPreviousQuestion();
        console.log(correctAnswers);
        let checkedAnswers = questions.getCheckedChecboxesForPreviousQuestion();
        console.log(checkedAnswers);

        if (JSON.stringify(correctAnswers) == JSON.stringify(checkedAnswers)) {
            console.log("#");
            player.playerScore += 1;
            player.updateMessage();
            console.log("score " +player.playerScore);
        }


        questions.showCurrentQuestion();
        questions.showCurrentAnswerOptions();

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