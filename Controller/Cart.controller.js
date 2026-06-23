const CartModel = require("../model/Cart.model");

// ================= ADD TO CART =================
async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    // validation
    if (!productId || !quantity) {
      return res.status(400).json({
        message: "productId and quantity required",
      });
    }

    // user from JWT
    const userId = req.user.userId;

    const item = await CartModel.create({
      productId,
      quantity,
      userId,
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
}

// ================= UPDATE CART =================
async function updateCart(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await CartModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid ID" });
  }
}

// ================= DELETE CART =================
async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;

    const deleted = await CartModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed from cart ✅" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid ID" });
  }
}

module.exports = {
  addToCart,
  updateCart,
  deleteCartItem,
};