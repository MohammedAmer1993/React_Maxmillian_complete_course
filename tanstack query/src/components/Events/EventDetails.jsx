import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import Modal from "../UI/Modal.jsx";
import { queryClient } from "../../util/http.jsx";
import { fetchEvent, deleteEvent } from "../../util/http.jsx";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendignMutation,
    isError: isErrorMutation,
    error: errorMutation,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("..");
    },
  });

  function startDeleteOperation() {
    setIsDeleting(true);
  }
  function stopDeleteOperation() {
    setIsDeleting(false);
  }

  function deleteHandler() {
    mutate({ id });
  }

  let dateFormated;

  if (data) {
    dateFormated = new Date(data.date).toLocaleDateString("EN-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      {isDeleting && (
        <Modal>
          {!isPendignMutation && !isError && (
            <>
              <h2>Are You Sure?</h2>
              <p>This action couldn&apost be undone</p>
              <div className="form-actions">
                <button className="button-text" onClick={stopDeleteOperation}>
                  Cancel
                </button>
                <button className="button" onClick={deleteHandler}>
                  Delete
                </button>
              </div>
            </>
          )}
          {isPendignMutation && <LoadingIndicator center />}
          {isErrorMutation && (
            <ErrorBlock
              title="Couldn't delete event"
              message={
                errorMutation.info?.message ||
                "couldn't delete the event please try again later"
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <LoadingIndicator center />}
      {isError && (
        <ErrorBlock
          title={"Couldn't find event Detail"}
          message={error.info?.message || "couldn't fetch details"}
        />
      )}
      {data && (
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={startDeleteOperation}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time
                  dateTime={`Todo-DateT$Todo-Time`}
                >{`${dateFormated} @ ${data.time}`}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
