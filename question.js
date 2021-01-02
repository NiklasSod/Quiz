class Question {
    constructor(question) {
        this.id = question.id;
        this.question = question.question;
        this.answers = question.answers;
        this.correct_answers = question.correct_answers;
        this.multiple_correct_answers = question.multiple_correct_answers;
    }
}