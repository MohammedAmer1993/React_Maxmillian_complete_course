import Accordion from "./components/accordion/Accordion";
import SearchableList from "./components/SearchableList/SearchableList";
import { PLACES } from "./PLACES";

function App() {
  return (
    <main>
      <section>
        <h2>what's good about working with us?</h2>
        <Accordion className="accordion">
          <Accordion.item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              we got 20 years of experience
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>you can&apost;t go wrong with us</p>
                <p>
                  we are in the business of planing highly individualized
                  vacation trips for more than 20 years
                </p>
              </article>
            </Accordion.Content>
          </Accordion.item>
          <Accordion.item id="guides" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              we are working with local guides
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>we are not doint this alone from our office</p>
                <p>
                  we are doing this with local guides to provide you beatiful
                  experience
                </p>
              </article>
            </Accordion.Content>
          </Accordion.item>
        </Accordion>
      </section>
      <section>
        <SearchableList items={PLACES} />
        <SearchableList items={["item1", "item2", "item3", "item4", "item5"]} />
      </section>
    </main>
  );
}

export default App;
