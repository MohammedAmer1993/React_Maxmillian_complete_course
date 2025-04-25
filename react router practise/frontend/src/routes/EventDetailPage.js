import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
export default function EventDetailPage() {
  const data = useRouteLoaderData("event-Route-id");
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function eventDetailLoader(obj) {
  const res = await fetch("http://localhost:8080/events/" + obj.params.id);
  if (!res.ok) {
    throw json(
      { title: "event error", message: "can't find data for this event" },
      { status: res.status }
    );
  } else {
    return res;
  }
}
