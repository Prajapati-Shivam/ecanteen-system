import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";

function AdminRoute() {
    const { user } = useUser();
    
    return (
        <>
            {user && user?.publicMetadata?.role == 'admin' ? (
                <Outlet />
            ) : (
                <Navigate to="/" replace />
            )}
        </>
    )
}

export default AdminRoute