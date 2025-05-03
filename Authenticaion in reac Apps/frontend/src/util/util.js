import { redirect } from "react-router-dom";

export function tokenDuration() {
  const durationISOString = localStorage.getItem("expiration");
  const expireDate = new Date(durationISOString);
  const now = new Date();
  const duration = expireDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const duration = tokenDuration();
  if (duration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function checkTokenLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
