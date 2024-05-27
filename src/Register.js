import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link } from 'react-router-dom';

const Register = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Make a POST request to your register endpoint
      const response = await axios.post('http://localhost:5001/users', { email, password, nickname });
      
      // Assuming successful registration returns user data
      const userData = response.data.user;

      // Redirect to the desired page upon successful registration
      onRegisterSuccess('/login');
    } catch (error) {
      // Handle error responses from the server
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ padding: '3vw' }}>
      <h2 className="text-center mb-4" style={{ width: '100%', fontSize: '1.5em' }}>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="nickname" className="form-label">Нікнейм:</label>
        <input type="nickname" id="nickname" className="form-control" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Пароль:</label>
        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister} className="btn btn-primary" style={{ width: '100%', fontSize: '1.6em',backgroundColor: '#ffd24a', color: 'black', border: 'none', padding: '10px' }}>Register</button>
      <div className="text-center mt-3">
                <p>Вже є акаунт? <Link to="/login">Увійти</Link></p>
            </div>
    </div>
  );
};

export default Register;
