import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const useLogoSlider = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'logos'));
        const data = querySnapshot.docs.map((doc) => doc.data().imgUrl);
        setLogos(data);
      } catch (error) {
        console.error('Error fetching logos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogos();
  }, []);

  return { logos, loading };
};
