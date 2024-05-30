import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthorization } from './AuthorizationContext'; // Adjust the import path as needed

function CourseEnroll() {
    const { courseId } = useParams();
    const { currentUser, setCurrentUser } = useAuthorization();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const enrollCourse = async () => {
            try {
                // Make a POST request to enroll the user in the course
                await axios.post(`https://k9learn-back.onrender.com/users/${currentUser.id}/courses`, { courseId });

                // Fetch the updated user data
                const response = await axios.get(`https://k9learn-back.onrender.com/users/${currentUser.id}`);
                const updatedUser = response.data;

                // Update the currentUser state with the new data
                setCurrentUser(updatedUser);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        enrollCourse();
    }, [courseId, currentUser.id, setCurrentUser]);

    if (loading) {
        return <div className="container">Додаємо...</div>;
    }

    if (error) {
        return <div className="container">Помилка: {error.message}</div>;
    }

    return (
        <div className="container">
            <h2>Додаємо курс...</h2>
            <div className="alert alert-success" role="alert">
                Курс успішно додано!
            </div>
        </div>
    );
}

export default CourseEnroll;
