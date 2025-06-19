import { useState, useRef } from "react";

export default function SearchableList({ items, children, genKeyFn }) {
  const [serchTerm, setSerchTerm] = useState("");
  const timerRef = useRef();
  function handleChange(event) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setSerchTerm(event.target.value);
    }, 1000);
  }

  const searchResult = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(serchTerm.toLowerCase())
  );
  return (
    <div className="searchable-list">
      <input onChange={handleChange} />
      <ul>
        {searchResult.map((item, idx) => (
          <li key={genKeyFn(item)}>
            <item>{children(item)}</item>
          </li>
        ))}
      </ul>
    </div>
  );
}
