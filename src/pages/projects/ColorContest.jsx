import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNextProject } from '../../utils/projectNavigationUtils';

export function ColorContest() {
  const navigate = useNavigate();
  
  // Get the next project for navigation
  const nextProject = getNextProject("ColorContest");
  
  // Handler for next project navigation
  const handleNextProject = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(nextProject.url);
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Your Color Contest content here */}
      <h1>Color Contest Project</h1>
      
      {/* Bottom Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mt-12 md:mt-32 pt-6 md:pt-16 mb-8 md:mb-24 border-t border-gray-200">
          <div className="flex justify-end">
            <button 
              onClick={handleNextProject}
              className="px-6 py-3 md:px-8 md:py-4 bg-black hover:bg-gray-800 text-white rounded-xl font-medium transition-colors text-sm md:text-base group"
            >
              Next Project
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}