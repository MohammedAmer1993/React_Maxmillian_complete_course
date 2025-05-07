import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock";
import EventItem from "./EventItem";
import LoadingIndicator from "../UI/LoadingIndicator";
import { fetchEvents } from "../../util/http";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchState, setSearchState] = useState();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { serchTerm: searchState }],
    queryFn: ({ queryKey, signal }) => fetchEvents({ ...queryKey[1], signal }),
    enabled: searchState !== undefined,
  });
  function handleSubmit(event) {
    event.preventDefault();
    setSearchState(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;
  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to find matched events"}
      />
    );
  }
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
