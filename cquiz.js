// quiz.js

document.addEventListener("DOMContentLoaded", function () {
    fetch("cquestions.json")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // Log the fetched data to check if it's correct
        createQuiz(data.questions);
      })
      .catch(error => console.error("Error fetching questions:", error));
  });
  
  function createQuiz(questions) {
    const quizContainer = document.getElementById("quiz-container");
    const totalQuestions = questions.length;
    let correctAnswers = 0;
  
    function checkAnswer(questionIndex) {
      const form = document.forms[questionIndex];
      const selectedOption = form.querySelector(`input[name="q${questionIndex}"]:checked`);
  
      if (!selectedOption) {
        alert("Please select an answer before submitting.Refresh The Page!! Press F5");
        return;
      }
  
      const selectedValue = selectedOption.value;
      const questionData = questions[questionIndex];
      const explanationElem = document.getElementById(`explanation${questionIndex}`);
  
      if (selectedValue === questionData.correctAnswer) {
        explanationElem.textContent = "Correct! " + questionData.explanation;
        correctAnswers++;
      } else {
        explanationElem.textContent = "Incorrect. " + questionData.explanation;
      }
    }
  
    function calculateScore() {
      const percentage = (correctAnswers / totalQuestions) * 100;
      alert(`Your score: ${percentage.toFixed(2)}%`);
  
      // Change the button to "Reset" after submitting
      const submitButton = document.getElementById("submit-button");
      submitButton.textContent = "Reset Quiz";
      submitButton.removeEventListener("click", submitClickHandler);
      submitButton.addEventListener("click", resetQuiz);
    }
  
    function resetQuiz() {
      // Reset answers and explanation text
      const forms = document.forms;
      for (let i = 0; i < forms.length; i++) {
        forms[i].reset();
        const explanationElem = document.getElementById(`explanation${i}`);
        explanationElem.textContent = "";
      }
  
      // Reset score and change the button back to "Submit"
      correctAnswers = 0;
      const submitButton = document.getElementById("submit-button");
      submitButton.textContent = "Submit Quiz";
      submitButton.removeEventListener("click", resetQuiz);
      submitButton.addEventListener("click", submitClickHandler);
    }
  
    function submitClickHandler() {
      // Call checkAnswer for each question before calculating the score
      for (let i = 0; i < totalQuestions; i++) {
        checkAnswer(i);
      }
      calculateScore();
    }
  
    questions.forEach((questionData, index) => {
      const questionElem = document.createElement("div");
      questionElem.className = "question";
      questionElem.innerHTML = `
        <h3>Question ${index + 1}:</h3>
        <p>${questionData.question}</p>
        <form>
          ${questionData.options.map((option, optionIndex) => `
            <label>
              <input type="radio" name="q${index}" value="${option}">
              ${option}
            </label>
            <br>
          `).join("")}
        </form>
        <p class="explanation" id="explanation${index}"></p>
        <hr>
      `;
  
      quizContainer.appendChild(questionElem);
    });
  
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.id = "submit-button"; // Add an ID for easier manipulation
    submitButton.addEventListener("click", submitClickHandler);
    quizContainer.appendChild(submitButton);
  }
  