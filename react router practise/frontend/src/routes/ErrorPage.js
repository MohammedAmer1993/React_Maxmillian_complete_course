import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const errorData = useRouteError();
  console.log(errorData);
  return (
    <PageContent title={errorData.data?.title || "error"}>
      <p> {errorData.data?.message || "default messsage"}</p>
      <p>Error Code: {errorData.status || "failed to fetch"}</p>
    </PageContent>
  );
}
