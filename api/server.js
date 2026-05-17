import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Base de données temporaire
let items = [
  { id: 1, title: "Premier élément" },
];

// Route de test
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API fonctionnelle",
  });
});

// Récupérer les éléments
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Ajouter un élément
app.post("/api/items", (req, res) => {
  const newItem = {
    id: Date.now(),
    title: req.body.title,
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`API démarrée sur le port ${PORT}`);
});