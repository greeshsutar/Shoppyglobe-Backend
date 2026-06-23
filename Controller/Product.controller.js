import Product from "../model/Product.model.js"; 
import axios from "axios";

// ================= SAVE PRODUCTS =================
export async function saveProducts(req, res) {
  try {
    const existing = await Product.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ message: "Products already exist in DB" });
    }

    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;

    const formatted = products.map((item) => {
      // ⚡ FIX: Fallback to the first element of images array if thumbnail is broken or truncated
      let imageUrl = item.thumbnail;
      if (!imageUrl && item.images && item.images.length > 0) {
        imageUrl = item.images[0];
      }

      // ⚡ CLEANUP: If there is a hidden truncation char, reconstruct the string cleanly
      if (imageUrl && (imageUrl.includes("…") || imageUrl.includes("..."))) {
        const cleanTitle = encodeURIComponent(item.title);
        imageUrl = `https://cdn.dummyjson.com/products/images/${item.category}/${cleanTitle}/thumbnail.png`;
      }

      return {
        name: item.title, 
        price: item.price,
        description: item.description,
        image: imageUrl || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500", // Safe generic baseline fallback
        category: item.category,
        stock: item.stock,
      };
    });

    await Product.insertMany(formatted);

    res.status(201).json({ message: "Products saved to DB" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving products" });
  }
}

// ================= GET ALL PRODUCTS =================
export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
}

// ================= GET PRODUCT BY ID =================
export async function getProductById(req, res) {
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