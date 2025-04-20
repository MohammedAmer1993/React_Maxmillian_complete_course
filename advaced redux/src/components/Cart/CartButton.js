import classes from "./CartButton.module.css";
import { cartUiActions } from "../../store/cartUI-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.totalQuantitny);
  function handleToggleCart() {
    dispatch(cartUiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={handleToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
