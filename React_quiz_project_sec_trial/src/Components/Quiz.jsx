import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import quizCompImg from "../assets/quiz-complete.png";
import QustionTimer from "./QuestionTimer";
export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [answers, setAnswers] = useState([]);
  const count = useRef(0);
  const activeQuestionIndex =
    answerState === "" ? answers.length : answers.length - 1;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleClick = useCallback(
    function (answer) {
      if (!answerState) {
        if (answer) {
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
        } else {
          setAnswers((prev) => [...prev, answer]);
        }
      }
    },
    [activeQuestionIndex, answerState]
  );

  const handleTimeout = useCallback(
    function () {
      console.log("timer triggered");
      console.log(answerState, count.current);
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
  //   shuffledAsnwers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QustionTimer
        time={3000}
        onTimeout={handleTimeout}
        key={activeQuestionIndex}
      />
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAsnwers.map((answer) => {
            let cssStyle = "";
            if (
              answer === answers[answers.length - 1] &&
              answerState === "selected"
            ) {
              cssStyle = "selected";
            }
            if (
              answer === answers[answers.length - 1] &&
              answerState === "correct"
            ) {
              cssStyle = "correct";
            }
            if (
              answer === answers[answers.length - 1] &&
              answerState === "wrong"
            ) {
              cssStyle = "wrong";
            }
            return (
              <li key={answer} className="answer">
                <button
                  className={cssStyle}
                  onClick={() => handleClick(answer)}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
