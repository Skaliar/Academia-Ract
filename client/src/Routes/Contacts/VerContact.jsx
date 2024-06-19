import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";

import Swal from "sweetalert2";
import { useAppContext } from "../../hooks/appContext";
import validationSchema from "../../componets/services/validationSchema";
import "../../home.css";

export default function VerContact({ contact }) {
    const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
    const { HandleNivelClose } = useAppContext();
    const api = `${hostServer}/api/v3/contacto`;
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(false);
    const initialForm = {
        id: contact ? contact.id : "",
        nombre: contact ? contact.nombre : "",
        email: contact ? contact.email : "",
        celular: contact ? contact.celular : "",
        city: contact ? contact.city : "",
        curso: contact ? contact.curso : "",
        message: contact ? contact.message : "",
    }

    let { formData, onInputChange, validateForm, errorsInput, clearForm } =
    useForm(initialForm, validationSchema);

    const { id, nombre, email, celular, curso, message, city } = formData;

    let {
        data,
        isLoading = false,
        getData,
        createData,
        updateData,
      } = useFetch(null);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const numError = validateForm();
        formData = { ...formData};
        handleInputChange();
        if (!numError) {
          let url = `${api}`;
          if (!edit) {
            await createData(url, formData);
          } else {
            await updateData(url, contact._id, formData);
          }
        } else {
          Swal.fire({
            position: "top",
            icon: "info",
            title: "Debes corregir la información para poder registrarla",
            showConfirmButton: false,
            timer: 5000,
          });
        }
      };

      useEffect(() => {
        if (data?.message) {
          data?.message &&
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: data?.message,
              showConfirmButton: false,
              timer: 3500,
            });
        } else {
          if (data?.status === 200 || data?.status === 201) {
            data?.data.message &&
              Swal.fire({
                position: "top",
                icon: "success",
                title: data?.data?.message,
                showConfirmButton: false,
                timer: 3500,
              });
          } else {
            data?.data.message &&
              Swal.fire({
                position: "top",
                icon: "warning",
                title: data?.data?.message,
                showConfirmButton: false,
                timer: 3500,
              });
          }
          if (data?.status === 200) {
            HandleNivelClose();
            riviewList();
          }
          if (data?.status === 201) {
            clearForm();
            riviewList();
          }
        }
      }, [data]);

      return (
        <>
          {
            error ? (
              errorMessage()
            ) : (
              <div className="container py-3 px-5">
                <form onSubmit={handleSubmit}>
                  <section className="contactVerSection">
                    <aside className="px-2">
                      <div className="row  mb-2">
                        <div className="form-group col-md-12">
                          <label className="title-camp">Usuario </label>
                          <br />
                          <label className="detail-camp">{nombre} </label>
                        </div>
                      </div>
                      <div className="row  mb-2">
                        <div className="form-group col-md-12">
                          <label className="title-camp">
                            Email{" "}
                          </label>
                          <br />
                          <label className="detail-camp"> {email} </label>
                        </div>
                      </div>
    
                      <div className="row  mb-2">
                        <div className="form-group col-md-12">
                          <label className="title-camp">Celular</label>
                          <br />
                          <label className="detail-camp">{celular} </label>
                        </div>
                      </div>
    
                      <div className="row  mb-2">
                        <div className="form-group col-md-12">
                          <label className="title-camp">
                            Curso
                          </label>
                          <br />
                          <label className="detail-camp">{curso}</label>
                        </div>
                      </div>
                      <div className="row  mb-2">
                        <label className="title-camp">
                          Ciudad
                        </label>
                        <br />
                        <label className="detail-camp">{city}</label>
                      </div>
                    </aside>
                    <aside>
                      <div className="form-group col-md-12">
                        <div className="form-group col-md-12">
                          <label className="title-camp">
                            Mensaje:
                          </label>
                          <textarea
                            rows={20}
                            type="text"
                            className="form-control"
                            name="descripcion"
                            placeholder="Indique los detalles del curso"
                            value={message}
                            readOnly
                          />
                        </div>
                      </div>
                    </aside>
                  </section>
                  {/* <div className="mt-2 flex items-center">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                      {imageCourse ? (
                        <img
                          src={URL.createObjectURL(imageCourse)}
                          alt="file"
                          className="upLoadImg"
                        />
                      ) : (
                        <img
                          src={`${hostServer}${urlImageCourse}`}
                          alt="file"
                          className="upLoadImg"
                        />
                      )}
                    </span>
                  </div> */}
                </form>
              </div>
            )
          }
        </>
      );
}