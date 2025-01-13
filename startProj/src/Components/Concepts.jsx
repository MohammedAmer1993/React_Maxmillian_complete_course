import { CORE_CONCEPTS as data } from "../data";
import Concept from "./Concept";

export default function Concepts() {
  return (
    <section id="core-concepts">
      <ul>
        {data.map((concept) => (
          <Concept key={concept.title} {...concept} />
        ))}
      </ul>
    </section>
  );
}
