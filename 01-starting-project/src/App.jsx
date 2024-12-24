import { Component, useState } from "react";
import Header from "./Components/Header.jsx";
import Concept from "./Components/Concept.jsx";
import Tab from "./Components/Tab.jsx";
import { CORE_CONCEPTS as data, EXAMPLES } from "./data.js";

function App() {
  const [content, setContent] = useState("");
  let tabContent = <p>please select topic</p>;
  if (content) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[content].title}</h3>
        <p>{EXAMPLES[content].description}</p>
        <pre>
          <code>{EXAMPLES[content].code}</code>
        </pre>
      </div>
    );
  }
  function viewContent(buttonName) {
    setContent(buttonName);
  }
  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <ul>
            {data.map((concept) => (
              <Concept {...concept} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <Tab
              isSelected={content === "components"}
              onClick={() => viewContent("components")}
            >
              Components
            </Tab>
            <Tab
              isSelected={content === "jsx"}
              onClick={() => viewContent("jsx")}
            >
              JSX
            </Tab>
            <Tab
              isSelected={content === "props"}
              onClick={() => viewContent("props")}
            >
              Props
            </Tab>
            <Tab
              isSelected={content === "state"}
              onClick={() => viewContent("state")}
            >
              State
            </Tab>
          </menu>
        </section>
      </main>
      {tabContent}
    </div>
  );
}

export default App;
