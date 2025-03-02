import Input from "./Input";
import useInput from "../hooks/useInput";
import { isEmail, isNotEmpty } from "../util/validation";

export default function LoginState() {
  const {
    enteredVal: emailVal,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    invalidVal: invalidEmailVal,
    setInital: setEmailToInitial,
  } = useInput("", isEmail);

  const {
    enteredVal: passwordVal,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur,
    invalidVal: invalidPasswordVal,
    setInital: setPasswordToInitial,
  } = useInput("", isNotEmpty);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(emailVal);
    console.log(passwordVal);
    if (
      emailVal === "" ||
      passwordVal === "" ||
      invalidEmailVal ||
      invalidPasswordVal
    ) {
      return;
    }
    console.log("sending http request ...");
    setEmailToInitial();
    setPasswordToInitial();
  }

  function handleReset() {
    setEmailToInitial();
    setPasswordToInitial();
  }
  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          labelText="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleEmailChange}
          value={emailVal}
          onBlur={handleEmailBlur}
          error={invalidEmailVal && "please enter a valid email"}
        />

        <Input
          labelText="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={passwordVal}
          onBlur={handlePasswordBlur}
          error={invalidPasswordVal && "please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
