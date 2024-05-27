import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`http://localhost:5001/articles/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card mb-3 mx-auto" style={{ maxWidth: '90vw' }}>
        <div className="row no-gutters">
          <div className="col-md-12">
            <div className="carousel-container" style={{ maxWidth: '600px', margin: 'auto' }}>
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  {article.imageUrls.map((_, index) => (
                    <li
                      key={index}
                      data-target="#carouselExampleIndicators"
                      data-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                    ></li>
                  ))}
                </ol>
                <div className="carousel-inner">
                  {article.imageUrls.map((imageUrl, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={imageUrl} className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Попереднє</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Наступне</span>
                </a>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
