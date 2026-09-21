import React from 'react';
import { useAdminReviews } from '../hooks/useAdminReviews';
import SEO from './SEO';

const inputClass =
  'w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none';
const labelClass =
  'block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1';

const AdminReviews = () => {
  const {
    selectedFile,
    setSelectedFile,
    form,
    setField,
    loading,
    message,
    reviews,
    handleSubmit,
    handleDelete
  } = useAdminReviews();

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center justify-center'>
      <SEO
        title="Reviews Admin | Ferdous"
        description="Private reviews admin."
        path="/admin/add-reviews"
        noindex
      />
      <div className='w-full max-w-xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 my-8'>
        <h1 className='text-3xl font-bold mb-6 text-zinc-900 dark:text-white'>Add Review</h1>
        <p className='text-zinc-600 dark:text-zinc-400 mb-8'>
          The written quote is what makes a review indexable and citable — the screenshot is optional extra proof.
        </p>

        {message && <div className={`p-4 rounded-md mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <label className={labelClass}>Quote — what the client said</label>
            <textarea
              value={form.quote}
              onChange={setField('quote')}
              rows={4}
              placeholder="Working with Ferdous completely changed how our site performs..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-5'>
            <div className='flex-1'>
              <label className={labelClass}>Author</label>
              <input
                type='text'
                value={form.author}
                onChange={setField('author')}
                placeholder="Jane Smith"
                className={inputClass}
              />
            </div>
            <div className='flex-1'>
              <label className={labelClass}>Role / Company</label>
              <input
                type='text'
                value={form.role}
                onChange={setField('role')}
                placeholder="Founder, Acme"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Rating (1-5, optional)</label>
            <input
              type='number'
              min='1'
              max='5'
              step='1'
              value={form.rating}
              onChange={setField('rating')}
              placeholder='5'
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Screenshot (optional)</label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-800 dark:file:text-blue-400 dark:hover:file:bg-zinc-600 cursor-pointer'
            />
          </div>

          <button type='submit' disabled={loading} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4 disabled:opacity-70'>
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
                  {rev.img ? (
                    <img src={rev.img} alt="Review thumbnail" className='w-16 h-16 object-cover rounded-md bg-zinc-200 dark:bg-zinc-800 flex-shrink-0' />
                  ) : (
                    <div className='w-16 h-16 rounded-md bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center text-xs font-semibold text-zinc-500 uppercase'>Text</div>
                  )}
                  <div className='overflow-hidden'>
                    <p className='text-zinc-700 dark:text-zinc-300 truncate text-sm'>{rev.quote || rev.img}</p>
                    {rev.author && (
                      <p className='text-zinc-500 text-xs truncate'>
                        {rev.author}
                        {rev.role ? ` — ${rev.role}` : ''}
                        {rev.rating ? ` · ${rev.rating}/5` : ''}
                      </p>
                    )}
                  </div>
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
