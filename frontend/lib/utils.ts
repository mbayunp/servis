import { getApiBaseUrl } from './axios';

export const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath) return '/placeholder-image.png'; // Fallback image
  
  // If it's already a full HTTP URL (e.g. S3/Cloudinary/data URL), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  const backendUrl = getApiBaseUrl().replace(/\/api\/?$/, '');
  
  // Ensure correct path slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/uploads/${imagePath}`;
  
  return `${backendUrl}${cleanPath}`;
};
