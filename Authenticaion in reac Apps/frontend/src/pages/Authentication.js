import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function authAction({ request }) {
  const mode = new URL(request.url).searchParams.get("mode");
  const data = await request.formData();
  if (mode !== "login" && mode !== "signup") {
    throw new Response(
      JSON.stringify({
        message: "Entered search parameters are not supported",
      }),
      { status: 422 }
    );
  }

  const dataObj = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataObj),
  });

  if (response.status === 422 || response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Couldn't create new user" }),
      { status: response.status }
    );
  }

  const authData = await response.json();
  const token = authData.token;
  localStorage.setItem("token", token);
  return redirect("/");
}
