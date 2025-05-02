import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const { state } = useNavigation();
  const isLogin = searchParams.get("mode") === "login" ? true : false;

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Welcome back" : "Create a new user"}</h1>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        {actionData && actionData.message && <p>{actionData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {!isLogin && (
          <p>
            <label htmlFor="confirm">Confirm Password</label>
            <input id="confirm" type="password" name="confirm" />
          </p>
        )}
        {!isLogin && (
          <p>
            <label htmlFor="username">Password</label>
            <input id="username" type="password" name="username" />
          </p>
        )}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "don't have an accout? Sign up" : "Login"}
          </Link>
          <button disabled={state === "submitting" ? true : false}>
            {state === "submitting " ? "submitting..." : "save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
