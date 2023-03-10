import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const auth = localStorage.getItem('user');
    if (!auth) {
        return <Navigate to='/login' state={{ from: location }} />
    }
    return children
};

export { RequireAuth };