import UserFinder from "./components/UserFinder";
import MyContextPro from "./components/UserContext";

function App() {
  return (
    <div>
      <MyContextPro>
        <UserFinder />
      </MyContextPro>
    </div>
  );
}

export default App;
