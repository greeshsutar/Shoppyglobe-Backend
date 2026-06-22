const ProductModel = require("../model/Product.model");

const axios = require("axios");
const Product = require("./models/Product");

async function saveProducts(req, res) {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    const products = response.data.products;

    // map API data → your schema
    const formatted = products.map((item) => ({
      name: item.title,
      price: item.price,
      description: item.description,
      image: item.thumbnail,
      category: item.category,
      stock: item.stock
    }));

    await Product.insertMany(formatted);

    res.send({ message: "Products saved to DB" });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error saving products" });
  }
}


async function getProducts(req, res) {
  try {
    const products = await Product.find();

    res.status(200).send(products); // sends array of objects
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching products" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    // if not found
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);

  } catch (err) {
    console.error(err);

    // invalid ObjectId error
    res.status(400).send({ message: "Invalid product ID" });
  }
}