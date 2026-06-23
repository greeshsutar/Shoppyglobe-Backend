import express from "express";

import { authMiddleware } from "../auth/authenticationmiddlware.js";

import { getCart, addToCart, updateCart, deleteCartItem } from "../Controller/Cart.controller.js";
import { getProducts, getProductById, saveProducts } from "../Controller/Product.controller.js";
import { signup, login } from "../Controller/User.controller.js";

const router = express.Router();

// ================= PRODUCTS ROUTES =================
router.post("/products/seed", saveProducts);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

// ================= USER ROUTES =================
router.post("/register", signup);
router.post("/login", login);

// ================= CART ROUTES (PROTECTED) =================
router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.put("/cart/:id", authMiddleware, updateCart);
router.delete("/cart/:id", authMiddleware, deleteCartItem);

export default router;