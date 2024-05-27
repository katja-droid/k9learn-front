import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from './AuthorizationContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const { setIsAuthorized } = useAuthorization();
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsAuthorized(false);
        navigate('/');
    };
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/usercourses"><img src="/logo.png" alt="Logo" /></Link>
                <button className="navbar-toggler" type="button" style={{ backgroundColor: '#ffd24a', color: 'black' }} data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/searchfriends"  style={{ color: 'white'}}>Знайти друзів</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/friends"  style={{ color: 'white'}}>Мої друзі</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/leaderboard"  style={{ color: 'white'}}>Лідерборд</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/courses"  style={{ color: 'white'}}>Курси</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usercourses"  style={{ color: 'white'}}>Мої курси</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/articles"  style={{ color: 'white'}}>Статті</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news"  style={{ color: 'white'}}>Новини</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about"  style={{ color: 'white'}}>Тест</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn" style={{ backgroundColor: '#ffd24a', color: 'black' }} onClick={handleLogout}>Вийти</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};



export default Navbar;
