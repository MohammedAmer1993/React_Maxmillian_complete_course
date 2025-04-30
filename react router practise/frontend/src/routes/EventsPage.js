import EventsList from "../components/EventsList";
import Spinner from "../components/Spinner";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { fetchEvents } from "../util/dataFetching";
export default function EventsPage() {
  const { eventsData } = useLoaderData();
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Await resolve={eventsData}>
          {(loadedData) => {
            return <EventsList events={loadedData.events} />;
          }}
        </Await>
      </Suspense>
    </>
  );
}

export async function eventsLoader() {
  return { eventsData: fetchEvents() };
}
