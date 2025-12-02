//Vite needs extra handler file for NextProject feature:

// Import the projects data from Projects.jsx
import { featuredProjects } from '../pages/Projects';

// Export navigable projects (excluding coming soon and external links)
export const navigableProjects = featuredProjects
  .filter(project => !project.comingSoon && !project.isCurrentSite)
  .map(project => ({
    id: project.id,
    title: project.title,
    url: project.url
  }));

// Helper function to get the next project
export const getNextProject = (currentProjectId) => {
  const currentIndex = navigableProjects.findIndex(p => p.id === currentProjectId);
  if (currentIndex !== -1 && currentIndex < navigableProjects.length - 1) {
    return navigableProjects[currentIndex + 1];
  }
  // Loop back to first project
  return navigableProjects[0];
};

// Helper function to get the previous project (optional for future use)
export const getPreviousProject = (currentProjectId) => {
  const currentIndex = navigableProjects.findIndex(p => p.id === currentProjectId);
  if (currentIndex > 0) {
    return navigableProjects[currentIndex - 1];
  }
  // Loop to last project
  return navigableProjects[navigableProjects.length - 1];
};