import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TopicComponent from './TopicComponent';
import FeedbackComponent from './FeedbackComponent';

const Test = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`https://k9learn-back.onrender.com/tests/${testId}`);
        setTest(response.data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [testId]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Правильно!");
    } else {
      setFeedback("Неправильно.");
    }
    setTimeout(() => {
      setFeedback("");
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    const topic = test.topics[currentTopicIndex];
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentTopicIndex < test.topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsTestCompleted(true);
    }
  };

  const retakeTest = () => {
    setCurrentTopicIndex(0);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsTestCompleted(false);
  };

  const getResultMessage = () => {
    if (score < 10) {
      return "Тест складено на дуже низький рівень (дуже погано).";
    } else if (score < 20) {
      return "Тест складено на низький рівень (погано).";
    } else if (score < 30) {
      return "Тест складено на середній рівень (задовільно).";
    } else if (score < 36) {
      return "Тест складено на високий рівень (добре).";
    } else {
      return "Тест складено на дуже високий рівень (відмінно).";
    }
  };

  if (!test) return <div>Loading...</div>;

  if (isTestCompleted) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card text-center" style={{ width: '50%' }}>
          <div className="card-body">
            <h1 className="card-title">Тест пройдено!</h1>
            <p className="card-text">Ви набрали {score} балів з {test.topics.reduce((acc, topic) => acc + topic.questions.length, 0)}.</p>
            <p className="card-text">{getResultMessage()}</p>
            <button 
              className="btn" 
              style={{ width: '100%', fontSize: '1.6em', backgroundColor: '#ffd24a', color: 'black', border: 'none', padding: '10px', marginTop: '10px' }}
              onClick={retakeTest}
            >
              Пройти знову
            </button>
            <button 
              className="btn" 
              style={{ width: '100%', fontSize: '1.6em', backgroundColor: '#ffd24a', color: 'black', border: 'none', padding: '10px', marginTop: '10px' }}
              onClick={() => navigate('/about')}
            >
              На головну
            </button>
          </div>
        </div>
      </div>
    );
  }

  const topic = test.topics[currentTopicIndex];
  const question = topic.questions[currentQuestionIndex];

  return (
    <div className="container d-flex justify-content-center">
      <div className="card text-center" style={{ width: '50%' }}>
        <div className="card-body">
          <h1 className="card-title">{test.testName}</h1>
          <TopicComponent topic={topic} question={question} onAnswer={handleAnswer} />
          {feedback && <FeedbackComponent feedback={feedback} />}
        </div>
      </div>
    </div>
  );
};

export default Test;
