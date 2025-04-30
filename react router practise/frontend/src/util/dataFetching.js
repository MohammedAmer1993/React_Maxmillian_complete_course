export async function fetchEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ title: "Error", message: "some server errror" }),
      { status: response.status, statusText: response.statusText }
    );
  } else {
    return response.json();
  }
}

export async function fetchEventDetail(id) {
  const res = await fetch("http://localhost:8080/events/" + id);
  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        title: "event error",
        message: "can't find data for this event",
      }),
      { status: res.status, statusText: res.statusText }
    );
  } else {
    return res.json();
  }
}
