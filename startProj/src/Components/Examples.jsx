import { useState } from "react";
import { EXAMPLES } from "../data";
import Tab from "./Tab";
import Section from "./Section";
import Menu from "./Menu";

export default function Examples() {
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
    <Section id="examples" title="Examples">
      <Menu content={tabContent}>
        <Tab
          isSelected={content === "components"}
          onClick={() => viewContent("components")}
        >
          Components
        </Tab>
        <Tab isSelected={content === "jsx"} onClick={() => viewContent("jsx")}>
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
      </Menu>
    </Section>
  );
}
