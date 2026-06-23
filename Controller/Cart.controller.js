import CartModel from "../model/Cart.model.js";
import Product from "../model/Product.model.js";

// ================= GET CART =================
export async function getCart(req, res) {
  try {
    const items = await CartModel.find({ userId: req.user.id }).populate("productId");
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
}

// ================= ADD TO CART =================
export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "productId and quantity required" });
    }

    // ⚡ Validate product exists before adding to cart
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userId = req.user.id;

    let existingItem = await CartModel.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += Number(quantity) || 1;
      await existingItem.save();
    } else {
      existingItem = await CartModel.create({
        productId,
        quantity: Number(quantity) || 1,
        userId,
      });
    }

    const populatedItem = await CartModel.findById(existingItem._id).populate("productId");
    res.status(201).json(populatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
}

// ================= UPDATE CART =================
export async function updateCart(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await CartModel.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { quantity: Number(quantity) },
      { new: true }
    ).populate("productId");

    if (!updated) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid ID or bad request data" });
  }
}

// ================= DELETE CART =================
export async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;

    const deleted = await CartModel.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed from cart ✅" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid ID" });
  }
}