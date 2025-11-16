// src/pages/PhotoListPage.jsx
import { useEffect, useRef, useState } from 'react';
import PhotoCard from '../components/PhotoCard';
import { fetchPhotos } from '../api/picsumApi';

function PhotoListPage() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef(null);

  // Gọi API khi page thay đổi
  useEffect(() => {
    let ignore = false;

    async function loadPhotos() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchPhotos(page, 20);
        if (!ignore) {
          setPhotos((prev) => [...prev, ...data]);
          if (data.length === 0) {
            setHasMore(false); // Hết dữ liệu
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPhotos();

    return () => {
      ignore = true;
    };
  }, [page]);

  // Infinite scroll bằng IntersectionObserver
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="container py-4">
      <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <h1 className="h3 mb-2 mb-md-0">Lorem Picsum Gallery</h1>
        <p className="text-muted mb-0">
          Scroll down to load more photos
        </p>
      </header>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3">
        {photos.map((photo) => (
          <div key={photo.id} className="col-6 col-md-4 col-lg-3">
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center my-3">
          <div className="spinner-border" role="status" aria-hidden="true" />
          <span className="ms-2">Loading photos...</span>
        </div>
      )}

      {/* Hết danh sách */}
      {!hasMore && !isLoading && (
        <p className="text-center text-muted my-3">
          You have reached the end of the list.
        </p>
      )}

      {/* Sentinel để IntersectionObserver theo dõi */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}

export default PhotoListPage;
