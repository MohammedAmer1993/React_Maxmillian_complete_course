import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [answers, setAnswers] = useState([]);

  console.log("anwers length " + answers.length);
  const activeQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleClick = useCallback(
    function (answer) {
      setAnswerState("selected");
      setAnswers((prev) => [...prev, answer]);
      setTimeout(() => {
        if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  console.log(answerState);
  console.log(activeQuestionIndex);
  const handleTimeout = useCallback(
    function () {
      handleClick(null);
    },
    [handleClick]
  );

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompImg} alt="quiz complete" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        time={3000}
        onTimeout={handleTimeout}
        index={activeQuestionIndex}
        answerState={answerState}
        answers={answers}
        onClick={handleClick}
      />
    </div>
  );
}
