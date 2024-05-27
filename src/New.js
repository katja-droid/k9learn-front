import React from 'react';

const New = ({ imageUrl, title, content }) => {
  return (
    <div className="card mb-3 mx-auto" style={{ maxWidth: '90vw' }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={imageUrl} className="card-img" alt="News Image" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
