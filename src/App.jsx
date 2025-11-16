// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoListPage from './pages/PhotoListPage';
import PhotoDetailPage from './pages/PhotoDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* / -> /photos */}
        <Route path="/" element={<Navigate to="/photos" replace />} />

        {/* Danh sách ảnh */}
        <Route path="/photos" element={<PhotoListPage />} />

        {/* Chi tiết ảnh */}
        <Route path="/photos/:id" element={<PhotoDetailPage />} />

        {/* Bất kỳ path nào khác -> quay lại /photos */}
        <Route path="*" element={<Navigate to="/photos" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
