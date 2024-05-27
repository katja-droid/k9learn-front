import React, { useState } from 'react';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FillInTheBlank from './FillInTheBlank';
import TrueFalseQuestion from './TrueFalseQuestion';

function QuestionNavigator({ questions, userId, courseId }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [response, setResponse] = useState('');
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [triesLeft, setTriesLeft] = useState(3);

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
       console.log(currentQuestion)
        switch (currentQuestion.type) {
            case 'multiple_choice':
                return (
                    <MultipleChoiceQuestion
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
            case 'true_false':
                return (
                    <TrueFalseQuestion
                        question={currentQuestion.question}
                        correctAnswer={currentQuestion.correctAnswer}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        handleSubmit={handleResponse}
                        response={response}
                        isCorrect={isCorrect}
                        questionNumber={questionNumber}
                        userId={userId}
                        courseId={courseId}
                        questionId={currentQuestion._id}
                    />
                );
            case 'fill_in_the_blank':
                return (
                    <FillInTheBlank
                        question={currentQuestion.question}
                        correctAnswer={currentQuestion.correctAnswer}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        handleSubmit={handleResponse}
                        response={response}
                        isCorrect={isCorrect}
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
                    Наступне
                </button>
                <button className="btn"   style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}} onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                    Попереднє
                </button>
            </div>
        </div>
    );
}

export default QuestionNavigator;
