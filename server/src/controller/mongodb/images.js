
// 

// const db = require("../../config/configMongoDB");
// const CoursesImgs = db.coursesImgs; // Asegúrate de que este es el modelo correcto de Mongoose
// const fs = require('fs');
// const path = require('path');

// /*********************** Sección de manejo de CoursesImgs ***************** */

// exports.getCourseImgs = async (req, res) => {
//   let page = req.query.page ? parseInt(req.query.page) - 1 : 0;
//   page = page < 0 ? 0 : page;
//   let limit = parseInt(req.query.limit || 10);
//   limit = limit < 0 ? 10 : limit;
//   const offset = page * limit;

//   try {
//     const data = await CoursesImgs.find({
//       name: { $regex: req.query.sch, $options: "i" }
//     }).skip(offset).limit(limit);

//     const total = await CoursesImgs.countDocuments({
//       name: { $regex: req.query.sch, $options: "i" }
//     });

//     const response = { totalItems: total, data, currentPage: page + 1, totalPages: Math.ceil(total / limit) };
//     res.status(200).json({
//       status: "200",
//       message: "Información Registrada...",
//       CoursesImgs: response,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: err.message || "No hay Información Registrada..",
//     });
//   }
// };

// const CourseImg = (req, res) => {
//   let filePath = "";
//   if (req.file) {
//     filePath = `/imagens/Courses/${req.file.filename}`;
//   }
//   res.send({
//     status: "200",
//     message: `Imagen agregada..`,
//     urlImage: filePath,
//   });
// };

// const createCourseImg = async (req, res) => {
//   const filename = req.file.filename;
//   const existeCourse = await CoursesImgs.findOne({
//     codCourse: req.body.codCourse,
//     name: filename
//   });

//   if (existeCourse) {
//     return res.status(400).json({
//       status: "403",
//       message: "La imagen ya fue ingresada",
//     });
//   }

//   let filePath = null;
//   if (req.file) {
//     filePath = `/imagens/Courses/${filename}`;
//   }

//   const newItem = new CoursesImgs({
//     codCourse: req.body.codCourse,
//     name: filename,
//     url: filePath,
//   });

//   try {
//     await newItem.save();
//     res.status(200).json({
//       status: "200",
//       message: `Imagen agregada..`,
//       CourseImg: newItem,
//     });
//   } catch (error) {
//     res.status(400).json({ status: "409", message: error.message });
//   }
// };

// exports.getCourseImg = async (req, res) => {
//   try {
//     const existeCourse = await CoursesImgs.findById(req.params.id);

//     if (!existeCourse) {
//       return res.status(400).json({
//         status: "403",
//         message: "El ID no está registrado",
//       });
//     }

//     res.status(200).json({ status: "200", Course: existeCourse });
//   } catch (error) {
//     res.status(500).json({
//       status: "500",
//       message: error.message,
//     });
//   }
// };

// exports.getCourseImages = async (req, res) => {
//   try {
//     const existeCourse = await CoursesImgs.find({
//       codCourse: req.params.id,
//     });

//     if (!existeCourse.length) {
//       return res.status(200).json({
//         status: "403",
//         message: "El ID no está registrado",
//       });
//     }

//     res.status(200).json({ status: "200", CourseImgs: existeCourse });
//   } catch (error) {
//     res.status(500).json({
//       status: "500",
//       message: error.message,
//     });
//   }
// };

// exports.updateCourseImg = async (req, res) => {
//   try {
//     const item = await CoursesImgs.findById(req.params.id);

//     if (item) {
//       const updatedData = {
//         description: req.body.description,
//         place: req.body.place,
//         type: req.body.type,
//       };

//       const updatedItem = await item.updateOne(updatedData);

//       res.status(200).json({
//         status: "200",
//         CourseImg: updatedItem,
//         message: "Registro de Imagen Actualizado",
//       });
//     } else {
//       res.status(404).json({
//         status: "404",
//         message: "Imagen no encontrada",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       status: "500",
//       message: err.message,
//     });
//   }
// };

// exports.deleteCourseImg = async (req, res) => {
//   try {
//     const existeCourse = await CoursesImgs.findById(req.params.id);

//     if (!existeCourse) {
//       return res.status(400).json({
//         status: "403",
//         message: "El ID no está registrado",
//       });
//     }

//     await CoursesImgs.deleteOne({ _id: req.params.id });

//     const data = await CoursesImgs.find({
//       codCourse: existeCourse.codCourse,
//     });

//     res.status(200).json({
//       status: "200",
//       CourseImg: data,
//       message: "Imagen Eliminada.",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "400",
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   createCourseImg,
//   CourseImg,
// };

// const Image = require('../models/Image');
const Course = require("../../models/mongodb/courses");

const uploadImage = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      contentType: req.file.mimetype
    });

    await newImage.save();

    course.urlImagen = newImage.path;
    await course.save();

    res.status(201).json({ message: 'Imagen subida y asociada al curso exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadImage
};