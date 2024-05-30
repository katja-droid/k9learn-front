// Articles.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from './Article';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://k9learn-back.onrender.com/article'); // Adjust the endpoint as necessary
        setArticles(response.data);
        console.log(articles)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Статті</h1>
      <div className="row mb-3">
      </div>
      <div className="row">
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Articles;
