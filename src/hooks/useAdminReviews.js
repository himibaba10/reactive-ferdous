import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImageToCloudinary } from '../utils/cloudinary';

const emptyForm = { quote: '', author: '', role: '', rating: '' };

export const useAdminReviews = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState(emptyForm);
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

  const setField = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quote = form.quote.trim();
    // A quote is what makes a review indexable; an image alone still works.
    if (!quote && !selectedFile) {
      setMessage('Error: add a written quote, an image, or both.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const payload = {
        quote,
        author: form.author.trim(),
        role: form.role.trim(),
        rating: form.rating ? Number(form.rating) : null,
      };

      if (selectedFile) {
        payload.img = await uploadImageToCloudinary(
          selectedFile,
          'Reactive Ferdous/reviews'
        );
      }

      await addDoc(collection(db, 'reviews'), payload);
      setMessage('Review added successfully!');
      setSelectedFile(null);
      setForm(emptyForm);
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
    form,
    setField,
    loading,
    message,
    reviews,
    handleSubmit,
    handleDelete
  };
};
