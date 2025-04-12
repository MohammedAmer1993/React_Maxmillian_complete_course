import logo from "../assets/logo.jpg";
import Button from "../UI/Button";
import { useContext } from "react";
import { CartContext } from "../store/CartContextProvider";
import { ProgressContext } from "../store/ProgressContextProvider";

export default function Header() {
  const progressCtx = useContext(ProgressContext);
  const { cartState } = useContext(CartContext);
  const itemsInCart = cartState.items.reduce((prevVal, item) => {
    return prevVal + item.quantity;
  }, 0);

  function handleShowCart() {
    progressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="" />
        <h1>Food React</h1>
      </div>
      <p>
        <Button textOnly onClick={handleShowCart}>
          cart ({itemsInCart})
        </Button>
      </p>
    </header>
  );
}
