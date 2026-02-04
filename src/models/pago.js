const mongoose = require("mongoose");

const pagoSchema = new mongoose.Schema(
  {
    id_venta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venta",
      required: [true, "El ID de la venta es obligatorio"]
    },
    monto: {
      type: Number,
      required: [true, "El monto del pago es obligatorio"],
      min: [0, "El monto no puede ser negativo"]
    },
    fecha_pago: {
      type: Date,
      default: Date.now
    },
    tipo_pago: {
      type: String,
      enum: ["tarjeta", "efectivo", "transferencia", "paypal", "otro"],
      required: [true, "El tipo de pago es obligatorio"]
    },
    estado_pago: {
      type: String,
      enum: ["pendiente", "completado", "fallido", "reembolsado"],
      default: "pendiente"
    }
  },
  {
    timestamps: true
  }
);

// Índices recomendados
//pagoSchema.index({ id_venta: 1 });
//pagoSchema.index({ estado_pago: 1 });
//pagoSchema.index({ tipo_pago: 1 });

module.exports = mongoose.model("Pago", pagoSchema);
