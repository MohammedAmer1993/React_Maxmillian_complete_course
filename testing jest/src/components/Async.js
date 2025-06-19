import { useEffect, useState } from "react";
export default function Async() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((dat) => {
        if (dat) {
          return dat.json();
        } else {
          throw new Error("some thing is wrong");
        }
      })
      .then((dat) => setPosts(dat))
      .catch((err) => {
        console.log(err.messgae);
      });
  }, []);
  return (
    <ul>
      {posts.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
