import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

const FriendCoursesLeaderboard = () => {
  const [friends, setFriends] = useState([]);
  const [courses, setCourses] = useState([]);
  const { currentUser, setCurrentUser } = useAuthorization();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userResponse = await axios.get(`https://k9learn-back.onrender.com/users/${currentUser._id}`);
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchFriendsAndCourses = async () => {
      try {
        // Fetch user's friends
        const friendsResponse = await axios.get(`https://k9learn-back.onrender.com/users/${currentUser._id}/friends`);
        const friendList = friendsResponse.data;

        // Fetch all courses
        const coursesResponse = await axios.get('https://k9learn-back.onrender.com/courses');
        const coursesList = coursesResponse.data;

        // Update state with friends and courses
        setFriends(friendList);
        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching friends and courses:', error);
      }
    };

    if (currentUser) {
      fetchCurrentUser().then(fetchFriendsAndCourses);
    }
  }, [currentUser?._id, setCurrentUser]);

  // Function to get the course index in the progress array
  const getCourseProgress = (user, courseId) => {
    const progress = user.progress.find(progress => progress.courseId === courseId);
    return progress ? progress.points : 0; // Default to 0 if no progress is found
  };

  // Filter courses to include only those where the current user is enrolled
  const filteredCourses = courses.filter(course =>
    currentUser.progress.some(progress => progress.courseId === course._id)
  );

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Лідерборд</h2>
      <div className="row">
        {friends.length === 0 ? (
          <div className="col-md-12">
            <p>У вас поки що немає друзів.</p>
          </div>
        ) : (
          filteredCourses.map(course => (
            <div key={course._id} className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">{course.courseName}</div>
                <ul className="list-group list-group-flush">
                  {/* Current User's Progress */}
                  <li key={currentUser._id} className="list-group-item">
                    <strong>{currentUser.nickname}</strong> - {getCourseProgress(currentUser, course._id)} балів
                  </li>
                  {/* Friends' Progress */}
                  {friends.map(friend => (
                    <li key={friend._id} className="list-group-item">
                      <strong>{friend.nickname}</strong> - {getCourseProgress(friend, course._id)} балів
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendCoursesLeaderboard;
