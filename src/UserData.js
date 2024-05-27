import React from 'react';
import ReactDOM from 'react-dom';
import UserDataComponent from './UserDataComponent';


const UserData = () => {
    
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
                    ],
                   
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
    ],
};
  return (
    <div>
      <UserDataComponent userData={userData}/>
    </div>
  )
}

export default UserData

