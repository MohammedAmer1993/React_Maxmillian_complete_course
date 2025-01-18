import { useRef } from "react";
import QUESTIONS from "../questions";

export default function Answers({ answerState, answers, onClick, index }) {
  const shuffledAsnwers = useRef();
  if (!shuffledAsnwers.current) {
    shuffledAsnwers.current = [...QUESTIONS[index].answers];
    shuffledAsnwers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAsnwers.current.map((answer) => {
        let cssStyle = "";
        if (
          (answerState === "selected", answer === answers[answers.length - 1])
        ) {
          cssStyle = "selected";
        }
        if (
          answerState === "correct" &&
          answer === answers[answers.length - 1]
        ) {
          cssStyle = "correct";
        }
        if (answerState === "wrong" && answer === answers[answers.length - 1]) {
          cssStyle = "wrong";
        }
        return (
          <li key={answer} className="answer">
            <button className={cssStyle} onClick={() => onClick(answer)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
