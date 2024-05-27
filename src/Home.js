import React from 'react'
import { useAuthorization } from './AuthorizationContext';
const Home = () => {
    const { isAuthorized, user, login, logout } = useAuthorization();
    const userData = {
        nickname: "user123",
        email: "user123@example.com",
        courses: [
            {
                courseName: 'Course 1',
                language: "en",
                level: "b2",
                topics: [
                    {
                        topicName: 'Topic 1',
                        information: 'This is information for Topic 1.',
                        questions: [
                            {
                                type: 'multiple_choice',
                                question: 'What is the capital of France?',
                                options: ['London', 'Berlin', 'Paris', 'Madrid'],
                                correctAnswer: 'Paris',
                                answered: true,
                                correct: true // or false if answered incorrectly
                            },
                            // Add more questions here
                        ]
                    },
                    {
                        topicName: 'Topic 2',
                        information: 'This is information for Topic 2.',
                        questions: [
                            {
                                type: 'true_false',
                                question: 'The sky is blue.',
                                correctAnswer: "true",
                                answered: true,
                                correct: true // or false if answered incorrectly
                            },
                            // Add more questions here
                        ]
                    },
                    // Add more topics here
                ],
                progress: {
                    points: 0,
                    totalPoints: 0
                }
            },
            // Add more courses here
        ]
    };
  return (
    <div>
       <div>
            {isAuthorized ? (
                <div>
                    <p>Welcome, {user.nickname}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Please login</p>
                    <button onClick={() => login(userData)}>Login</button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Home
