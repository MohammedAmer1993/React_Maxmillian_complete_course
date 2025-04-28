import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const actionData = useActionData();
  const navigationState = useNavigation();
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {actionData &&
        actionData.errors &&
        Object.values(actionData.errors).map((err) => <li key={err}>{err}</li>)}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={navigationState.state === "submitting"}>
          {navigationState.state === "submitting" ? "loading..." : "save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function eventMainAction({ request, params }) {
  const method = request.method;
  let url = "http://localhost:8080/events/";
  const data = await request.formData();
  const dataObject = Object.fromEntries(data.entries());

  if (method === "PATCH") {
    url = url + params.id;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(dataObject),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw response;
  }
  return redirect("/events");
}
