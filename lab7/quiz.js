class Validator {
    static validate(input) {
        if (input.disabled) {
            input.setCustomValidity('');
            return true;
        }

        if (input.required && !ValidationCustomMessages.checkRequired(input))
            return false;

        if (input.minLength > 0 && !ValidationCustomMessages.checkLengthMin(input, input.minLength))
            return false;

        if (input.maxLength > 0 && !ValidationCustomMessages.checkLengthMax(input, input.maxLength))
            return false;

        return true;
    }
}

class QuizQuestion {
    question = '';
    answer = '';

    constructor(q, answer) {
        this.question = q;
        this.answer = answer;
    }
}

class QuizQuestionList {
    #quizQuestions = [];

    constructor(qlist = []) {
        this.#quizQuestions = qlist;
    }

    addQuestion(question, answer) {
        const q = new QuizQuestion(question, answer);
        this.addQuestion(q);
    }

    addQuestion(questionObj) {
        this.#quizQuestions.push(questionObj);
    }

    get questions() {
        return this.#quizQuestions;
    }
}

const form = $('.form'),
    tableBody = $('#quiz-list-tbody');

const formInputs = [
    fiQuestion = $fi('question'),
    fiAnswer = $fi('answer'),
];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reports = [];
    for (const input of formInputs) {
        Validator.validate(input);
        reports.push(input.reportValidity());
    }

    if (reports.every(x => x == true)) {
        const
            row = tableBody.insertRow(),
            question = new QuizQuestion(fiQuestion.value, fiAnswer.value),
            propertiesToDisplay = Reflect.ownKeys(question);

        for (const property of propertiesToDisplay) {
            const cell = row.insertCell();
            cell.innerHTML = question[property];
        }

        form.reset();
    }
});

formInputs.forEach((input) => {
    input.addEventListener('input', () => {
        Validator.validate(input);
        input.checkValidity();
    });
});
