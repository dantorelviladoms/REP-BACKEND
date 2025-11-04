const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"]
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,  
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Formato de email inválido"]
    },
    telefono: {
      type: String,
      match: [/^\+?\d{7,15}$/, "Número de teléfono no válido"]
    },
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true, 
      trim: true,
      minlength: [4, "El nombre de usuario debe tener al menos 4 caracteres"]
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    rol: {
      type: String,
      enum: ["admin", "cliente", "vendedor"],
      default: "cliente"
    },
    fechaRegistro: {
      type: Date,
      default: Date.now
    },
    estado: {
      type: String,
      enum: ["activo", "inactivo"],
      default: "activo"
    }
  },
  {
    timestamps: true
  }
);

// Índices adicionales
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

module.exports = mongoose.model("User", userSchema);
