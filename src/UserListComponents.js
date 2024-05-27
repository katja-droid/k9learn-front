import React from 'react';

const UserListComponent = ({ users }) => {
    return (
        <div>
            <h2>All Users</h2>
            {users.map((user, index) => (
                <div key={index}>
                    <h3>{user.nickname}</h3>
                    <p>Email: {user.email}</p>
                    <h4>Courses</h4>
                    {user.courses.map((course, courseIndex) => (
                        <div key={courseIndex}>
                            <h5>{course.courseName}</h5>
                            <p>Language: {course.language}</p>
                            <p>Level: {course.level}</p>
                            <h6>Topics</h6>
                            {course.topics.map((topic, topicIndex) => (
                                <div key={topicIndex}>
                                    <h6>{topic.topicName}</h6>
                                    <p>{topic.information}</p>
                                    <h6>Questions</h6>
                                    {topic.questions.map((question, questionIndex) => (
                                        <div key={questionIndex}>
                                            <p>{question.question}</p>
                                            <p>Answered: {question.answered ? 'Yes' : 'No'}</p>
                                            {question.answered && (
                                                <p>Correct: {question.correct ? 'Yes' : 'No'}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                    <h4>Friends</h4>
                    {user.friends.map((friend, friendIndex) => (
                        <div key={friendIndex}>
                            <h5>{friend.nickname}</h5>
                            <p>Email: {friend.email}</p>
                            {/* Render friend's courses similarly */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// Mock data
const mockData = [
    {
        nickname: "John",
        email: "john@example.com",
        courses: [
            {
                courseName: "Spanish 101",
                language: "Spanish",
                level: "Beginner",
                topics: [
                    {
                        topicName: "Greetings",
                        information: "Basic greetings and introductions",
                        questions: [
                            {
                                question: "How do you say 'hello' in Spanish?",
                                answered: true,
                                correct: true
                            },
                            {
                                question: "What does 'adiós' mean?",
                                answered: true,
                                correct: true
                            }
                        ]
                    }
                ]
            }
        ],
        friends: [
            {
                nickname: "Alice",
                email: "alice@example.com"
                // Add friend's courses similarly
            }
        ]
    }
    // Add more users if needed
];

export default () => <UserListComponent users={mockData} />;
