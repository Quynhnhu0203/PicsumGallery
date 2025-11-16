// src/components/PhotoCard.jsx
import { Link } from 'react-router-dom';
import './PhotoCard.css';

function PhotoCard({ photo }) {
  const { id, author } = photo;

  const thumbnailUrl = `https://picsum.photos/id/${id}/300/200`;

  return (
    <div className="card h-100 shadow-sm photo-card">
      <Link to={`/photos/${id}`} className="text-decoration-none text-dark">
        <img
          src={thumbnailUrl}
          className="card-img-top"
          alt={`Photo by ${author}`}
          style={{ objectFit: 'cover', height: '180px' }}
        />
        <div className="card-body">
          <h6 className="card-title mb-0 text-truncate">
            {author}
          </h6>
          <p className="card-text text-muted small mb-0">
            Click to view details
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PhotoCard;
