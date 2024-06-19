const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
} = require("../../controller/mongodb/Contacto");

router.get('/contactos', getContacts);
router.get('/contacto/:id', getContactById);
router.post('/contacto', createContact);
router.delete('/contacto/:id', deleteContact);

module.exports = router