const Contact = require("../../models/mongodb/contacto");

const getContacts = async(req, res) => {
    try {
        await Contact.find().then((data) => {
            res.status(200).json({ data: data, message: "Consulta exitosa" });
            return;
        })
    } catch (error) {
        res.status(500).json({message: error.message})      
    }
}

const getContactById = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el contacto' });
    }
  };
  
  // const createContact = async (req, res) => {
  //   try {
  //     const newContact = new Contact(req.body);
  //     await newContact.save();
  //     res.status(201).json({ message: 'Contacto creado correctamente' });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error al crear el contacto' });
  //   }
  // };

  const createContact = async (req, res) => {
    try {
      console.log('Datos recibidos:', req.body); // Agregar este log para depurar
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).json({ message: 'Contacto creado correctamente' });
    } catch (error) {
      console.error('Error al crear el contacto:', error); // Agregar este log para depurar
      res.status(500).json({ message: 'Error al crear el contacto', error });
    }
  };
  
  const deleteContact = async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) return res.status(404).json({ message: 'Contacto no encontrado' });
      res.status(200).json({ message: 'Contacto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el contacto' });
    }
  };

  module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
  };