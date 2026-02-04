const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema(
  {
    id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del usuario es obligatorio"]
    },
    id_producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehiculo",
      required: [true, "El ID del vehículo es obligatorio"]
    },
    metodo_pago: {
      type: String,
      enum: ["tarjeta", "efectivo", "transferencia", "paypal", "otro"],
      required: [true, "El método de pago es obligatorio"]
    },
    estado: {
      type: String,
      enum: ["pendiente", "completada", "cancelada", "reembolsada"],
      default: "pendiente"
    },
    fecha_venta: {
      type: Date,
      default: Date.now
    },
    precio_final: {
      type: Number,
      required: [true, "El precio final es obligatorio"],
      min: [0, "El precio no puede ser negativo"]
    }
  },
  {
    timestamps: true
  }
);

// Índices recomendados
//ventaSchema.index({ id_usuario: 1 });
//ventaSchema.index({ id_producto: 1 });
//ventaSchema.index({ estado: 1 });

module.exports = mongoose.model("Venta", ventaSchema);
