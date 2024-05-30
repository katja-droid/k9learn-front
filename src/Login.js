import React, { useState } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';
import { Link } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const { login } = useAuthorization();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://k9learn-back.onrender.com/login', { email, password });
            const userData = response.data.user;
            login(userData);
            onLoginSuccess('/usercourses');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="container mt-5" style={{ padding: '3vw' }}>
            <h2 className="text-center mb-4" style={{ width: '100%', fontSize: '1.5em' }}>Авторизація</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Пароль:</label>
                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin} style={{ width: '100%', fontSize: '1.6em',backgroundColor: '#ffd24a', color: 'black', border: 'none', padding: '10px' }}>Увійти</button>
            <div className="text-center mt-3">
                <p>Ще немає акаунта? <Link to="/register">Зареєструватися</Link></p>
            </div>
        </div>
    );
};

export default Login;
