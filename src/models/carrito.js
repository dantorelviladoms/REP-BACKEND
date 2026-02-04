const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema(
    {
        id_usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El ID del usuario es obligatorio"]
        },
        id_vehiculo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehiculo",
            required: [true, "El ID del vehículo es obligatorio"]
        },
        cantidad: {
            type: Number,
            default: 1,
            min: [1, "La cantidad mínima es 1"]
        },
        fecha_agregado: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Índice compuesto para evitar duplicados del mismo vehículo para un usuario
carritoSchema.index({ id_usuario: 1, id_vehiculo: 1 }, { unique: true });

module.exports = mongoose.model("Carrito", carritoSchema);
