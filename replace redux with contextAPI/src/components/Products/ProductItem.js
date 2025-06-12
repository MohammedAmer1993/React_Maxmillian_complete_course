// import { useDispatch } from 'react-redux';
// import { toggleFav } from "../../store/actions/products";
import { useContext } from "react";
import { ProductsCtx } from "../../Context/ProductsContext";
import Card from "../UI/Card";
import "./ProductItem.css";

const ProductItem = (props) => {
  // const dispatch = useDispatch();
  const { favtoggle } = useContext(ProductsCtx);
  const toggleFavHandler = () => {
    favtoggle(props.id);
  };

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
};

export default ProductItem;
