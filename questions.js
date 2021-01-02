let currentQuestionNr = 0;

class Questions {
    constructor(questions) {
        this.questions = [];

        for (let question of questions) {
            this.questions.push(new Question(question));
        }
    }

    // Visa frågan för användaren.
    showCurrentQuestion() {
        let currentQuestion = document.getElementById("currentQuestion");

        showUserCurrentQuestion.innerHTML = "Question: " + (currentQuestionNr + 1) + " / 10";
        currentQuestion.innerText = this.questions[currentQuestionNr].question;
        currentQuestionNr++;
    }

    //Skapar div och checkboxar beroende på antal svarsaltrernativ.
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
        }
    }

    //Visa svars alternativ med checkboxar för användare.
    showCurrentAnswerOptions() {
        let answerOptions = this.getAnswersForPreviousQuestion();
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

    //Hämta alla svar för föregående fråga och returnera en lista med dessa.
    getAnswersForPreviousQuestion() {
        let answers = this.getPreviousQuestion().answers; 
        let answerOptions = [];

        for (const [key, value] of Object.entries(answers)) {
            if (value != null) {
                answerOptions.push(`${value}`);
            }
        }
        return answerOptions;
    }

    //Hämta alla correct_answers för föregående fråga och returnera en lista av dessa.
    getAllAnswerOptionsForPreviousQuestion() {
        let previousQuestion = this.getPreviousQuestion();
        let allAnswerOptions = [];
        for (const [key, value] of Object.entries(previousQuestion.correct_answers)) {
            allAnswerOptions.push(`${key} : ${value}`);
        }
        return allAnswerOptions;
    }

    //Filtrera correct_answers objektet så att vi bara har korrekta svar och returnerna det som en lista.
    getAllCorrectAnswersForPreviousQuestion() {
        let allAnswerOptions = this.getAllAnswerOptionsForPreviousQuestion();
        let correctAnswersOptions = allAnswerOptions.filter((x) => x.includes("true"));

        correctAnswersOptions.sort();
        return correctAnswersOptions;
    }

    //Kolla vilka checkboxes användaren har valt och returnera en lista med dessa.
    getCheckedChecboxesForPreviousQuestion() {
        let answerOptions = this.getAnswersForPreviousQuestion();
        let listOfAllAnswerOptions = this.getAllAnswerOptionsForPreviousQuestion();
        console.log(listOfAllAnswerOptions);
        let answeredOptions = [];

        for (let i = 0; i < answerOptions.length; i++) {
            if (document.getElementById(i).checked == true) {
                answeredOptions.push(listOfAllAnswerOptions[i]);
            }
        }
        answeredOptions.sort();
        return answeredOptions;
    }
}