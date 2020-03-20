import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ ...props }) {
    return (
        localStorage.getItem('user') ? <Route {...props} /> : <Redirect to="/login" />
        );
}