import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function TrueFalseQuestion({ question, correctAnswer, selectedOption, setSelectedOption, handleSubmit, questionNumber, courseId, questionId }) {
    const [triesLeft, setTriesLeft] = useState(1);
    const [questionProgress, setQuestionProgress] = useState(null);
    const [isCorrect, setIsCorrect] = useState(undefined);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        const fetchQuestionProgress = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/users/${currentUser._id}/progress/${courseId}/questions/${questionId}`);
                setQuestionProgress(response.data);
                setTriesLeft(response.data.triesLeft); // Set tries left from fetched data
            } catch (error) {
                console.error('Error fetching question progress:', error);
            }
        };

        fetchQuestionProgress();
    }, [currentUser._id, courseId, questionId]); // Ensuring proper dependencies

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!questionProgress?.answered && triesLeft > 0) {
            const correct = selectedOption === correctAnswer;
            setIsCorrect(correct);
            handleSubmit(correct);
            setTriesLeft(triesLeft - 1);

            try {
                await axios.put(`http://localhost:5001/users/${currentUser._id}/progress/${courseId}/questions/${questionId}/update`, {
                    answered: true,
                    correct: correct
                });

                // Update local question progress after submitting
                setQuestionProgress(prev => ({
                    ...prev,
                    answered: true,
                    correct: correct
                }));
            } catch (error) {
                console.error('Error updating question progress:', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5>Питання {questionNumber}: {question}</h5>
                    <form onSubmit={onSubmit}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="trueOption"
                                value="true"
                                checked={selectedOption === "true"}
                                onChange={handleOptionChange}
                                disabled={questionProgress?.answered || triesLeft <= 0}
                            />
                            <label className="form-check-label" htmlFor="trueOption">
                                Так
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="falseOption"
                                value="false"
                                checked={selectedOption === "false"}
                                onChange={handleOptionChange}
                                disabled={questionProgress?.answered || triesLeft <= 0}
                            />
                            <label className="form-check-label" htmlFor="falseOption">
                                Ні
                            </label>
                        </div>
                        <button
                            className="btn"
                            style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}}
                            type="submit"
                            disabled={triesLeft <= 0 || questionProgress?.answered}
                        >
                            Відповісти
                        </button>
                    </form>
                    {isCorrect !== undefined && (
                        <p className="mt-2">{isCorrect ? "Correct!" : "Incorrect!"}</p>
                    )}
                    <p className="mt-2">Залишилось спроб: {triesLeft}</p>
                    {questionProgress?.answered && <p className="mt-2">Відповідь на питання вже була надана.</p>}
                </div>
            </div>
        </div>
    );
}

export default TrueFalseQuestion;
