import QustionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";
export default function Question({
  onTimeout,
  time,
  index,
  answerState,
  answers,
  onClick,
}) {
  return (
    <div id="question" key={index}>
      <QustionTimer time={time} onTimeout={onTimeout} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        index={index}
        answerState={answerState}
        answers={answers}
        onClick={onClick}
      />
    </div>
  );
}
