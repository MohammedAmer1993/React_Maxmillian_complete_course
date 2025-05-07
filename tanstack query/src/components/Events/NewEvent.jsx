import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../util/http.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { createNewEvent } from "../../util/http.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && "submitting..."}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title={"Failed to create new event"}
          message={error.info?.message || "Couldn't create new event"}
        />
      )}
    </Modal>
  );
}
