import { Outlet, Navigate } from 'react-router-dom';

function RoleCheck({ role }) {
  const storedRole = localStorage.getItem('role');

  return storedRole === role ? <Outlet /> : <Navigate to='/' replace />;
}

export default RoleCheck;
