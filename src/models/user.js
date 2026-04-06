const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    },
    refreshToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Este es el hook para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // solo si la contraseña es nueva o cambiada
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Método para comparar contraseñas en el login
userSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model("User", userSchema);
