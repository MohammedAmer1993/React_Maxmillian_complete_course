import { useRef } from "react";
import QUESTIONS from "../questions";
export default function Answers({ answerState, onClick, index }) {
  const shuffledAsnwers = useRef();
  if (!shuffledAsnwers.current) {
    shuffledAsnwers.current = [...QUESTIONS[index].answers];
    shuffledAsnwers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAsnwers.current.map((answer) => {
        let cssStyle = "";
        if (answer === answerState.answer && !answerState.check) {
          cssStyle = "selected";
        }
        if (answer === answerState.answer && answerState.check) {
          cssStyle = answer === answerState.answer && answerState.check;
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
