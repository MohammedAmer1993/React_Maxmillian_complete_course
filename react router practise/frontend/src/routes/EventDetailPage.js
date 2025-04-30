import { redirect, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import { fetchEvents, fetchEventDetail } from "../util/dataFetching";
import { Suspense } from "react";
import Spinner from "../components/Spinner";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  const { eventDetails, eventsData } = useRouteLoaderData("event-Route-id");
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Await resolve={eventDetails}>
          {(loadedData) => {
            return <EventItem event={loadedData.event} />;
          }}
        </Await>
      </Suspense>
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

export async function eventDetailLoader({ params }) {
  const id = params.id;
  console.log(id);
  return {
    eventDetails: await fetchEventDetail(id),
    eventsData: fetchEvents(),
  };
}

export async function detailAction({ params }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        title: "delete error",
        message: "faild to delete an item",
      }),
      { status: response.status, statusText: response.statusText }
    );
  }
  return redirect("/events");
}
