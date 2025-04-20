import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "harry potter",
    price: 5,
    description: "frist harry potter book",
  },
  {
    id: 2,
    title: "old man and the sea",
    price: 12,
    description: "earnst himgnway finest book",
  },
  {
    id: 3,
    title: "animal farm",
    price: 8,
    description: "goerge orell book about socity",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
