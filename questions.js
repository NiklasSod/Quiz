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


    // skapar rätt mängd div med checkbox + fråga
    createAnswerOptions(answerOptions) {
        currentAnswers.innerText = "";

        for (let i = 0; i < answerOptions.length; i++) {
            let checkbox = document.createElement("INPUT");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", [i]);
            checkbox.className = "checkbox";

            let oneAnswer = document.createElement("div");
            oneAnswer.appendChild(checkbox);

            let test = document.createElement("p");
            test.innerText = answerOptions[i];
            oneAnswer.appendChild(test);

            let currentAnswers = document.getElementById("currentAnswers");
            currentAnswers.appendChild(oneAnswer);

            console.log(checkbox); // ta bort sen
        }
    }

    showCurrentAnswerOptions() {
        let answerOptions = this.getAnswersForPreviousQuestion();
        // console.log(answerOptions); // ta bort sen
        this.createAnswerOptions(answerOptions);
    }


    //Hämta föregående fråga
    getPreviousQuestion() {

        if (currentQuestionNr < 11 && currentQuestionNr > 0) {
            return this.questions[currentQuestionNr - 1];
        } else {
            return {};
        }
    }

    getAllAnswerOptionsForPreviousQuestion() {
        let previousQuestion = this.getPreviousQuestion();
        let allAnswerOptions = [];
        for (const [key, value] of Object.entries(previousQuestion.correct_answers)) {
            allAnswerOptions.push(`${key} : ${value}`);
        }
        return allAnswerOptions;
    }

    getAllCorrectAnswersForPreviousQuestion() {
        let allAnswerOptions = this.getAllAnswerOptionsForPreviousQuestion();
        let correctAnswersOptions = allAnswerOptions.filter((x) => x.includes("true"));

        // console.log("korrekta");
        // console.log(correctAnswersOptions);
        correctAnswersOptions.sort();
        return correctAnswersOptions;
    }

    getCheckedChecboxesForPreviousQuestion() {

        let answerOptions = this.getAnswersForPreviousQuestion();
        let listOfAllAnswerOptions = this.getAllAnswerOptionsForPreviousQuestion();
        console.log(listOfAllAnswerOptions);
        let answeredOptions = [];


        for (let i = 0; i < answerOptions.length; i++) {

            if (document.getElementById(i).checked == true) {
                // optionCount++;
                answeredOptions.push(listOfAllAnswerOptions[i]);
            }
        }
        // console.log("svarade");
        answeredOptions.sort();
        // console.log(answeredOptions);
        return answeredOptions;
    }


    getAnswersForPreviousQuestion() {
        let answers = this.questions[currentQuestionNr - 1].answers;
        let answerOptions = [];

        for (const [key, value] of Object.entries(answers)) {
            if (value != null) {
                answerOptions.push(`${value}`);
            }
        }
        return answerOptions;
    }
}