import React from 'react';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from './AuthorizationContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setIsAuthorized} = useAuthorization();

    const handleLoginSuccess = (route) => {
        setIsAuthorized(true);
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
                        <CenteredImage imageUrl="/logo_lg.png" />
                        <h3 className="mb-4 fw-bold text-center">Будь ласка авторизуйтесь щоб отримати доступ до курсів</h3>
                        <Login onLoginSuccess={handleLoginSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
