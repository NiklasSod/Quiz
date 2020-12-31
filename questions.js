let currentQuestionNr = 0;
// let currentAnswerOptionsNr = 0;

class Questions {
    constructor(questions) {
        this.questions = [];

        for (let question of questions) {
            this.questions.push(new Question(question));
        }
    }
    showCurrentQuestion() {
        let currentQuestion = document.getElementById("currentQuestion");

        showUserCurrentQuestion.innerHTML = "Fråga: " + (currentQuestionNr + 1) + " / 10";
        currentQuestion.innerHTML = this.questions[currentQuestionNr].question;
        currentQuestionNr++
    }

    showCurrentAnswerOptions() {
        let currentAnswers = document.getElementById("currentAnswers");
    }
}