import { isEmail } from "../util/validation";
import { useActionState } from "react";
function submitAction(prevState, formData) {
  const errors = [];
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const fristName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const role = formData.get("role");
  const acquisition = formData.getAll("acquisition");
  const terms = formData.get("terms");

  if (!email.length || !isEmail(email)) {
    errors.push("Missing email");
  }
  if (!password.length) {
    errors.push("Missing passward");
  }

  if (password !== confirmPassword) {
    errors.push("passward didn't match");
  }

  if (fristName === "" || lastName === "") {
    errors.push("enter your frist and last name");
  }
  if (acquisition.length === 0) {
    errors.push("you must choose at least one aquistion channel");
  }

  if (!terms) {
    errors.push("you must accept terms");
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredVal: {
        email,
        password,
        confirmPassword,
        fristName,
        lastName,
        role,
        acquisition,
        terms,
      },
    };
  }
  return { errors: null };
}
export default function Signup() {
  const [form, submitActionState] = useActionState(submitAction, {
    errors: null,
  });

  return (
    <form action={submitActionState}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={form.enteredVal?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={form.enteredVal?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={form.enteredVal?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={form.enteredVal?.fristName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={form.enteredVal?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={form.enteredVal?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={form.enteredVal?.acquisition.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={form.enteredVal?.acquisition.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={form.enteredVal?.acquisition.includes("other")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={form.enteredVal?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {form.errors &&
        form.errors.map((error) => (
          <li className="error" key={error}>
            {error}
          </li>
        ))}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
