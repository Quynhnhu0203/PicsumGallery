// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoListPage from './pages/PhotoListPage';
import PhotoDetailPage from './pages/PhotoDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Điều hướng / về /photos */}
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos" element={<PhotoListPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
        {/* 404 đơn giản */}
        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h1 className="h3 mb-3">404 - Page not found</h1>
              <p className="mb-3">The page you are looking for does not exist.</p>
              <a href="/photos" className="btn btn-primary">
                Go back to gallery
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
