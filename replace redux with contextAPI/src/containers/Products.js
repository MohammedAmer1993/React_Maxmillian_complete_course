// import { useSelector } from 'react-redux';
// import { useContext } from "react";
// import { ProductsCtx } from "../Context/ProductsContext";
import ProductItem from "../components/Products/ProductItem";
import "./Products.css";
import useStore from "../store/costum hook/useStoreHook";

const Products = (props) => {
  // const productList = useSelector(state => state.shop.products);
  const { products: productList } = useStore()[0];
  return (
    <ul className="products-list">
      {productList.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
