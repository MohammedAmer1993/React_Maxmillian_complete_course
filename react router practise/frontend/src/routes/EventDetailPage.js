import { json, redirect, useRouteLoaderData } from "react-router-dom";
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

export async function detailAction({ params }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw json(
      { title: "delete error", message: "faild to delete an item" },
      { status: response.status }
    );
  }
  return redirect("/events");
}
