document.addEventListener("DOMContentLoaded", (e) => {

    let player = new Player("tmp", 0);
    let playerName = document.getElementById("chooseName");

    let quizURL = "https://quizapi.io/api/v1/questions?apiKey=7HEMuIla3VnkS52lZemeOXarWH5JBYssoxWODP0R&category=code&difficulty=easy&limit=10";

    async function fetchQuizData() {
        const response = await fetch(
            quizURL
        );
        const data = await response.json();
        questions = new Questions(data);
        console.log(questions);
        questions.showCurrentQuestion();
        questions.showCurrentAnswerOptions();
    }

    // Fetch api, start game, save username, show first question and answer alternatives
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
        // If player forgets to add something as name
        if (playerName.value == "") {
            alert("Choose a name");
        } else {
            localStorage.setItem("playerName", playerName.value); // Unneccesary line atm
            player.playerScore = 0;
            player.setName(playerName.value);
            player.updateMessage();
            fetchQuizData();
            startButton.style.display = "none";
            nextButton.style.display = "block";
            restartButton.style.display = "block";
        }

    })

    let nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", () => {
        // function calculateScore is used on nextBtn (question 1-9) and submitBtn (question 10)
        // it takes information from the round before and updates score if user checked correct answers
        calculateScore(player);
        questions.showCurrentQuestion();
        questions.showCurrentAnswerOptions();

        if (currentQuestionNr == 10) {
            nextButton.style.display = "none";
            doneButton.style.display = "block";
        }
    })

    let doneButton = document.getElementById("doneButton");
    doneButton.addEventListener("click", () => {
        doneButton.style.display = "none";
        calculateScore(player);
        currentQuestionDiv.innerHTML = `Congratulations ${playerName.value}. Your score: ${player.playerScore} / 10.`;
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

    // needed to remove / change text with doneButton
    currentQuestionDiv = document.getElementById("currentQuestion");
    currentAnswersDiv = document.getElementById("currentAnswers");
})

function calculateScore(player) {
    let correctAnswers = questions.getAllCorrectAnswersForPreviousQuestion();
        console.log("correctAnswers:" + correctAnswers);
        let checkedAnswers = questions.getCheckedChecboxesForPreviousQuestion();
        console.log("checkedAnswers:" + checkedAnswers);

        // if user checked correct checkboxes, update score.
        if (JSON.stringify(correctAnswers) == JSON.stringify(checkedAnswers)) {
            player.playerScore += 1;
            player.updateMessage();
            console.log("score: " + player.playerScore);
        }
}