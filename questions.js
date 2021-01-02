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

        showUserCurrentQuestion.innerHTML = "Question: " + (currentQuestionNr + 1) + " / 10";
        currentQuestion.innerText = this.questions[currentQuestionNr].question;
        currentQuestionNr++;
    }

    showCurrentAnswerOptions() {
        let currentAnswers = document.getElementById("currentAnswers");
        let answers = this.questions[currentQuestionNr - 1].answers;
        let answerOptions = [];
        
        for (const [key, value] of Object.entries(answers)) {
            if (value != null) {
                answerOptions.push(`${value}`);
            }
        }
        console.log(answerOptions);
    }
}