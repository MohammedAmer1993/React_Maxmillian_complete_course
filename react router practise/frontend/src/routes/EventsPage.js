import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";
import { json } from "react-router-dom";

export default function EventsPage() {
  const { events } = useLoaderData();

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function eventPageLoader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json(
      { title: "Error", message: "some server errror" },
      { status: response.status }
    );
  } else {
    return response;
  }
}
