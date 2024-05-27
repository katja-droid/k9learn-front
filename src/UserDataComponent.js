import React from 'react';

const UserDataComponent = ({ userData }) => {
    return (
        <div>
            <h2>User Information</h2>
            <p>Nickname: {userData.nickname}</p>
            <p>Email: {userData.email}</p>
            <h2>Courses</h2>
            {userData.courses.map((course, index) => (
                <div key={index}>
                    <h3>{course.courseName}</h3>
                    <p>Language: {course.language}</p>
                    <p>Level: {course.level}</p>
                    <h4>Topics</h4>
                    {course.topics.map((topic, topicIndex) => (
                        <div key={topicIndex}>
                            <h5>{topic.topicName}</h5>
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
        </div>
    );
};

export default UserDataComponent;
