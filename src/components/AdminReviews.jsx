import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

const AdminReviews = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'reviews'), { img: imgUrl });
      setMessage('Review image added successfully!');
      setImgUrl('');
    } catch (error) {
      console.error('Error adding review: ', error);
      setMessage('Error adding review. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center justify-center'>
      <div className='w-full max-w-xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold mb-6 text-zinc-900 dark:text-white'>Add Review Image</h1>
        <p className='text-zinc-600 dark:text-zinc-400 mb-8'>Upload a screenshot to your public/reviews folder and paste the local path (or external URL) here.</p>

        {message && <div className={`p-4 rounded-md mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Review Image URL / Path</label>
            <input
              type='text'
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
              placeholder='e.g. /reviews/review-1.webp or https://...'
            />
          </div>

          <button type='submit' disabled={loading} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4 disabled:opacity-70'>
            {loading ? 'Adding...' : 'Add Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminReviews;
