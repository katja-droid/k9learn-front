import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [enrolling, setEnrolling] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser } = useAuthorization();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const enrollInCourse = async (courseId) => {
    if (!currentUser) {
      setError('Користувач не авторизований.');
      return;
    }

    setEnrolling(courseId);
    setError(null);

    try {
      await axios.post(`http://localhost:5001/users/${currentUser._id}/courses`, { courseId });
      // Update the current user data with the new course
      const updatedUserResponse = await axios.get(`http://localhost:5001/users/${currentUser._id}`);
      setCurrentUser(updatedUserResponse.data);
      setEnrolling(null);
      alert('Курс успішно додано!');
    } catch (error) {
      setError(error.message);
      setEnrolling(null);
    }
  };

  const filteredCourses = courses.filter(course => {
    if (searchTerm && !course.courseName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (languageFilter && course.language !== languageFilter) {
      return false;
    }
    if (levelFilter && course.level !== levelFilter) {
      return false;
    }
    return true;
  });

  const isCourseEnrolled = (courseId) => {
    return currentUser && currentUser.courses.includes(courseId);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Доступні курси</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Введіть пошуковий запит..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ul className="list-group">
        {filteredCourses.map((course, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {course.courseName}
            <button
              className="btn"
              style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none' }}
              onClick={() => enrollInCourse(course._id)}
              disabled={enrolling === course._id || isCourseEnrolled(course._id)}
            >
              {enrolling === course._id ? 'Додаємо курс...' : isCourseEnrolled(course._id) ? 'Курс додано' : 'Додати курс'}
            </button>
          </li>
        ))}
      </ul>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Courses;
