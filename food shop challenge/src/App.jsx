import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CartContextProvider from "./store/CartContextProvider";
import ProgressContextProvider from "./store/ProgressContextProvider";
function App() {
  return (
    <>
      <CartContextProvider>
        <ProgressContextProvider>
          <CheckOut />
          <Cart />
          <Header />
          <Meals />
        </ProgressContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
