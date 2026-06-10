import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImageToCloudinary } from '../utils/cloudinary';

export const useAdminReviews = () => {
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
      const secureUrl = await uploadImageToCloudinary(selectedFile, 'Reactive Ferdous/reviews');

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

  return {
    selectedFile,
    setSelectedFile,
    loading,
    message,
    reviews,
    handleSubmit,
    handleDelete
  };
};
