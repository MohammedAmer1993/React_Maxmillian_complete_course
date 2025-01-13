import Header from "./Components/Header";
import Concepts from "./Components/Concepts";
import Examples from "./Components/Examples";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Concepts></Concepts>
        <Examples></Examples>
      </main>
    </div>
  );
}

export default App;
