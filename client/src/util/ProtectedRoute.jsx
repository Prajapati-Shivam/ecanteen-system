import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";

function ProtectedRoute() {
    const { isSignedIn, isLoaded } = useUser();
    
    if(!isLoaded){
        return <div style={{ textAlign: 'center', paddingTop: '2rem' }}>Verifying session...</div>
    }
    return (
        <>
            {isSignedIn ? (
                <Outlet />
            ) : (
                <Navigate to="/" replace />
            )}
        </>
    )
}

export default ProtectedRoute