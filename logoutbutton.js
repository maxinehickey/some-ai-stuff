import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const logOutUser = () => {
        logout();
        navigate('/');
    };

    return <button onClick={logOutUser}>Logout</button>;
};

export default LogoutButton;
