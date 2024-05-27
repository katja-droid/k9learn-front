import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

function UserCourses() {
  const { currentUser } = useAuthorization();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch the courses by their IDs
        const response = await axios.post('http://localhost:5001/courses/by-ids', {
          courseIds: currentUser.courses
        });
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  });

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Мої курси</h1>
      <div className="row mb-3">
        {/* Add search and filter inputs here if needed */}
      </div>
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.courseName}</h5>
                <img src={course.imageUri} style={{ width: '100%', paddingBottom: '10px'}}></img>
                <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="btn" style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}}>Детальніше</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCourses;
