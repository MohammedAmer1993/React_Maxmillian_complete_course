import QustionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";
import { useState, useCallback } from "react";
import Progress from "./Progress";
export default function Question({ onBtnClick, index }) {
  const [selectedAnswer, setSelectedAnswer] = useState({
    answer: "",
    check: null,
  });
  const handleSelect = useCallback(
    function (answer) {
      if (selectedAnswer.answer === "") {
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
      onBtnClick(null);
    },
    [handleSelect]
  );
  return (
    <div id="question" key={index}>
      <h2>{QUESTIONS[index].text}</h2>
      {!selectedAnswer.answer ? (
        <QustionTimer time="10000" onTimeout={handleTimeout} />
      ) : null}
      {selectedAnswer.answer && !selectedAnswer.check ? (
        <Progress time={1000} className="selected" />
      ) : null}
      {selectedAnswer.answer && selectedAnswer.check ? (
        <Progress time={2000} className={selectedAnswer.check} />
      ) : null}

      <Answers
        key={index}
        answerState={selectedAnswer}
        onClick={handleSelect}
        index={index}
      />
    </div>
  );
}
