import { Link } from "react-router-dom";
export const products = [
  { id: 1, title: "harry potter" },
  { id: 2, title: "alckmist" },
  { id: 3, title: "zoro" },
];
export default function Products() {
  return (
    <div>
      <h1>Products page</h1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            <Link to={`${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
