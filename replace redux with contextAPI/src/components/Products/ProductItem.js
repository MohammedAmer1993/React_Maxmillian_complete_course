// import { useDispatch } from 'react-redux';
// import { toggleFav } from "../../store/actions/products";
// import { useContext } from "react";
// import { ProductsCtx } from "../../Context/ProductsContext";
import React from "react";
import useStore from "../../store/costum hook/useStoreHook";
import Card from "../UI/Card";
import "./ProductItem.css";

const ProductItem = React.memo((props) => {
  // const dispatch = useDispatch();
  // const { favtoggle } = useContext(ProductsCtx);
  const dispatch = useStore(false)[1];
  const toggleFavHandler = () => {
    dispatch("TOGGLE_FAV", props.id);
  };
  console.log("rendering...");
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
