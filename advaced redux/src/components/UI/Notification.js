import classes from "./Notification.module.css";
export default function Notification({ status, title, message }) {
  let specialClass = "";
  if (status === "success") {
    specialClass = classes.success;
  }
  if (status === "error") {
    specialClass = classes.error;
  }
  const cssClasses = `${classes.notification} ${specialClass}`;
  return (
    <section className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
}
