import React from 'react';
import Register from './Register'; // Import your Register component
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegisterSuccess = (route) => {
        navigate(route);
    };

    const CenteredImage = ({ imageUrl, altText }) => (
        <div className="text-center mb-4">
            <img src={imageUrl} style={{ padding: '20px', paddingTop: '40px' }} className="img-fluid" alt={altText} />
        </div>
    );

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="col-md-6">
                    <div className="card">
                        <CenteredImage imageUrl="/logo_lg.png" altText="Logo" />
                        <h3 className="mb-4 fw-bold text-center">Будь ласка зареєструйтесь щоб отримати доступ до курсів</h3>
                        <Register onRegisterSuccess={handleRegisterSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
