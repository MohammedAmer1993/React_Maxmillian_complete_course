import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";
export function NewOpinion() {
  const ctx = useContext(OpinionsContext);
  async function submitFormAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];
    if (title.trim().length < 5) {
      errors.push("please enter title more than 5 letters");
    }
    if (userName.trim().length === 0) {
      errors.push("please enter your name");
    }
    if (body.trim().length < 5 || body.trim().length > 300) {
      errors.push("the body should be between 5 and 300 letters");
    }

    if (errors.length > 0) {
      return { errors, enteredValus: { body, title, userName } };
    }
    await ctx.addOpinion({ body, title, userName });
    return { errors: null };
  }
  const [formState, setFormState] = useActionState(submitFormAction, {
    errors: null,
  });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={setFormState}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValus?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValus?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValus?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li id={error}>{error}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
