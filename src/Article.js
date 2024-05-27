// Article.js
import React from 'react';
import { Link } from 'react-router-dom';

function Article({ article }) {
    console.log(article)
  return (
    <div className="col-md-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <img 
          src={article.imageUrl} 
          style={{ width: '100%', objectFit: 'cover', paddingBottom: '10px'}} 
          alt={article.title} 
        />
        <Link 
          to={`/articles/${article._id}`} 
          className="btn" 
          style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}}
        >
          Детальніше
        </Link>
      </div>
    </div>
  </div>
  );
}

export default Article;
