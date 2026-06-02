import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

const Admin = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    img: '',
    live: '',
    frontendCodeLink: '',
    backendCodeLink: '',
    technologies: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const techArray = formData.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const projectData = {
        ...formData,
        technologies: techArray,
      };

      await addDoc(collection(db, 'projects'), projectData);
      setMessage('Project added successfully!');
      setFormData({
        title: '',
        category: '',
        img: '',
        live: '',
        frontendCodeLink: '',
        backendCodeLink: '',
        technologies: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Error adding project. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center justify-center'>
      <div className='w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold mb-6 text-zinc-900 dark:text-white'>Portfolio Admin</h1>
        <p className='text-zinc-600 dark:text-zinc-400 mb-8'>Add a new project to your portfolio database.</p>

        {message && <div className={`p-4 rounded-md mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Title</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
              placeholder='e.g. FH Cafe'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Category</label>
            <select
              name='category'
              value={formData.category}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
            >
              <option value="" disabled>Select a category</option>
              <option value="WordPress">WordPress</option>
              <option value="MERN Stack">MERN Stack</option>
              <option value="HTML/CSS">HTML/CSS</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Figma Design">Figma Design</option>
              <option value="Wix">Wix</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Image URL / Path</label>
            <input
              type='text'
              name='img'
              value={formData.img}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
              placeholder='e.g. /projects/project-1.png or https://...'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Live URL</label>
            <input
              type='url'
              name='live'
              value={formData.live}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
              placeholder='https://...'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
              <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Frontend Code URL (Optional)</label>
              <input
                type='url'
                name='frontendCodeLink'
                value={formData.frontendCodeLink}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='https://github.com/...'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Backend Code URL (Optional)</label>
              <input
                type='url'
                name='backendCodeLink'
                value={formData.backendCodeLink}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
                placeholder='https://github.com/...'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Technologies (comma separated)</label>
            <input
              type='text'
              name='technologies'
              value={formData.technologies}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none'
              placeholder='React, Tailwind, Node.js'
            />
          </div>

          <button type='submit' disabled={loading} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors mt-4 disabled:opacity-70'>
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
