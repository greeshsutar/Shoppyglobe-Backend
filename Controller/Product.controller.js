const Product = require("../model/Product.model");
const axios = require("axios");

// ================= SAVE PRODUCTS =================
async function saveProducts(req, res) {
  try {
    // Optional: prevent duplicate insert
    const existing = await Product.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ message: "Products already exist in DB" });
    }

    const response = await axios.get("https://dummyjson.com/products");

    const products = response.data.products;

    const formatted = products.map((item) => ({
      name: item.title,
      price: item.price,
      description: item.description,
      image: item.thumbnail,
      category: item.category,
      stock: item.stock,
    }));

    await Product.insertMany(formatted);

    res.status(201).json({ message: "Products saved to DB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving products" });
  }
}

// ================= GET ALL PRODUCTS =================
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

// ================= GET PRODUCT BY ID =================
async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid product ID" });
  }
}

module.exports = {
  saveProducts,
  getProducts,
  getProductById,
};