import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FillInTheBlank from './FillInTheBlank';
import TrueFalseQuestion from './TrueFalseQuestion';

function QuestionNavigator({courseName, questions, userId, courseId }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [response, setResponse] = useState('');
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [triesLeft, setTriesLeft] = useState(3);

    const navigate = useNavigate(); // Hook for navigation

    const handleResponse = (correct) => {
        setIsCorrect(correct);
        setResponse(correct ? 'Правильно!' : 'Неправильно!');
        if (!correct && triesLeft > 1) {
            setTriesLeft(triesLeft - 1);
        } else {
            setTriesLeft(0);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            resetQuestionState();
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            resetQuestionState();
        }
    };

    const handleFinish = () => {
        navigate(`/courses/${courseName}`); // Navigate to summary or another appropriate route
    };

    const resetQuestionState = () => {
        setSelectedOption('');
        setResponse('');
        setIsCorrect(undefined);
        setTriesLeft(3);
    };

    const renderQuestion = () => {
        if (questions.length === 0) {
            return <div>Не знайдено питань.</div>;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const questionNumber = currentQuestionIndex + 1;

        switch (currentQuestion.type) {
            case 'multiple_choice':
            case 'true_false':
            case 'fill_in_the_blank':
                const QuestionComponent = {
                    'multiple_choice': MultipleChoiceQuestion,
                    'true_false': TrueFalseQuestion,
                    'fill_in_the_blank': FillInTheBlank
                }[currentQuestion.type];

                return (
                    <QuestionComponent
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        correctAnswer={currentQuestion.correctAnswer}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        handleSubmit={handleResponse}
                        response={response}
                        isCorrect={isCorrect}
                        triesLeft={triesLeft}
                        questionNumber={questionNumber}
                        userId={userId}
                        courseId={courseId}
                        questionId={currentQuestion._id}
                    />
                );
            default:
                return <div>Unknown question type.</div>;
        }
    };

    return (
        <div>
            {renderQuestion()}
            <div className="mt-4 d-flex justify-content-center">
                <button className="btn btn-secondary me-2" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                    Попереднє
                </button>
                <button className="btn" style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}} onClick={handleNext} disabled={currentQuestionIndex >= questions.length - 1}>
                    Наступне
                </button>
                {currentQuestionIndex === questions.length - 1  && (
                    <button className="btn btn-primary ms-2" style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}} onClick={handleFinish}  >
                        Повернутись до сторінки курсу
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuestionNavigator;
