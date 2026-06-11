import React from "react";
import Heading from "../ui/Heading";
import { ProjectImages } from "./ProjectImages";
import { usePortfolio } from "../hooks/usePortfolio";

const Portfolio = () => {
  const {
    activeTab,
    setActiveTab,
    categories,
    loading,
    filteredProjects
  } = usePortfolio();

  return (
    <section
      id="portfolio"
      className="section flex flex-col items-center my-20 w-full"
    >
      <div className="w-full text-center flex flex-col items-center">
        <Heading className="text-5xl sm:text-7xl mb-4">
          Featured Projects
        </Heading>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-10">
          Take a look at how we've helped businesses scale and improve their digital presence with custom-built solutions.
        </p>
        
        {/* Tabs */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border border-transparent ${
                  activeTab === category
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-105"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-xl text-zinc-500 animate-pulse">Loading projects...</p>
          </div>
        ) : (
          <ProjectImages projects={filteredProjects} />
        )}
      </div>
    </section>
  );
};

export default Portfolio;
