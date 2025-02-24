import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchPutReq, fetchGetReq } from "./http.js";
import ErrorPage from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [putPlaceErr, setputPlaceErr] = useState(false);
  const [delPlaceErr, setDelPlaceErr] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFethcing, setIsFetching] = useState(false);
  const [errorFetchingUsrPlaces, setErrorFetchingUsrPlaces] = useState(false);

  useEffect(() => {
    async function getUserPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchGetReq("http://localhost:3000/user-places");
        setUserPlaces(places.places);
      } catch (error) {
        setErrorFetchingUsrPlaces({
          message: error.message || "failed to get user places",
        });
      } finally {
        setIsFetching(false);
      }
    }
    getUserPlaces();
  }, []);
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await fetchPutReq("http://localhost:3000/user-places", {
        places: [selectedPlace, ...userPlaces],
      });
    } catch (error) {
      setUserPlaces(userPlaces);
      setputPlaceErr({ message: error.message || "backend error" });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      const places = userPlaces.filter(
        (place) => place.id !== selectedPlace.current.id
      );
      await fetchPutReq("http://localhost:3000/user-places", {
        places: places,
      });
    } catch (error) {
      setDelPlaceErr({ message: error.message || "couldn't delete place" });
      setUserPlaces(userPlaces);
    }
    setModalIsOpen(false);
  }, []);

  function handlePutErrModal() {
    setputPlaceErr(false);
  }
  function handleDelErrModal() {
    setDelPlaceErr(false);
  }
  return (
    <>
      <Modal open={delPlaceErr} onClose={handleDelErrModal}>
        {delPlaceErr && (
          <ErrorPage
            title={"delete error"}
            message={delPlaceErr.message}
            onConfirm={handleDelErrModal}
          ></ErrorPage>
        )}
      </Modal>
      <Modal open={putPlaceErr} onClose={handlePutErrModal}>
        {putPlaceErr && (
          <ErrorPage
            title={"Can't post the place"}
            message={putPlaceErr.message}
            onConfirm={handlePutErrModal}
          ></ErrorPage>
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {errorFetchingUsrPlaces && (
          <ErrorPage
            title={"Error user places"}
            message={errorFetchingUsrPlaces.message}
          />
        )}
        {!errorFetchingUsrPlaces && (
          <Places
            isLoading={isFethcing}
            loadingText="Fetching user places ... "
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
