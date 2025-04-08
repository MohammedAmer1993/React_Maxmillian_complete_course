import { OpinionsContext } from "../store/opinions-context";
import { useContext, useActionState, useOptimistic } from "react";
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = useContext(OpinionsContext);
  const [optVotes, optFn] = useOptimistic(votes, (prevVotes, mode) => {
    return mode === "up" ? ++prevVotes : --prevVotes;
  });
  async function upVote() {
    optFn("up");
    await upvoteOpinion(id);
  }
  async function downVote() {
    optFn("down");
    await downvoteOpinion(id);
  }

  const [upState, upAction, upPending] = useActionState(upVote);
  const [downState, downAction, downPending] = useActionState(downVote);
  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upAction} disabled={upPending || downPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optVotes}</span>

        <button formAction={downAction} disabled={upPending || downPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
