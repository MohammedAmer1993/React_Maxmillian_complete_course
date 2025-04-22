import { useParams } from "react-router-dom";
import { products } from "../routes/Products";

export default function ProductDetials() {
  const params = useParams();
  if (typeof +params.id !== "number") {
    throw new Error("wrong identifier");
  }

  const product = products.find((item) => item.id === +params.id);
  return (
    <>
      <h1>product {product.title}</h1>
    </>
  );
}
