import { Outlet, useSubmit, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { tokenDuration } from "../util/util";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const submit = useSubmit();
  const token = useLoaderData();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const duration = tokenDuration();

    const timer = setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
