import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putActionGen, getActionGen } from "../../store/cart-slice";

let fristTime = true;
export default function Util() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fristTime) {
      fristTime = false;
      dispatch(getActionGen());
      return;
    }
    if (state.change) {
      dispatch(putActionGen(state));
    }
  }, [state, dispatch]);

  return null;
}
