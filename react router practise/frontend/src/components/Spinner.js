import classes from "./Spinner.module.css";
import { useNavigation, Outlet } from "react-router-dom";

export default function Spinner() {
  const { state } = useNavigation();
  return (
    <>
      {state === "loading" && <div className={classes.spinner}></div>}
      <Outlet />
    </>
  );
}
