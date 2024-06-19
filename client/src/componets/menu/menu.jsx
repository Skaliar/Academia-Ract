
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css"; // Archivo CSS donde definiremos los estilos
import { useUsersContext } from "../../hooks/UsersContext";


function MenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const { usersContext } = useUsersContext();
  const log = usersContext.role

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <div className="menuItem">
      <div onClick={handleToggle} className="menuItemTitle">
        <Link to={item.route}>{item.title}</Link>
      </div>
      {isOpen && item.subItems.length > 0 && (
        <ul className="submenu">
          {item.subItems.map((subItem) => {
            if(subItem.roles.length === 0 ||
              subItem.roles.includes(usersContext.role)
            ){
              return(
                <li key={subItem.title} className="submenuItem">
                  <Link to={subItem.route}>{subItem.title}</Link>
                </li>
              )
            }
            return null
          })}
        </ul>
      )}
    </div>
  )
}

function Menu() {
  const { usersContext } = useUsersContext();

  const menuItems = [
    {
      title: "Home",
      route: "/",
      subItems: [],
      roles: [],
    },
    {
      title: "Administración",
      subItems: [
        { title: "Gestión de Cursos", route: "/cursos",roles: [ "isStudent"], },
        { title: "Gestión de Estudiante", route: "/students",roles: [], },
        { title: "Gestión de Profesores", route: "/teachers",roles: [], },
        { title: "Matriculación de Cursos", route: "/matricula",roles: ["isStudent", "isAdmin"]},
        { title: "Usuarios", route: "/users",roles: [], },
        { title: "Contactos", route: "/contact",roles: [], },
      ],
      roles: ["isAdmin", "isTeacher"], 
    },
    {
      title: "Cursos",
      route: "/vecurso",
      subItems: [],
      roles: [],
         
    },
    {
      title: "Cursos Activos",
      route: "/vecursomatricula",
      subItems: [],
      roles: [],
    },
    {
      title: "Accesos",
      subItems: [
        { title: "Inicio Sesión", route: "/login",roles: [], },
        { title: "Cambio de Clave", route: "/cambioClave",roles: ["isAdmin", "isStudent", "isTeacher"], },
        { title: "Salir", route: "/logout",roles: ["isAdmin", "isStudent", "isTeacher"], },
      ],
      roles: [], 
    },
  ];

  return (
    <div className="menu">
      {menuItems.map((item) => {
        if (item.roles.length === 0 || item.roles.includes(usersContext.role)) {
          return (
            <MenuItem
              key={item.title}
              item={{
                ...item,
                subItems: item.subItems.filter(
                  (subItem) =>
                    !(
                      usersContext.isLoggedIn &&( 
                      subItem.title === "Inicio Sesión"
                    ))
                ),
              }}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default Menu;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./menu.css"; // Archivo CSS donde definiremos los estilos
// import { useUsersContext } from "../../hooks/UsersContext";

// function MenuItem({ item }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const { usersContext } = useUsersContext();

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="menuItem">
//       <div onClick={handleToggle} className="menuItemTitle">
//         <Link to={item.route}>{item.title}</Link>
//       </div>
//       {isOpen && item.subItems.length > 0 && (
//         <ul className="submenu">
//           {item.subItems.map((subItem) => {
//             if (subItem.roles.length === 0 || subItem.roles.includes(usersContext.role)) {
//               return (
//                 <li key={subItem.title} className="submenuItem">
//                   <Link to={subItem.route}>{subItem.title}</Link>
//                 </li>
//               );
//             }
//             return null;
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

// function Menu() {
//   const { usersContext } = useUsersContext();

//   const menuItems = [
//     {
//       title: "Home",
//       route: "/",
//       subItems: [],
//       roles: [],
//     },
//     {
//       title: "Administración",
//       subItems: [
//         { title: "Gestión de Cursos", route: "/cursos", roles: ["isStudent",] },
//         { title: "Gestión de Estudiantes", route: "/students", roles: [] },
//         { title: "Gestión de Profesores", route: "/teachers", roles: [] },
//         { title: "Matriculación de Cursos", route: "/matricula", roles: ["isStudent", "isAdmin"] },
//         { title: "Usuarios", route: "/users", roles: [] },
//         { title: "Contactos", route: "/contact", roles: [] },
//       ],
//       roles: ["isAdmin", "isTeacher" ],
//     },
//     {
//       title: "Cursos",
//       route: "/vecurso",
//       subItems: [],
//       roles: [], // Visible para todos
//     },
//     {
//       title: "Cursos Activos",
//       route: "/vecursomatricula",
//       subItems: [],
//       roles: [], // Visible para todos
//     },
//     {
//       title: "Accesos",
//       subItems: [
//         { title: "Inicio Sesión", route: "/login", roles: [] },
//         { title: "Cambio de Clave", route: "/cambioClave", roles: ["isAdmin", "isStudent", "isTeacher"] },
//         { title: "Salir", route: "/logout", roles: ["isAdmin", "isStudent", "isTeacher"] },
//       ],
//       roles: [],
//     },
//   ];

//   return (
//     <div className="menu">
//       {menuItems.map((item) => {
//         if (item.title === "Cursos" || item.roles.length === 0) 
//           return (
//             <MenuItem
//               key={item.title}
//               item={{
//                 ...item,
//                 subItems: item.subItems.filter(
//                   (subItem) => (!usersContext.isLoggedIn || subItem.title === "Inicio Sesión")
//                 ),
//               }}
//             />
//           );
//       })}
//     </div>
//   );
// }

// export default Menu;