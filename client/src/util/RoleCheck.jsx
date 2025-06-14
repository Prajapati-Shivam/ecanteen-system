import { useUser } from '@clerk/clerk-react';
import { Outlet, Navigate } from 'react-router-dom';

function RoleCheck({ role }) {
  const { user } = useUser();

  const userRole = user?.publicMetadata?.role;

  return <>{userRole === role ? <Outlet /> : <Navigate to='/' replace />}</>;
}

export default RoleCheck;
