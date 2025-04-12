import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Error from "./Error";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../util/formatting";
import { CartContext } from "../store/CartContextProvider";
import { ProgressContext } from "../store/ProgressContextProvider";
import { useContext } from "react";
import { reduceArr } from "../util/utilityFunctions";
import Button from "../UI/Button";

const config = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

export default function CheckOut() {
  const prgCtx = useContext(ProgressContext);
  const cartCtx = useContext(CartContext);
  const totalPrice = reduceArr(cartCtx.cartState.items, 0);
  const { data, isLoading, error, sendRequest, resetState } = useHttp(
    "http://localhost:3000/orders",
    config,
    false
  );

  let action = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>{" "}
    </>
  );

  if (isLoading) {
    action = <span>Submitting your order...</span>;
  }
  function handleClose() {
    prgCtx.hideCheckout();
  }

  function handleFinishedOrder() {
    prgCtx.hideCheckout();
    cartCtx.clearItems();
    resetState();
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const clintOrder = Object.fromEntries(formData.entries());
    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.cartState.items,
          customer: clintOrder,
        },
      })
    );
  }

  if (data && !error) {
    return (
      <Modal
        open={prgCtx.cartProgress === "checkout"}
        onclose={handleFinishedOrder}
      >
        <h2>Success!</h2>
        <p>your order was submitted successfully</p>
        <p>we will get back to you by details via email</p>
        <p className="actions">
          <Button onClick={handleFinishedOrder}>Okey</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={prgCtx.cartProgress === "checkout"} onclose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2></h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Input lable="Full name" id="name" type="text" />
        <Input label="E-mail address" name="email" type="email" />
        <Input label="Street" name="street" type="text" />
        <div className="control-row">
          <Input label="postal code" type="text" name="postal-code" />
          <Input label="City" type="text" name="city" />
        </div>
        {error && <Error title={"failed to place order"} message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
