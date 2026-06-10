import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const usePortfolio = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allProjects, setAllProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(projectsData.map((p) => p.category).filter(Boolean)),
        ];

        setAllProjects(projectsData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeTab);

  return {
    activeTab,
    setActiveTab,
    categories,
    loading,
    filteredProjects
  };
};
