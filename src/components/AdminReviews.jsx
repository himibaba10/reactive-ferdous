import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import imageCompression from 'browser-image-compression';

const AdminReviews = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setMessage('');

    try {
      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(selectedFile, options);

      // Upload to Cloudinary
      const timestamp = Math.round((new Date()).getTime() / 1000);
      const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
      const folder = 'Reactive Ferdous/reviews';
      
      const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const encoder = new TextEncoder();
      const dataStr = encoder.encode(strToSign);
      const hashBuffer = await crypto.subtle.digest('SHA-1', dataStr);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', folder);
      
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Cloudinary upload failed');
      }
      
      const secureUrl = data.secure_url;

      await addDoc(collection(db, 'reviews'), { img: secureUrl });
      setMessage('Review image added successfully!');
      setSelectedFile(null);
      e.target.reset(); // Reset file input
      fetchReviews();
    } catch (error) {
      console.error('Error adding review: ', error);
      setMessage(`Error adding review: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteDoc(doc(db, 'reviews', id));
      setMessage('Review deleted successfully!');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review: ', error);
      setMessage('Error deleting review. Check console.');
    }
  };

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center justify-center'>
      <div className='w-full max-w-xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 my-8'>
        <h1 className='text-3xl font-bold mb-6 text-zinc-900 dark:text-white'>Add Review Image</h1>
        <p className='text-zinc-600 dark:text-zinc-400 mb-8'>Upload a screenshot to your public/reviews folder and paste the local path (or external URL) here.</p>

        {message && <div className={`p-4 rounded-md mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Review Image File</label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-800 dark:file:text-blue-400 dark:hover:file:bg-zinc-600 cursor-pointer'
            />
          </div>

          <button type='submit' disabled={loading || !selectedFile} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4 disabled:opacity-70'>
            {loading ? 'Adding...' : 'Add Review'}
          </button>
        </form>

        <hr className="my-10 border-zinc-200 dark:border-zinc-700" />

        <h2 className='text-2xl font-bold mb-6 text-zinc-900 dark:text-white'>Manage Existing Reviews</h2>
        <div className='flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2'>
          {reviews.length === 0 ? (
            <p className='text-zinc-500'>No reviews found.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className='flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-600'>
                <div className='flex items-center gap-4 overflow-hidden'>
                  <img src={rev.img} alt="Review thumbnail" className='w-16 h-16 object-cover rounded-md bg-zinc-200 dark:bg-zinc-800 flex-shrink-0' />
                  <span className='text-zinc-700 dark:text-zinc-300 truncate text-sm'>{rev.img}</span>
                </div>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className='ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors whitespace-nowrap'
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminReviews;
