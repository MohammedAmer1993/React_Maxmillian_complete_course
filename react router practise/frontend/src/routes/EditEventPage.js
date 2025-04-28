import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage() {
  const eventData = useRouteLoaderData("event-Route-id");
  return (
    <>
      <EventForm event={eventData.event} method="PATCH" />
    </>
  );
}
