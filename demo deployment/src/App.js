import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from "./pages/Blog";
// import PostPage, { loader as postLoader } from "./pages/Post";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";

const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: (obj) =>
              import("./pages/Blog").then((module) => module.loader(obj)),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (obj) =>
              import("./pages/Post").then((module) => module.loader(obj)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
