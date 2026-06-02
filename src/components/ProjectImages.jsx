export const ProjectImages = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex justify-center items-center w-full min-h-[200px]">
        <p className="text-xl text-zinc-500">No projects found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((slide, idx) => (
        <div
          className="bg-zinc-50 dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group border border-zinc-100 dark:border-zinc-800"
          key={slide.id || idx}
        >
          {/* main image wrapper */}
          <div className="h-[250px] overflow-hidden relative">
            <img
              className="w-full h-full object-cover object-top group-hover:object-[0_100%] transition-all duration-[3s] ease-in-out"
              src={slide.img}
              alt={slide.title}
            />
          </div>
          
          {/* content */}
          <div className="p-6 flex flex-col flex-grow">
            <a 
              href={slide.live} 
              target="_blank" 
              rel="noreferrer" 
              className="text-2xl font-bold hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-4 inline-block"
            >
              {slide.title} ↗
            </a>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {slide.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 px-3 py-1 text-xs font-semibold rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-4 text-sm font-medium">
              {slide.frontendCodeLink && (
                <a
                  href={slide.frontendCodeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors underline"
                >
                  Frontend Code
                </a>
              )}
              {slide.backendCodeLink && (
                <a
                  href={slide.backendCodeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors underline"
                >
                  Backend Code
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
