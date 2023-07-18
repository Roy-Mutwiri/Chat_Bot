document.addEventListener("DOMContentLoaded", function () {
    // Fetch the questions from the JSON file
    fetch("questions.json")
        .then(response => response.json())
        .then(data => createQuiz(data.questions))
        .catch(error => console.error("Error fetching questions:", error));
});

function createQuiz(questions) {
    const quizContainer = document.getElementById("quiz-container");

    // Loop through each question and create the quiz interface
    questions.forEach((questionData, index) => {
        const questionElem = document.createElement("div");
        questionElem.className = "question";
        questionElem.innerHTML = `
            <h3>Question ${index + 1}:</h3>
            <p>${questionData.question}</p>
            <form>
                ${questionData.options.map((option, optionIndex) => `
                    <label>
                        <input type="radio" name="q${index}" value="${optionIndex}">
                        ${option}
                    </label>
                    <br>
                `).join("")}
                <input type="button" value="Submit" onclick="checkAnswer(${index})">
            </form>
            <p class="explanation" id="explanation${index}"></p>
            <hr>
        `;

        quizContainer.appendChild(questionElem);
    });
}

function checkAnswer(questionIndex) {
    const form = document.forms[questionIndex];
    const selectedOption = form.elements[`q${questionIndex}`].value;
    const explanationElem = document.getElementById(`explanation${questionIndex}`);
    const questions = JSON.parse(localStorage.getItem("quiz_questions")) || [];

    const questionData = questions[questionIndex];
    if (selectedOption === questionData.correctAnswerIndex.toString()) {
        explanationElem.textContent = "Correct! " + questionData.explanation;
    } else {
        explanationElem.textContent = "Incorrect. " + questionData.explanation;
    }
}
