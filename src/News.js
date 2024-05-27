import React, { useState, useEffect } from 'react';
import New from './New';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:5001/news');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <div>
         <div class="text-center">
        <h1 style={{padding: '10px'}}>Новини</h1>
        </div>
      {news.map((item, index) => (
        <New key={index} imageUrl={item.imageUrl} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default News;
