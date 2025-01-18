import { useState, useCallback } from "react";
import QUESTIONS from "../questions";
import quizCompImg from "../assets/quiz-complete.png";
import QustionTimer from "./QuestionTimer";
export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const activeQuestionIndex = answers.length;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleClick = useCallback(function (answer) {
    setAnswers((prev) => [...prev, answer]);
  }, []);

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

  const shuffledAsnwers = QUESTIONS[activeQuestionIndex].answers;
  shuffledAsnwers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QustionTimer
        time={2000}
        onTimeout={handleTimeout}
        key={activeQuestionIndex}
      />
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAsnwers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleClick(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
