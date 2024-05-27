import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthorization } from './AuthorizationContext';

function FillInTheBlank({ question, correctAnswer, questionNumber, courseId, questionId }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [triesLeft, setTriesLeft] = useState(1);
    const [questionProgress, setQuestionProgress] = useState(null);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        const fetchQuestionProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/users/${currentUser._id}/progress/${courseId}/questions/${questionId}`);
                setQuestionProgress(response.data);
                setTriesLeft(response.data.triesLeft);
            } catch (error) {
                console.error('Error fetching question progress:', error);
            }
        };

        fetchQuestionProgress();
    }, [currentUser._id, courseId, questionId]);

    const handleInputChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!questionProgress || questionProgress.answered || triesLeft <= 0) {
            return;
        }

        const correct = selectedOption.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        setIsCorrect(correct);

        const newTriesLeft = triesLeft - 1;
        setTriesLeft(newTriesLeft);

        try {
            await axios.put(`http://localhost:5001/users/${currentUser._id}/progress/${courseId}/questions/${questionId}/update`, {
                answered: newTriesLeft === 0,
                correct: correct,
                triesLeft: newTriesLeft
            });

            setQuestionProgress(prev => ({
                ...prev,
                answered: newTriesLeft === 0,
                correct: correct,
                triesLeft: newTriesLeft
            }));
        } catch (error) {
            console.error('Error updating question progress:', error);
        }
    };

    return (
        <div key={questionId} className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Question {questionNumber}: {question}</h5>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedOption}
                            onChange={handleInputChange}
                            disabled={questionProgress?.answered || triesLeft === 0}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={questionProgress?.answered || triesLeft === 0}
                        >
                            Submit
                        </button>
                    </form>
                    {triesLeft<3 && isCorrect !== undefined && (
    <div className="alert mt-2" role="alert" style={{ color: isCorrect ? 'green' : 'red' }}>
        {isCorrect ? "Correct!" : "Incorrect!"}
    </div>
)}
                    <div className="mt-2">Tries left: {triesLeft}</div>
                    {questionProgress?.answered && <div className="mt-2 text-muted">This question has been answered.</div>}
                </div>
            </div>
        </div>
    );
}

export default FillInTheBlank;
