import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Heading from '../ui/Heading';
import { ProjectImages } from './ProjectImages';

const DesignGallery = ({ category, title = "Featured Work", description = "A selection of my recent projects in this area." }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error(`Error fetching ${category} projects:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  return (
    <section className="section flex flex-col items-center my-20 w-full">
      <div className="w-full text-center flex flex-col items-center mb-12">
        <Heading className="text-4xl sm:text-6xl mb-4">
          {title}
        </Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      </div>
      
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-xl text-zinc-500 animate-pulse">Loading gallery...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px] border border-dashed border-zinc-700 rounded-2xl bg-zinc-900/30">
            <p className="text-zinc-500">No projects uploaded yet in this category.</p>
          </div>
        ) : (
          <ProjectImages projects={projects} />
        )}
      </div>
    </section>
  );
};

export default DesignGallery;
