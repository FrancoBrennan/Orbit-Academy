let correctCount = 0;
let answeredCount = 0;
let totalQuestions = 0;
let resultButton;

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".trivia-question");
  totalQuestions = questions.length;

  // Crear botón de resultados (inicialmente oculto)
  resultButton = document.createElement("button");
  resultButton.textContent = "Ver resultados";
  resultButton.className = "show-score-btn";
  resultButton.style.display = "none";
  resultButton.onclick = showScore;
  document.querySelector(".space-trivia").appendChild(resultButton);
});

function checkAnswer(element, isCorrect) {
  const feedback = element.parentElement.nextElementSibling;
  const options = element.parentElement.querySelectorAll("li");

  if (feedback.textContent !== "") return;

  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
    opt.style.backgroundColor = "#fff";
  });

  element.style.backgroundColor = isCorrect ? "#c8f7c5" : "#f7c5c5";
  feedback.textContent = isCorrect ? "¡Correcto!" : "Incorrecto.";

  if (isCorrect) correctCount++;
  answeredCount++;

  if (answeredCount === totalQuestions) {
    resultButton.style.display = "inline-block";
  }
}

function showScore() {
  const resultado = document.createElement("p");
  resultado.className = "trivia-score";
  resultado.innerHTML = `Respondiste correctamente <strong>${correctCount}</strong> de <strong>${totalQuestions}</strong> preguntas.`;

  resultButton.replaceWith(resultado);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Volver a intentar";
  resetBtn.className = "reset-btn";
  resetBtn.onclick = resetTrivia;
  document.querySelector(".space-trivia").appendChild(resetBtn);
}

function resetTrivia() {
  correctCount = 0;
  answeredCount = 0;

  // Restaurar cada pregunta
  const questions = document.querySelectorAll(".trivia-question");
  questions.forEach((q) => {
    const options = q.querySelectorAll("li");
    const feedback = q.querySelector(".trivia-feedback");

    options.forEach((opt) => {
      opt.style.pointerEvents = "auto";
      opt.style.backgroundColor = "#fff";
    });

    feedback.textContent = "";
  });

  // Eliminar resultado y botón de reinicio
  document.querySelector(".trivia-score")?.remove();
  document.querySelector(".reset-btn")?.remove();

  // Volver a mostrar botón de resultado
  resultButton.textContent = "Ver resultados";
  resultButton.style.display = "none";
  document.querySelector(".space-trivia").appendChild(resultButton);
}
