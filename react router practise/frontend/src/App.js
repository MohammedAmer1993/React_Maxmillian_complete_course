import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage from "./routes/EditEventPage";
import NewEventPage from "./routes/NewEventPage";
import EventDetailPage, {
  detailAction,
  eventDetailLoader,
} from "./routes/EventDetailPage";
import EventsPage, { eventsLoader } from "./routes/EventsPage";
import HomePage from "./routes/HomePage";
import RootLayout from "./routes/RootLayout";
import EventsLayout from "./routes/EventsLayout";
import ErrorPage from "./routes/ErrorPage";
import { eventMainAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
            errorElement: <ErrorPage />,
          },
          { path: "new", element: <NewEventPage />, action: eventMainAction },
          {
            path: ":id",
            id: "event-Route-id",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: detailAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventMainAction,
              },
            ],
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
