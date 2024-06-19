import React, { useEffect } from "react";
import { useUsersContext } from "../../hooks/UsersContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AccessProfil({ allowedRoles, children }) {
  const { usersContext } = useUsersContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allowedRoles.includes(usersContext.role)) {
      Swal.fire({
        position: "top",
        icon: "info",
        title: "No está autorizado para trabajar en esta sección",
        showConfirmButton: false,
        timer: 3500,
      });
      navigate(`/`);
    }
  }, [allowedRoles, usersContext.role, navigate]);

  return allowedRoles.includes(usersContext.role) ? children : null;
}

export default AccessProfil;