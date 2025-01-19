import quizCompImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ answers }) {
  const skippedAns = answers.filter((answer) => answer === null);
  const correctAns = answers.filter((answer, idx) => {
    return answer === QUESTIONS[idx].answers[0];
  });

  const skippedShare = Math.round((skippedAns.length / answers.length) * 100);
  const correctShare = Math.round((correctAns.length / answers.length) * 100);
  const wrongShare = Math.round(100 - (skippedShare + correctShare));

  return (
    <div id="summary">
      <img src={quizCompImg} alt="quiz complete" />
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {answers.map((answer, idx) => {
          let ansawerClass = "user-answer";
          if (answer === null) {
            ansawerClass += " skipped";
          } else if (answer === QUESTIONS[idx].answers[0]) {
            ansawerClass += " correct";
          } else {
            ansawerClass += " wrong";
          }
          return (
            <li key={idx}>
              <h3>{idx + 1}</h3>
              <p className="question">{QUESTIONS[idx].text}</p>
              <p className={ansawerClass}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
