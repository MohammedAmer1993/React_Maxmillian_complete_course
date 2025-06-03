import { useState } from "react";
export default function SearchableList({ items }) {
  const [serchTerm, setSerchTerm] = useState("");
  function handleChange(event) {
    setSerchTerm(event.target.value);
  }

  const searchResult = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(serchTerm.toLowerCase())
  );
  return (
    <div className="searchable-list">
      <input onChange={handleChange} />
      <ul>
        {searchResult.map((item, idx) => (
          <li key={idx}>
            <item>{item.toString()}</item>
          </li>
        ))}
      </ul>
    </div>
  );
}
