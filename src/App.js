import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Courses from './Courses';
import Course from './Course';
import UserData from './UserData';
import UserListComponent from './UserListComponents';
import { AuthorizationProvider } from './AuthorizationContext';
import Home from './Home';
import Login from './Login';
import LoginPage from './LoginPage';
import UserCourses from './UserCourses';
import FriendSearch from './FriendSearch';
import FriendCoursesLeaderboard from './FriendCoursesLeaderboard';
import Navbar from './Navbar';
import axios from 'axios';

import Layout from './Layout';
import Topic from './Topic';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RegisterPage from './RegisterPage';
import FriendsList from './FriendsList';
import About from './About';
import News from './News';
import ArticleDetail from './ArticleDetail.js';
import Articles from './Articles.js';
import Tests from './Tests.js';
import Test from './Test.js';
function App() {
    return (
        <AuthorizationProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                        <Route index element={<About />} />
                        <Route path="/usercourses" element={<UserCourses />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/user" element={<UserData />} />
                        <Route path="/leaderboard" element={<FriendCoursesLeaderboard />} />
                        <Route path="/searchfriends" element={<FriendSearch />} />
                        <Route path="/friends" element={<FriendsList />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/news" element={<News />}/>
                        <Route path="/articles" element={<Articles/>} />
                        <Route path="/articles/:id" element={<ArticleDetail />} />
                        <Route path="/tests" element={<Tests />} />
                        <Route path="/test/:testId" element={<Test />} />
                        {/* Nested route for courses */}
                        <Route path="/courses/:courseName" element={<Course />}>
                            {/* Topic route */}
                            <Route path="/courses/:courseName/:topicIndex" element={<Topic />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthorizationProvider>
    );
}

export default App;
