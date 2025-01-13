import Reactimg from "../assets/react-core-concepts.png";
import "./Header.css";
const reactDescriptions = ["Fundamental", "Crucial", "Core"];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
  let index = genRandomInt(reactDescriptions.length);
  return (
    <header>
      <img src={Reactimg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {reactDescriptions[index]} React concepts you will need for almost any
        app you are going to build!
      </p>
    </header>
  );
}
