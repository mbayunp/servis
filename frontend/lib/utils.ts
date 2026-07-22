export const getImageUrl = (imagePath?: string | null) => {
  if (!imagePath) return '/placeholder-image.png'; // Fallback image
  
  // If it's already a full HTTP URL (e.g. S3/Cloudinary/data URL), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  
  const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
  
  // Ensure correct path slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/uploads/${imagePath}`;
  
  return `${backendUrl}${cleanPath}`;
};
