import { redirect } from "react-router-dom";
export function logOutAction() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}
