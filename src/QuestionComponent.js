import React, { useState } from 'react';

const QuestionComponent = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = () => {
    const isCorrect = selectedOption === question.correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h3>{question.heading}</h3>
      <h4>{question.question}</h4>
      {question.type === 'multiple_choice' && question.options.map((option, index) => (
        <div key={index} className="form-check text-left">
          <input
            type="radio"
            className="form-check-input"
            id={`option-${index}`}
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
          />
          <label className="form-check-label" htmlFor={`option-${index}`}>
            {option}
          </label>
        </div>
      ))}
      {question.type === 'true_false' && (
        <div className="text-left">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="true"
              value="true"
              checked={selectedOption === "true"}
              onChange={() => setSelectedOption("true")}
            />
            <label className="form-check-label" htmlFor="true">
              Так
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="false"
              value="false"
              checked={selectedOption === "false"}
              onChange={() => setSelectedOption("false")}
            />
            <label className="form-check-label" htmlFor="false">
              Ні
            </label>
          </div>
        </div>
      )}
      {question.type === 'fill_in_the_blank' && (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
        </div>
      )}
      <button 
        className="btn btn-primary" 
        style={{ width: '100%', fontSize: '1.6em', backgroundColor: '#ffd24a', color: 'black', border: 'none', padding: '10px' }}
        onClick={handleSubmit}
      >
        Відповісти
      </button>
    </div>
  );
};

export default QuestionComponent;
