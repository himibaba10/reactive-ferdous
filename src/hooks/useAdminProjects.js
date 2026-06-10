import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImageToCloudinary } from '../utils/cloudinary';

export const useAdminProjects = () => {
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
        secureUrl = await uploadImageToCloudinary(selectedFile, 'Reactive Ferdous/projects');
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
    handleSubmit
  };
};
