import React, { useState, useEffect } from 'react';
import QuestionNavigator from './QuestionNavigator';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Topic() {
    const { courseName, topicIndex } = useParams(); // Extract courseName and topicIndex from the URL parameters

    const [showQuestions, setShowQuestions] = useState(false);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleStartQuestions = () => {
        setShowQuestions(true);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/courses/${courseName}`);
                setCourse(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseName, topicIndex]); // Fetch course again whenever the courseName or topicIndex changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    const topic = course.topics[parseInt(topicIndex)]; // Find the topic by its index

    if (!topic) {
        console.log(`Topic with index "${topicIndex}" not found`);
        console.log('Available topics:', course.topics);
        return <div>Topic not found</div>;
    }

    const { questions } = topic; // Extract questions from the found topic

    const informationSlide = (
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <h2>Topic Information</h2>
        <p className="mb-4">{topic.information}</p>
        <div className="embed-responsive embed-responsive-16by9 mb-4">
        <iframe width="560" height="315" src={topic.youTubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>     </div>
        
        <button onClick={handleStartQuestions} className="btn"  style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}}>Start Questions</button>
    </div>
    
    );
    
    return (
        <div>
            {!showQuestions && informationSlide}
            {showQuestions && <QuestionNavigator courseId = {course._id} questions={questions} />}
        </div>
    );
}

export default Topic;
