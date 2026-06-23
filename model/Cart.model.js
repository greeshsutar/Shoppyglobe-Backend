import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    // ⚡ CRITICAL FIX: Links this cart entry directly to a specific user account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { 
    // Automatically creates 'createdAt' and 'updatedAt' fields for your records
    timestamps: true 
  }
);

// Ensuring a user cannot create duplicate rows for the same product at the database level
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);