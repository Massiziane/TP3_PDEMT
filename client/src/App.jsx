import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Charger les éléments
  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  // Ajouter un élément
  const addItem = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newItem = await response.json();

    setItems([...items, newItem]);
    setTitle("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>TP3 Docker Compose</h1>

      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Nouvel élément"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;