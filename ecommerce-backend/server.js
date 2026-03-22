const express = require("express");
const cors = require("cors");

const products = require("./data/products");

const app = express();
app.use(require("cors")());

app.use(express.json());

app.get("/api/products", (req, res) => {
    res.json(products); 
});


const categories = [
  ...new Set(
    products
      .flatMap((p) => {
        // Accept both "categories" (array or string) and "category" (string)
        if (Array.isArray(p?.categories)) return p.categories;
        if (typeof p?.categories === "string") return p.categories.split(",");
        if (typeof p?.category === "string") return p.category.split(",");
        return [];
      })
      .map((s) => s.replace(/_/g, " ").trim()) // "Full_Figurine" -> "Full Figurine"
      .filter(Boolean)
  ),
];


app.get("/api/categories", (req, res) => {
    res.json(categories); 
});

app.listen(5000, () => {
    console.log("Backend server running at http://localhost:5000");
});




