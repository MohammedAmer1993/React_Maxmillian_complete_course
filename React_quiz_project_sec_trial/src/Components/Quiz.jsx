import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompImg from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleClick = useCallback(function (answer) {
    setAnswers((prev) => [...prev, answer]);
  }, []);

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
        answers={answers}
        onBtnClick={handleClick}
        index={activeQuestionIndex}
      />
    </div>
  );
}
