const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es obligatorio"]
    },
    products: [
      {
        vehiculo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehiculo",
          required: true
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1, min: 1 }
      }
    ],
    total: {
      type: Number,
      required: [true, "El total es obligatorio"],
      min: [0, "El total no puede ser negativo"]
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "refunded"],
      default: "pending"
    },
    stripeSessionId: {
      type: String
    },
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      phone: { type: String, required: true }
    }
  },
  {
    timestamps: true
  }
);

// Índices
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ stripeSessionId: 1 });

module.exports = mongoose.model("Order", orderSchema);
