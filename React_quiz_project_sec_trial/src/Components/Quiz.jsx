import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleClick = useCallback(function (answer) {
    setAnswers((prev) => [...prev, answer]);
  }, []);

  if (quizComplete) {
    return <Summary answers={answers} />;
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
