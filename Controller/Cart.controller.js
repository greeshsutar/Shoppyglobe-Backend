const CartModel = require("../model/Cart.model");

async function cartdata(req, res){
  const product = await CartModel.create(req.body);
  res.send(product);
};

async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Cart.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.send({ message: "Item removed from cart ✅" });

  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Invalid ID" });
  }
}