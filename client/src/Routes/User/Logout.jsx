// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUsersContext } from '../../hooks/UsersContext';

// import Swal from 'sweetalert2';

// import { useFetch } from '../../hooks/useFetch';

// function Logout() {
// 	const navigate = useNavigate();
// 	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
// 	const url = `${hostServer}/api/v3/user/logout`;
// 	const { setUsersContext } = useUsersContext();

// 	let { data, isLoading = false, createData } = useFetch(null);

// 	const salir = async () => {
// 		const result = await createData(url)
// 		if (result?.status === 200) {
// 			Swal.fire({
// 				position: 'top',
// 				icon: 'success',
// 				title: data?.data.message,
// 				showConfirmButton: false,
// 				timer: 3500,
// 			});
// 			setUsersContext([]);
// 			navigate('/');
// 			window.location.reload(true);
// 		} else {
// 			Swal.fire({
// 				position: 'top',
// 				icon: 'info',
// 				title: 'Debes corregir la información para loguearse',
// 				showConfirmButton: false,
// 				timer: 5000,
// 			});
// 		}
// 	};

// 	useEffect(() => {
// 		salir();
// 	}, []);
// 	return <div className="h-full" />;
// }

// export default Logout;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '../../hooks/UsersContext';
import Swal from 'sweetalert2';
import { useFetch } from '../../hooks/useFetch';

function Logout() {
  const navigate = useNavigate();
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const url = `${hostServer}/api/v3/user/logout`;
  const { setUsersContext } = useUsersContext();

  const { data, isLoading, createData, error } = useFetch();

  const salir = async () => {
    const result = await createData(url); // Utilizar createData para el método POST
    if (result?.status === 200) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: result.data.message,
        showConfirmButton: false,
        timer: 3500,
      });
      setUsersContext([]);
      navigate('/login');
    } else {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Debes corregir la información para loguearse',
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  useEffect(() => {
    salir();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="h-full" />;
}

export default Logout;
