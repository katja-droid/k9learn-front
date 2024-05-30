import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

function UserCourses() {
  const { currentUser, setCurrentUser } = useAuthorization();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdatedUserAndCourses = async () => {
      try {
        // Fetch the updated user data
        const userResponse = await axios.get(`http://localhost:5001/users/${currentUser._id}`);
        const updatedUser = userResponse.data;
        setCurrentUser(updatedUser);

        // Fetch the courses by their IDs
        const coursesResponse = await axios.post('http://localhost:5001/courses/by-ids', {
          courseIds: updatedUser.courses
        });

        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCourses([]);  // Handle the "No courses found" case
        } else {
          setError(error);
        }
        setLoading(false);
      }
    };

    fetchUpdatedUserAndCourses();
  }, [currentUser._id, setCurrentUser]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>Помилка: {error.response ? error.response.data.message : error.message}</div>;
  }

  if (courses.length === 0) {
    return <div className="container mt-5">
    <h1>Мої курси</h1><div>Курсів не знайдено</div></div>;
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
                <img src={course.imageUri} style={{ width: '100%', paddingBottom: '10px' }} alt={course.courseName}></img>
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
