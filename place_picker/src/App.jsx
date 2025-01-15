import { useCallback, useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

const ids = JSON.parse(localStorage.getItem("selected")) || [];
const places = ids.map((id) => {
  return AVAILABLE_PLACES.find((place) => id === place.id);
});
function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(places);
  const [placesAvilable, setPlacesAvilable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const sortedPlaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          pos.coords.latitude,
          pos.coords.longitude
        );
        setPlacesAvilable(sortedPlaces);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }, []);

  function handleStartRemovePlace(id) {
    setIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    const selectedPlaces = JSON.parse(localStorage.getItem("selected")) || [];
    if (selectedPlaces.indexOf(id) === -1) {
      localStorage.setItem("selected", JSON.stringify([id, ...selectedPlaces]));
    }
  }
  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setIsOpen(false);
    const selectedPlaces = JSON.parse(localStorage.getItem("selected")) || [];
    localStorage.setItem(
      "selected",
      JSON.stringify(
        selectedPlaces.filter((id) => id !== selectedPlace.current)
      )
    );
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={handleStopRemovePlace}>
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
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText={
            "waiting to fetch your location to show you nearest spots"
          }
          places={placesAvilable}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
