import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../util/http.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent } from "../../util/http.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (sentData) => {
      const previousData = queryClient.getQueryData(["events", { id }]);
      await queryClient.cancelQueries(["events", { id }]);
      queryClient.setQueriesData(["events", { id }], sentData.event);
      return { previousData };
    },

    onError(error, sentData, context) {
      queryClient.setQueryData(["events", { id }], context.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  function handleSubmit(formData) {
    mutate({ id: id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      {isPending && <LoadingIndicator center />}
      {!isPending && !isError && (
        <EventForm inputData={data} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      )}
      {isError && (
        <>
          <ErrorBlock
            title="Couldn't fetch event details"
            message={error.info?.message || "Couldn't find event detail"}
          />
          <div className="form-actions">
            <Link className="button" to={".."}>
              Okey
            </Link>
          </div>
        </>
      )}
    </Modal>
  );
}
