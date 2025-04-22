import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Route, createRoutesFromElements } from "react-router-dom";
import Home from "./routes/Home";
import Products from "./routes/Products";
import RootLayout from "./routes/RootLayout";
import About from "./routes/About";
import Error from "./routes/Error";
import ProductDetials from "./components/ProductDetails";

// const routes = createRoutesFromElements(
//   <Route path="/" element={<RootLayout />}>
//     <Route path="/" element={<Home />}>
//       <Route path="/about" element={<About />} />
//     </Route>
//     <Route path="/products" element={<Products />} />
//   </Route>
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetials /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
