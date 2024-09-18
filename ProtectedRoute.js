// src/Components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('username'); // Check if username exists in localStorage

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
