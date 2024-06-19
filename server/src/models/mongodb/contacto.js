const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const ContactSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  celular: { type: String, required: true },
  city: { type: String, required: true },
  curso: { type: String, required: true },
  message: { type: String, required: true },
},

{
    timestamps: true,
});



module.exports = mongoose.model('Contacto', ContactSchema);