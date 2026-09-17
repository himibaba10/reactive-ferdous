import { useState, useEffect } from 'react';
import { listDocuments } from '../utils/firestoreRest';

export const usePortfolio = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [allProjects, setAllProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const rawData = await listDocuments('projects');

        const excludedCategories = [
          'Graphic Design',
          'Figma Design',
          'Logo Design',
        ];
        const projectsData = rawData.filter(
          (p) => !excludedCategories.includes(p.category)
        );

        const uniqueCategories = [
          'All',
          ...new Set(projectsData.map((p) => p.category).filter(Boolean)),
        ];

        setAllProjects(projectsData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeTab === 'All'
      ? allProjects
      : allProjects.filter((project) => project.category === activeTab);

  return {
    activeTab,
    setActiveTab,
    categories,
    loading,
    filteredProjects,
  };
};
