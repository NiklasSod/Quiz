let currentQuestionNr = 0;

class Questions {
    constructor(questions) {
        this.questions = [];

        for (let question of questions) {
            this.questions.push(new Question(question));
        }
    }

    // Show question to user
    showCurrentQuestion() {
        let currentQuestion = document.getElementById("currentQuestion");

        showUserCurrentQuestion.innerHTML = `Question: ${currentQuestionNr + 1} / 10`;
        currentQuestion.innerText = this.questions[currentQuestionNr].question;
        currentQuestionNr++;
    }

    // Creates divs with checkboxes and answer alternatives depending on answer.length
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

    //!!!!!!!!!!!!!!!!!!!
    //Visa svars alternativ med checkboxar för användare.
    showCurrentAnswerOptions() {
        let answerOptions = this.getAnswersForPreviousQuestion();
        this.createAnswerOptions(answerOptions);
    }

    getPreviousQuestion() {
        if (currentQuestionNr < 11 && currentQuestionNr > 0) {
            return this.questions[currentQuestionNr - 1];
        } else {
            return {};
        }
    }

    // All prev answers, returns a list
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

    //All prev correct_answers, returns a list
    getAllAnswerOptionsForPreviousQuestion() {
        let previousQuestion = this.getPreviousQuestion();
        let allAnswerOptions = [];
        for (const [key, value] of Object.entries(previousQuestion.correct_answers)) {
            allAnswerOptions.push(`${key} : ${value}`);
        }
        return allAnswerOptions;
    }

    //Filter correct_answers object with only correct, returns a list
    getAllCorrectAnswersForPreviousQuestion() {
        let allAnswerOptions = this.getAllAnswerOptionsForPreviousQuestion();
        let correctAnswersOptions = allAnswerOptions.filter((x) => x.includes("true"));

        correctAnswersOptions.sort();
        return correctAnswersOptions;
    }

    //Checking checked checkboxes, returns a list
    getCheckedChecboxesForPreviousQuestion() {
        let answerOptions = this.getAnswersForPreviousQuestion();
        let listOfAllAnswerOptions = this.getAllAnswerOptionsForPreviousQuestion();
        console.log("listOfAllAnswerOptions:" + listOfAllAnswerOptions);
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