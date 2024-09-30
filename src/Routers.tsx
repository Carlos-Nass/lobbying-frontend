import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './home/Home.tsx';
import { Login } from './login/Login.tsx';
import { Register } from './register/Register.tsx';
import PrivateRoute from './PrivateRouter.tsx';

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