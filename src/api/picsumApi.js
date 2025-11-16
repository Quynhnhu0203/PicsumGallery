// src/api/picsumApi.js

const BASE_URL = 'https://picsum.photos';

// Lấy danh sách ảnh với phân trang
export async function fetchPhotos(page = 1, limit = 20) {
  const response = await fetch(`${BASE_URL}/v2/list?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to load photos from Picsum API');
  }
  return response.json();
}

// Lấy thông tin chi tiết 1 ảnh
export async function fetchPhotoById(id) {
  const response = await fetch(`${BASE_URL}/id/${id}/info`);
  if (!response.ok) {
    throw new Error('Failed to load photo detail');
  }
  return response.json();
}
