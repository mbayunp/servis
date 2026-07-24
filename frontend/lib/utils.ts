import { getApiBaseUrl } from './axios';

export const getImageUrl = (imagePath?: string | null): string => {
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return '/placeholder-image.png';
  }

  // Fallback if the database contains broken/expired Unsplash URLs from old seed data
  if (imagePath.includes('unsplash.com')) {
    return '/placeholder-image.png';
  }

  // If it's a valid external HTTP URL (e.g. S3/Cloudinary/data URL), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }

  const backendUrl = getApiBaseUrl().replace(/\/api\/?$/, '');
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/uploads/${imagePath}`;

  return `${backendUrl}${cleanPath}`;
};
