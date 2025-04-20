import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Util from "./components/Utilty/Util";
import Notification from "./components/UI/Notification";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
  const isVisable = useSelector((state) => state.cartUi.isVisable);
  const notification = useSelector((state) => state.cartUi.notification);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {isVisable && <Cart />}
        <Products />
        <Util />
      </Layout>
    </Fragment>
  );
}

export default App;
