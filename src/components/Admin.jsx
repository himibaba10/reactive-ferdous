import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import imageCompression from 'browser-image-compression';

const Admin = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    live: '',
    frontendCodeLink: '',
    backendCodeLink: '',
    technologies: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditStart = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      live: project.live,
      frontendCodeLink: project.frontendCodeLink || '',
      backendCodeLink: project.backendCodeLink || '',
      technologies: project.technologies.join(', '),
    });
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: '',
      live: '',
      frontendCodeLink: '',
      backendCodeLink: '',
      technologies: '',
    });
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      setMessage('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project: ', error);
      setMessage('Error deleting project.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !selectedFile) {
      setMessage('Please select an image file for the project.');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      let secureUrl = null;
      if (selectedFile) {
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
        const folder = 'Reactive Ferdous/projects';
        
        const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
        const encoder = new TextEncoder();
        const dataStr = encoder.encode(strToSign);
        const hashBuffer = await crypto.subtle.digest('SHA-1', dataStr);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        const uploadFormData = new FormData();
        uploadFormData.append('file', compressedFile);
        uploadFormData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
        uploadFormData.append('timestamp', timestamp);
        uploadFormData.append('signature', signature);
        uploadFormData.append('folder', folder);
        
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: uploadFormData
        });
        
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || 'Cloudinary upload failed');
        }
        
        secureUrl = data.secure_url;
      }

      const techArray = formData.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      const projectData = {
        ...formData,
        technologies: techArray,
      };

      if (secureUrl) {
        projectData.img = secureUrl;
      }

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
        setMessage('Project updated successfully!');
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        setMessage('Project added successfully!');
      }

      setFormData({
        title: '',
        category: '',
        live: '',
        frontendCodeLink: '',
        backendCodeLink: '',
        technologies: '',
      });
      setSelectedFile(null);
      e.target.reset(); // clear file input
      fetchProjects();
    } catch (error) {
      console.error('Error saving document: ', error);
      setMessage(`Error saving project: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center justify-center'>
      <div className='w-full max-w-4xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold mb-6 text-zinc-900 dark:text-white'>Portfolio Admin</h1>
        <p className='text-zinc-600 dark:text-zinc-400 mb-8'>{editingId ? 'Edit an existing project.' : 'Add a new project to your portfolio database.'}</p>

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
            <label className='block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1'>Project Image File {editingId && '(Leave empty to keep current)'}</label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required={!editingId}
              className='w-full px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-800 dark:file:text-blue-400 dark:hover:file:bg-zinc-600 cursor-pointer'
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

          <div className="flex gap-4 mt-4">
            <button type='submit' disabled={loading || (!editingId && !selectedFile)} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70'>
              {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} disabled={loading} className='flex-1 bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70'>
                Cancel
              </button>
            )}
          </div>
        </form>

        <hr className="my-10 border-zinc-200 dark:border-zinc-700" />

        <h2 className='text-2xl font-bold mb-6 text-zinc-900 dark:text-white'>Manage Existing Projects</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {projects.length === 0 ? (
            <p className='text-zinc-500'>No projects found.</p>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className='bg-zinc-100 dark:bg-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-600 overflow-hidden flex flex-col'>
                <img src={proj.img} alt={proj.title} className="h-48 w-full object-cover bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{proj.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{proj.category}</p>
                  <div className="mt-auto flex gap-3">
                    <button onClick={() => handleEditStart(proj)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors">Edit</button>
                    <button onClick={() => handleDelete(proj.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors">Delete</button>
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

export default Admin;
