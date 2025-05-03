import { redirect } from "react-router-dom";
export function logOutAction() {
  localStorage.removeItem("token");
  return redirect("/");
}
