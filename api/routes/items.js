const express = require("express");
const router = express.Router();

let items = [];

router.get("/", (req, res) => {
  res.json(items);
});


router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name is required" });
  }

  const newItem = {
    id: Date.now(),
    name
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;