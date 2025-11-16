// src/pages/PhotoDetailPage.jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPhotoById } from '../api/picsumApi';

function PhotoDetailPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadPhoto() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPhotoById(id);
        if (!ignore) {
          setPhoto(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load photo detail');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPhoto();

    return () => {
      ignore = true;
    };
  }, [id]);

  const title = photo ? `Photo #${photo.id}` : 'Photo detail';
  const description =
    'No description is provided by the Picsum API. This is placeholder text for the assignment.';

  return (
    <div className="container py-4">
      <Link to="/photos" className="btn btn-outline-secondary mb-3">
        ← Back to gallery
      </Link>

      {isLoading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" aria-hidden="true" />
          <span className="ms-2">Loading photo...</span>
        </div>
      )}

      {error && !isLoading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {photo && !isLoading && !error && (
        <div className="row">
          <div className="col-12 col-lg-7 mb-3 mb-lg-0">
            <img
              src={photo.download_url}
              className="img-fluid rounded shadow-sm"
              alt={`Photo by ${photo.author}`}
            />
          </div>

          <div className="col-12 col-lg-5">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h2 className="h4">{title}</h2>

                <p className="text-muted mb-2">
                  <strong>Author:</strong> {photo.author}
                </p>

                <p className="mb-2">
                  <strong>Original URL:</strong>{' '}
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-underline"
                  >
                    Open on Unsplash
                  </a>
                </p>

                <p className="mb-2">
                  <strong>Resolution:</strong> {photo.width} × {photo.height}
                </p>

                <hr />

                <h6>Description</h6>
                <p className="text-muted">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoDetailPage;
