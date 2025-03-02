import { isValidElement, useRef, useState } from "react";

export default function Login() {
  const [invalidForm, setInvalidForm] = useState({
    email: false,
    password: false,
  });
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    let invalidEmail = false;
    let invalidPassword = false;

    if (!emailRef.current.value.includes("@")) {
      invalidEmail = true;
    }
    if (passwordRef.current.value === "") {
      invalidPassword = true;
    }
    if (invalidEmail || invalidPassword) {
      setInvalidForm((prev) => ({
        ...prev,
        email: invalidEmail,
        password: invalidPassword,
      }));
      return;
    }

    setInvalidForm((prev) => ({ ...prev, email: false, password: false }));
    console.log("sending http request ....");
    event.target.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" ref={emailRef} />
          {invalidForm.email && (
            <div className="control-error">please enter a valid email</div>
          )}
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
          />
          {invalidForm.password && (
            <div className="control-error">please enter a valid password</div>
          )}
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
