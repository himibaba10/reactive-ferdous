import { useState, useEffect } from 'react';
import { listDocuments } from '../utils/firestoreRest';

export const useLogoSlider = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const data = await listDocuments('logos');
        setLogos(data.map((doc) => doc.imgUrl).filter(Boolean));
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
