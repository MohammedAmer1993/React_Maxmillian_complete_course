import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage from "./routes/EditEventPage";
import NewEventPage from "./routes/NewEventPage";
import EventDetailPage from "./routes/EventDetailPage";
import EventsPage, { eventPageLoader } from "./routes/EventsPage";
import HomePage from "./routes/HomePage";
import RootLayout from "./routes/RootLayout";
import EventsLayout from "./routes/EventsLayout";
import ErrorPage from "./routes/ErrorPage";
import { eventDetailLoader } from "./routes/EventDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },

      {
        path: "events",
        element: <EventsLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <EventsPage />,
            loader: eventPageLoader,
          },
          { path: "new", element: <NewEventPage /> },
          { path: ":id/edit", element: <EditEventPage /> },
          {
            path: ":id",
            element: <EventDetailPage />,
            loader: eventDetailLoader,
          },
        ],
      },
    ],
  },
]);
// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  return <RouterProvider router={router} />;
}

export default App;
