// import React, { createContext, useContext, useRef, useState } from "react";

// const UsersContext = createContext();



// export const UsersProvider = ({ children }) => {
//   const [usersContext, setUsersContext] = useState([]);


//   return (
//     <UsersContext.Provider value={{ usersContext, setUsersContext}}>
//       {children}
//     </UsersContext.Provider>
//   );
// };
// export const useUsersContext = () => {
//   return useContext(UsersContext);
// };
import React, { createContext, useContext, useRef, useState } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
const [usersContext, setUsersContext] = useState([]);

return (
<UsersContext.Provider value={{ usersContext, setUsersContext}}>
{children}
</UsersContext.Provider>
);
};
export const useUsersContext = () => {
return useContext(UsersContext);
};

console.log("UsersContext:", UsersContext.value);


