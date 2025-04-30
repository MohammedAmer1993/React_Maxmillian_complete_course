import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";

function NewsletterSignup() {
  const [subscribed, setSubscriped] = useState(false);
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.data?.message === "Signup successful!") {
      setSubscriped(true);
    }
  }, [fetcher.data]);
  useEffect(() => {
    if (subscribed) {
      setTimeout(() => {
        setSubscriped(false);
      }, 3000);
    }
  }, [subscribed, fetcher.data]);
  return (
    <fetcher.Form
      method="POST"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button disabled={fetcher.state === "submitting"}>
        {fetcher.state === "submitting" ? "Subimtting..." : "Sign up"}
      </button>
      {subscribed && <p>you have subscribed to our news letter</p>}
    </fetcher.Form>
  );
}

export default NewsletterSignup;
