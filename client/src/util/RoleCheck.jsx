import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";

function RoleCheck({ role }) {
    const { user } = useUser();
    
    return (
        <>
            {user && user?.publicMetadata?.role == role ? (
                <Outlet />
            ) : (
                <Navigate to="/" replace />
            )}
        </>
    )
}

export default RoleCheck