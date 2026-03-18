require('dotenv').config();
const mongoose = require('mongoose');
const Vehiculo = require('./src/models/vehiculo');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Conectado a MongoDB");
    const vehiculos = await Vehiculo.find();
    console.log(JSON.stringify(vehiculos.map(v => ({
        id: v._id,
        marca: v.marca,
        modelo: v.modelo,
        color: v.color,
        imageFile: v.imageFile
    })), null, 2));
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
