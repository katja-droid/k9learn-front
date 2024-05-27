// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuthorization } from './AuthorizationContext';
// import axios from 'axios';

// function Courses() {
//     const [courses, setCourses] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [languageFilter, setLanguageFilter] = useState('');
//     const [levelFilter, setLevelFilter] = useState('');
//     const { currentUser } = useAuthorization();

//     useEffect(() => {
//         // Function to fetch courses from the API
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5001/courses'); // Adjust the URL according to your API endpoint
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         };

//         // Call the fetchCourses function
//         fetchCourses();
//     }, []); // Empty dependency array to ensure the effect runs only once after the initial render

//     const filteredCourses = courses.filter(course => {
//         // Filter by search term
//         if (searchTerm && !course.courseName.toLowerCase().includes(searchTerm.toLowerCase())) {
//             return false;
//         }
//         // Filter by language
//         if (languageFilter && course.language !== languageFilter) {
//             return false;
//         }
//         // Filter by level
//         if (levelFilter && course.level !== levelFilter) {
//             return false;
//         }
//         return true;
//     });

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center mb-4">Available Courses</h1>
//             <div className="row mb-3">
//                 <div className="col-md-4">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search courses..."
//                         value={searchTerm}
//                         onChange={e => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <div className="col-md-4">
//                     <select
//                         className="form-select"
//                         value={languageFilter}
//                         onChange={e => setLanguageFilter(e.target.value)}
//                     >
//                         <option value="">Filter by Language</option>
//                         {["en", "de"].map((language, index) => (
//                             <option key={index} value={language}>{language}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="col-md-4">
//                     <select
//                         className="form-select"
//                         value={levelFilter}
//                         onChange={e => setLevelFilter(e.target.value)}
//                     >
//                         <option value="">Filter by Level</option>
//                         <option value="a1">A1</option>
//                         <option value="a2">A2</option>
//                         <option value="b1">B1</option>
//                         <option value="b2">B2</option>
//                         <option value="c1">C1</option>
//                         <option value="c2">C2</option>

//                     </select>
//                 </div>
//             </div>
//             <ul className="list-group">
//                 {filteredCourses.map((course, index) => (
//                     <li key={index} className="list-group-item">
//                         <Link to={`/courses/${course.courseName}`} className="text-decoration-none">{course.courseName}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Courses;
