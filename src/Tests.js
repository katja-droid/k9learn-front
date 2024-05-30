import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://k9learn-back.onrender.com/tests')
      .then(response => {
        setTests(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading tests: {error.message}</p>;
  }

  if (tests.length === 0) {
    return <p>No tests available</p>;
  }

  const firstTest = tests[0];

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 mb-3">
        <div className="card" style={{ width: '100%', padding: '20px' }}>
          <div className="card-body text-center"> {/* Added text-center to center all text within card-body */}
            <h5 className="card-title">{firstTest.testName}</h5>
            <img src={firstTest.imageUri} style={{ width: '100%', paddingBottom: '10px' }} alt={firstTest.testName}></img>
            <Link to={`/test/${encodeURIComponent(firstTest._id)}`} className="btn" style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none', marginTop: '10px', width: 'auto' }}>
              Пройти тест
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestList;
