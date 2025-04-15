import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
  const authrized = useSelector((state) => state.auth.isLogged);
  return (
    <Fragment>
      {authrized && <Header />}
      {authrized && <UserProfile />}
      {!authrized && <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
