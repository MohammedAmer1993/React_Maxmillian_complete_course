import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchGetReq } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchAndSort(url) {
  const places = await fetchGetReq(url);
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          pos.coords.latitude,
          pos.coords.longitude
        );
        resolve(sortedPlaces);
      },
      () => {
        reject(places);
      }
    );
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlaces,
    isFethcing,
    fetchingError: error,
  } = useFetch(fetchAndSort, "http://localhost:3000/places", []);
  if (error) {
    return <ErrorPage title="Error" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFethcing}
      loadingText="fetching data ... "
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
