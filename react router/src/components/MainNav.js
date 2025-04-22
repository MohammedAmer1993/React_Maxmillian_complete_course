import { NavLink } from "react-router-dom";
import classes from "./MainNav.module.css";
export default function MainNav() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => {
                return isActive ? classes.active : undefined;
              }}
              end
            >
              products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
