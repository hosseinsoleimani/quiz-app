const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;

const fetchData = async () => {
  const response = await fetch(URL);
  const json = await response.json();
  formattedData = formatData(json.results);
  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(correctAnswerIndex, 0, item.correct_answer);
    questionObject.answers = answers;
    questionObject.correctAnswerIndex = correctAnswerIndex;
    return questionObject;
  });
  return result;
};

const showQuestion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (index, event) => {
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};
window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(index, event));
});
