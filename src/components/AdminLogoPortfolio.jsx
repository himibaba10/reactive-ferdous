import React from 'react';
import { useAdminLogoPortfolio } from '../hooks/useAdminLogoPortfolio';
import SEO from './SEO';

const AdminLogoPortfolio = () => {
  const {
    formData,
    selectedFile,
    setSelectedFile,
    loading,
    message,
    projects,
    editingId,
    handleChange,
    handleEditStart,
    handleCancelEdit,
    handleDelete,
    handleSubmit,
  } = useAdminLogoPortfolio();

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center justify-center'>
      <SEO
        title='Logo Portfolio Admin | Ferdous'
        description='Private logo portfolio admin.'
        path='/admin/add-logo-portfolio'
        noindex
      />
      <div className='w-full max-w-4xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold mb-6 text-zinc-900 dark:text-white'>
          Logo Portfolio Admin
        </h1>
        <p className='text-zinc-600 dark:text-zinc-400 mb-8'>
          Add logo design work that appears on the Logo Design service page. This is separate from partner logos on the homepage slider.
        </p>

        {message && (
          <div
            className={`p-4 rounded-md mb-6 ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>
              Logo Title
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
              placeholder='e.g. Acme Brand Mark'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>
              Logo Image {editingId && '(Leave empty to keep current)'}
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required={!editingId}
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-800 dark:file:text-blue-400 dark:hover:file:bg-zinc-600 cursor-pointer'
            />
          </div>

          <div className='flex gap-4 mt-4'>
            <button
              type='submit'
              disabled={loading || (!editingId && !selectedFile)}
              className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70'
            >
              {loading
                ? 'Saving...'
                : editingId
                  ? 'Update Logo'
                  : 'Upload Logo'}
            </button>
            {editingId && (
              <button
                type='button'
                onClick={handleCancelEdit}
                disabled={loading}
                className='flex-1 bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70'
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <hr className='my-10 border-zinc-200 dark:border-zinc-700' />

        <h2 className='text-2xl font-bold mb-6 text-zinc-900 dark:text-white'>
          Manage Logo Portfolio
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {projects.length === 0 ? (
            <p className='text-zinc-500'>No logo portfolio items yet.</p>
          ) : (
            projects.map((proj) => (
              <div
                key={proj.id}
                className='bg-zinc-100 dark:bg-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-600 overflow-hidden flex flex-col'
              >
                <img
                  src={proj.img}
                  alt={proj.title}
                  className='h-48 w-full object-contain bg-zinc-200 dark:bg-zinc-800 p-4'
                />
                <div className='p-4 flex flex-col flex-grow'>
                  <h3 className='font-bold text-lg text-zinc-900 dark:text-white mb-4'>
                    {proj.title}
                  </h3>
                  <div className='mt-auto flex gap-3'>
                    <button
                      onClick={() => handleEditStart(proj)}
                      className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogoPortfolio;
