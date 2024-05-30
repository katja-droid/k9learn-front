import React from 'react';
import QuestionComponent from './QuestionComponent';

const TopicComponent = ({ topic, question, onAnswer }) => {
  return (
    <div>
      <h2>{topic.topicName}</h2>
      <p>{topic.information}</p>
      <QuestionComponent question={question} onAnswer={onAnswer} />
    </div>
  );
};

export default TopicComponent;
