import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MdDelete, MdEdit, MdCheck, MdClose } from 'react-icons/md';
import imageCompression from 'browser-image-compression';

const AdminLogos = () => {
  const [logos, setLogos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState('');

  const fetchLogos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'logos'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogos(data);
    } catch (error) {
      console.error("Error fetching logos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setSubmitting(true);
    setMessage('');
    try {
      // Compress image to ensure it is under 1MB
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      const compressedFile = await imageCompression(selectedFile, options);
      
      // Generate SHA-1 signature for secure upload
      const timestamp = Math.round((new Date()).getTime() / 1000);
      const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
      const folder = 'Reactive Ferdous/logos';
      
      const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const encoder = new TextEncoder();
      const dataStr = encoder.encode(strToSign);
      const hashBuffer = await crypto.subtle.digest('SHA-1', dataStr);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Prepare form data for Cloudinary
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

      // Add to Firestore
      await addDoc(collection(db, 'logos'), { imgUrl: secureUrl });
      setMessage('Logo added successfully!');
      setSelectedFile(null);
      e.target.reset(); // Reset the file input visually
      fetchLogos();
    } catch (error) {
      console.error("Error adding logo:", error);
      setMessage(`Error adding logo: ${error.message || 'Unknown error'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this logo?")) return;
    try {
      await deleteDoc(doc(db, 'logos', id));
      setLogos(logos.filter(logo => logo.id !== id));
      setMessage('Logo deleted successfully!');
    } catch (error) {
      console.error("Error deleting logo:", error);
      setMessage('Error deleting logo.');
    }
  };

  const handleEditStart = (logo) => {
    setEditingId(logo.id);
    setEditUrl(logo.imgUrl);
  };

  const handleEditSave = async (id) => {
    try {
      await updateDoc(doc(db, 'logos', id), { imgUrl: editUrl });
      setEditingId(null);
      setLogos(logos.map(logo => logo.id === id ? { ...logo, imgUrl: editUrl } : logo));
      setMessage('Logo updated successfully!');
    } catch (error) {
      console.error("Error updating logo:", error);
      setMessage('Error updating logo.');
    }
  };

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col items-center'>
      <div className='w-full max-w-4xl'>
        <h1 className='text-3xl font-bold mb-8 text-zinc-900 dark:text-white text-center'>Manage Partner Logos</h1>
        
        {message && (
          <div className={`p-4 rounded-md mb-6 text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {/* Add Logo Form */}
        <div className='bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 mb-10'>
          <h2 className='text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200'>Add New Logo</h2>
          <form onSubmit={handleAdd} className='flex gap-4'>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setSelectedFile(e.target.files[0])}
              required
              className='flex-grow px-4 py-2 border rounded-md bg-white text-zinc-900 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-zinc-800 dark:file:text-blue-400 dark:hover:file:bg-zinc-600 cursor-pointer'
            />
            <button 
              type='submit' 
              disabled={submitting || !selectedFile} 
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors disabled:opacity-70 whitespace-nowrap'
            >
              {submitting ? 'Adding...' : 'Add Logo'}
            </button>
          </form>
        </div>

        {/* Existing Logos Grid */}
        <div className='bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6'>
          <h2 className='text-xl font-bold mb-6 text-zinc-800 dark:text-zinc-200'>Current Logos</h2>
          
          {loading ? (
            <p className="text-zinc-500 text-center py-10 animate-pulse">Loading logos...</p>
          ) : logos.length === 0 ? (
            <p className="text-zinc-500 text-center py-10">No logos found. Add your first one above!</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {logos.map(logo => (
                <div key={logo.id} className='border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 flex flex-col items-center relative group bg-zinc-50 dark:bg-zinc-900/50'>
                  
                  {editingId === logo.id ? (
                    <div className="w-full flex flex-col gap-2">
                      <input 
                        type="text" 
                        value={editUrl} 
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded bg-white dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                      />
                      <div className="flex justify-center gap-2 mt-2">
                        <button onClick={() => handleEditSave(logo.id)} className="p-1 bg-green-600 text-white rounded hover:bg-green-700"><MdCheck size={20} /></button>
                        <button onClick={() => setEditingId(null)} className="p-1 bg-zinc-500 text-white rounded hover:bg-zinc-600"><MdClose size={20} /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="h-24 w-full flex items-center justify-center mb-4">
                        <img src={logo.imgUrl} alt="Partner Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button 
                          onClick={() => handleEditStart(logo)}
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md"
                          title="Edit"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(logo.id)}
                          className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
                          title="Delete"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminLogos;
