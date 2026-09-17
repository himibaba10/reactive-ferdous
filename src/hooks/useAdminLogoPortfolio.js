import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImageToCloudinary } from '../utils/cloudinary';

const LOGO_CATEGORY = 'Logo Design';

export const useAdminLogoPortfolio = () => {
  const [formData, setFormData] = useState({
    title: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), where('category', '==', LOGO_CATEGORY));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setProjects(data);
    } catch (error) {
      console.error('Error fetching logo portfolio:', error);
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
      title: project.title || '',
    });
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '' });
    setSelectedFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this logo portfolio item?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      setMessage('Logo deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting logo: ', error);
      setMessage('Error deleting logo.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !selectedFile) {
      setMessage('Please select an image file for the logo.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      let secureUrl = null;
      if (selectedFile) {
        secureUrl = await uploadImageToCloudinary(selectedFile, 'Reactive Ferdous/projects');
      }

      const projectData = {
        title: formData.title,
        category: LOGO_CATEGORY,
        live: '',
        frontendCodeLink: '',
        backendCodeLink: '',
        technologies: [],
      };

      if (secureUrl) {
        projectData.img = secureUrl;
      }

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
        setMessage('Logo portfolio updated successfully!');
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        setMessage('Logo portfolio added successfully!');
      }

      setFormData({ title: '' });
      setSelectedFile(null);
      e.target.reset();
      fetchProjects();
    } catch (error) {
      console.error('Error saving logo portfolio: ', error);
      setMessage(`Error saving logo: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
