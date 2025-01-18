import QustionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";
import { useState, useCallback } from "react";
export default function Question({ onBtnClick, index }) {
  const [selectedAnswer, setSelectedAnswer] = useState({
    answer: "",
    check: null,
  });
  const handleSelect = useCallback(
    function (answer) {
      if (selectedAnswer.answer === "") {
        if (answer === null) {
          onBtnClick(answer);
          return;
        }
        setSelectedAnswer((prev) => {
          return { answer: answer, check: null };
        });
        setTimeout(() => {
          setSelectedAnswer((prev) => {
            return {
              ...prev,
              check:
                prev.answer === QUESTIONS[index].answers[0]
                  ? "correct"
                  : "wrong",
            };
          });
          setTimeout(() => {
            setSelectedAnswer({ answer: "", check: null });
            onBtnClick(answer);
          }, 2000);
        }, 1000);
      }
    },
    [selectedAnswer]
  );
  const handleTimeout = useCallback(
    function () {
      handleSelect(null);
    },
    [handleSelect]
  );
  return (
    <div id="question" key={index}>
      <h2>{QUESTIONS[index].text}</h2>
      <QustionTimer time="3000" onTimeout={handleTimeout} />
      <Answers
        key={index}
        answerState={selectedAnswer}
        onClick={handleSelect}
        index={index}
      />
    </div>
  );
}
