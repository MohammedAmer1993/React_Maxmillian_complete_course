import UserFinder from "./components/UserFinder";
import MyContextPro from "./components/UserContext";
import ErrorBoundry from "./components/ErrorBoundry";

function App() {
  return (
    <div>
      <MyContextPro>
        <ErrorBoundry>
          <UserFinder />
        </ErrorBoundry>
      </MyContextPro>
    </div>
  );
}

export default App;
