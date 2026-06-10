import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImageToCloudinary } from '../utils/cloudinary';

export const useAdminLogos = () => {
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
      const secureUrl = await uploadImageToCloudinary(selectedFile, 'Reactive Ferdous/logos');

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

  return {
    logos,
    selectedFile,
    setSelectedFile,
    loading,
    submitting,
    message,
    editingId,
    setEditingId,
    editUrl,
    setEditUrl,
    handleAdd,
    handleDelete,
    handleEditStart,
    handleEditSave
  };
};
