import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './home/Home';
import { Login } from './login/Login';
import { Register } from './register/Register';
import PrivateRoute from './PrivateRouter';

export function Routers() {

    const token = localStorage.getItem('token');
    const isLogged = !!token;

    return (
        <Router>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={isLogged ? <Home /> : <Login />} />
            </Routes>
        </Router>
    )
} 