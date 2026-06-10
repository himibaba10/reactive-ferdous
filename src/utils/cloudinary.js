import imageCompression from 'browser-image-compression';

/**
 * Compresses an image and uploads it securely to Cloudinary using a signed POST request.
 * 
 * @param {File} file - The image file to upload.
 * @param {string} folder - The destination folder in Cloudinary (e.g., 'Reactive Ferdous/logos').
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
export const uploadImageToCloudinary = async (file, folder) => {
  if (!file) throw new Error("No file provided");

  // 1. Compress image to ensure it is under 1MB
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  const compressedFile = await imageCompression(file, options);
  
  // 2. Generate SHA-1 signature for secure upload
  const timestamp = Math.round((new Date()).getTime() / 1000);
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
  
  const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const encoder = new TextEncoder();
  const dataStr = encoder.encode(strToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', dataStr);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // 3. Prepare form data for Cloudinary
  const formData = new FormData();
  formData.append('file', compressedFile);
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);
  
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  // 4. Upload
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Cloudinary upload failed');
  }
  
  return data.secure_url;
};
