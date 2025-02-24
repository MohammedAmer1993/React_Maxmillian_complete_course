import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchGetReq } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const places = await fetchGetReq("http://localhost:3000/places");
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const sortedPlaces = sortPlacesByDistance(
              places.places,
              pos.coords.altitude,
              pos.coords.longitude
            );
            setAvailablePlaces(sortedPlaces);
            setIsLoading(false);
          },
          () => {
            setAvailablePlaces(places.places);
            setIsLoading(false);
          }
        );
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <ErrorPage title={"Error"} message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="fetching data ... "
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
