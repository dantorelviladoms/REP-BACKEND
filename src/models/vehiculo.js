const mongoose = require("mongoose");

const vehiculoSchema = new mongoose.Schema(
  {
    vin: {
      type: String,
      required: [true, "El número de bastidor (VIN) es obligatorio"],
      unique: true, // 🔹 índice único
      trim: true,
      match: [/^[A-HJ-NPR-Z0-9]{17}$/, "Formato de VIN inválido (17 caracteres alfanuméricos)"]
    },
    marca: {
      type: String,
      required: [true, "La marca es obligatoria"],
      trim: true
    },
    modelo: {
      type: String,
      required: [true, "El modelo es obligatorio"],
      trim: true
    },
    version: {
      type: String,
      trim: true
    },
    año: {
      type: Number,
      required: [true, "El año es obligatorio"],
      min: [1900, "El año no puede ser anterior a 1900"],
      max: [new Date().getFullYear() + 1, "El año no puede ser en el futuro"]
    },
    kilometraje: {
      type: Number,
      required: [true, "El kilometraje es obligatorio"],
      min: [0, "El kilometraje no puede ser negativo"]
    },
    combustible: {
      type: String,
      enum: ["gasolina", "diesel", "híbrido", "eléctrico", "otro"],
      required: [true, "El tipo de combustible es obligatorio"]
    },
    transmision: {
      type: String,
      enum: ["manual", "automática", "semiautomática"],
      required: [true, "El tipo de transmisión es obligatorio"]
    },
    potencia: {
      type: Number,
      min: [0, "La potencia no puede ser negativa"],
      required: [true, "La potencia es obligatoria"]
    },
    plazas: {
      type: Number,
      min: [1, "Debe tener al menos una plaza"],
      max: [9, "No puede tener más de 9 plazas"],
      required: [true, "El número de plazas es obligatorio"]
    },
    color: {
      type: String,
      trim: true
    },
    estado: {
      type: String,
      enum: ["nuevo", "usado", "seminuevo"],
      default: "usado"
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"]
    },
    fecha_publicacion: {
      type: Date,
      default: Date.now
    },
    garantia: {
      type: String,
      enum: ["sí", "no"],
      default: "no"
    }
  },
  {
    timestamps: true
  }
);

// Indices recomendados
//vehiculoSchema.index({ vin: 1 }); 
vehiculoSchema.index({ marca: 1, modelo: 1 }); 
vehiculoSchema.index({ estado: 1 });
vehiculoSchema.index({ precio: 1 });

module.exports = mongoose.model("Vehiculo", vehiculoSchema);
