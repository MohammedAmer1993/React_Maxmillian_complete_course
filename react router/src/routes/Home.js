import { Link, Outlet } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <Outlet />
      <h1>Home page</h1>
      <Link to="/products">products</Link>
    </div>
  );
}
