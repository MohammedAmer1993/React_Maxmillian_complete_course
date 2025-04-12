import Modal from "../UI/Modal";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import { CartContext } from "../store/CartContextProvider";
import { ProgressContext } from "../store/ProgressContextProvider";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { reduceArr } from "../util/utilityFunctions";

export default function Cart() {
  const { cartState, addItem, delItem } = useContext(CartContext);
  const prgCtx = useContext(ProgressContext);
  const totalPrice = reduceArr(cartState.items, 0);

  function handleCloseCart() {
    prgCtx.hideCart();
  }

  function handleOpenCheckout() {
    prgCtx.showCheckout();
  }
  return (
    <Modal
      open={prgCtx.cartProgress === "cart"}
      className="cart"
      onClose={prgCtx.cartProgress === "cart" ? handleCloseCart : null}
    >
      <h2>your cart</h2>
      <ul>
        {cartState.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => addItem(item)}
            onDecrease={() => delItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartState.items.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
