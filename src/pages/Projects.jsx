import { useState } from "react";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { Link } from "react-router-dom";

// Images
import ArsImg from "../assets/arsElecronica.jpeg";
import aiImg from "../assets/SelfPhoto.jpeg";
import TuneinkImg from "../assets/tunelink3.jpeg";
import Typebook from "../assets/typebookMockup.png";
import PortfolioImg from "../assets/webcover.jpeg";
import OmNomImg from "../assets/omnom4.png";
import PS5Img from "../assets/ps5.png";
// Add import for OmNom image when you have it
// import OmNomImg from "../assets/omnom.jpeg";

// Scroll to top handler
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
};

// Project categories
const categories = [
  { label: "All Work", value: "all" },
  { label: "UI/UX Design", value: "ux" },
  { label: "Human-Computer Interaction", value: "HCI" },
  { label: "Web Development", value: "web" },
  { label: "Graphic Design", value: "graphic" },
  { label: "AR", value: "ar" },
];

// List of Projects:
const featuredProjects = [
  {
    id: "ColorQuandary",
    title: "Color Quandary",
    image: ArsImg,
    description:
      "An interactive installation exploring how human computer interactions can turn audience movement into large-scale visual competition.",
    tech: ["Creative Coding", "User Experience", "Public Media Façade", "Human-Computer Interaction"],
    url: "/projects/ColorQuandary",
    categories: ["HCI", "all"],
  },
  {
    id: "TuneLink",
    title: "TuneLink",
    image: TuneinkImg,
    description:
      "A social music app that connects listeners through collectible icons that reflect their shared tastes and listening habits.",
    tech: ["Figma", "User Interface", "User Interviews", "Mobile App Design"],
    url: "/projects/TuneLink",
    categories: ["ux", "all"],
  },
  {
    id: "OmNom",
    title: "OmNom.ai",
    image: OmNomImg,
    description:
      "An AI-powered recipe app that recommends meals based on ingredients you already have, reducing food waste while making cooking accessible and enjoyable.",
    tech: ["Figma", "User Interface", "User Interviews", "Mobile App Design"],
    url: "/projects/OmNom",
    categories: ["ux", "all"],
  },
  {
    id: "Filosophia",
    title: "Filosofia's Diary",
    image: Typebook,
    description:
      "A typography specimen for the typeface 'Filosofia', showcasing its features and history through the format of a diary.",
    tech: ["Adobe Indesign", "Typography", "Graphic Design", "Mockup"],
    url: "/projects/Filosophia",
    categories: ["graphic", "all"],
  },
  {
    id: "PlaystationVR",
    title: "PlayStation Game Development",
    image: PS5Img,
    description:
      "Designing and developing a VR game using gaze as a way a user can interact with the world around them.",
    tech: ["VR Development", "Gaze Interaction", "Game Design", "Unity"],
    url: "#",
    categories: ["HCI", "all"],
    comingSoon: true,
  },
  {
    id: "Portfolio",
    title: "Personal Portfolio",
    image: PortfolioImg,
    description:
      "You're already here! This React-based portfolio showcases my work with a touch of purple magic. Cute, isn't it?",
    tech: ["React", "Tailwind CSS", "Vite", "JavaScript"],
    url: "https://github.com/aspentabar/personalPortfolio",
    categories: ["web", "ux", "all"],
    isCurrentSite: true,
  },
];

export function Projects() {
  const [selected, setSelected] = useState("all");

  // Filter logic
  const filtered =
    selected === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.categories?.includes(selected));

  return (
    <section className="w-full overflow-x-hidden pt-16 pb-12 md:py-20">
      <RevealOnScroll>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 sm:mt-6 md:mt-10" />
          <div className="mb-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-2 select-none">
              Projects
            </h1>
          </div>

          {/* Filter Bar - Scrollable container */}
          <div className="mb-6 md:mb-8 border-b border-gray-200 pt-3 md:pt-5 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex overflow-x-auto scrollbar-hide pb-1">
              <div className="flex flex-nowrap">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelected(cat.value)}
                    className={`mr-3 sm:mr-6 pb-1 px-1 text-sm sm:text-base font-medium transition-colors duration-300 bg-transparent whitespace-nowrap flex-shrink-0
                      ${
                        selected === cat.value
                          ? "text-black font-semibold"
                          : "text-gray-700"
                      }
                      focus:outline-none relative`}
                  >
                    {cat.label}
                    {/* Smooth underline animation */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2.5px] rounded bg-black transition-all duration-300
                        ${
                          selected === cat.value
                            ? "w-2/3 opacity-100"
                            : "w-0 opacity-0"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {filtered.map((proj, i) => (
              <div
                key={proj.id}
                className="w-full rounded-xl sm:rounded-2xl bg-white shadow hover:shadow-2xl transition overflow-hidden flex flex-col animate-fadeIn"
                style={{
                  minHeight: 'auto',
                  animationDelay: `${i * 80}ms`,
                  animationDuration: "550ms",
                  animationTimingFunction: "cubic-bezier(.4,0,.2,1)",
                }}
              >
                {proj.isCurrentSite ? (
                  // Special handling for the portfolio project - now links to GitHub
                  <a 
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 sm:p-6 md:p-7">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-purple-700 break-words">
                        {proj.title}
                      </h3>
                      <p className="text-gray-800 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed break-words">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                        {proj.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-100 text-purple-600 py-1 px-2 sm:px-3 rounded-full text-xs sm:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-purple-700 hover:text-purple-500 transition-colors font-semibold text-sm sm:text-base inline-flex items-center">
                        View on GitHub 
                        <span className="ml-1">→</span>
                      </span>
                    </div>
                  </a>
                ) : proj.comingSoon ? (
                  // Coming Soon project - non-clickable
                  <div className="block group cursor-not-allowed opacity-90">
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 sm:p-6 md:p-7">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-purple-700 break-words">
                        {proj.title}
                      </h3>
                      <p className="text-gray-800 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed break-words">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                        {proj.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-100 text-purple-600 py-1 px-2 sm:px-3 rounded-full text-xs sm:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-purple-700 font-semibold text-sm sm:text-base inline-flex items-center">
                        Coming Soon...
                      </span>
                    </div>
                  </div>
                ) : (
                  // Regular project link
                  <Link to={proj.url} className="block group" onClick={scrollToTop}>
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 sm:p-6 md:p-7">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-purple-700 break-words">
                        {proj.title}
                      </h3>
                      <p className="text-gray-800 mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed break-words">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                        {proj.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-100 text-purple-600 py-1 px-2 sm:px-3 rounded-full text-xs sm:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-purple-700 hover:text-purple-500 transition-colors font-semibold text-sm sm:text-base inline-flex items-center">
                        View Project 
                        <span className="ml-1">→</span>
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Styles for animations and scrollbar */}
      <style>{`
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(20px);
          animation-name: fadeInUp;
          animation-fill-mode: forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Hide scrollbar for filter categories */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Ensure no horizontal overflow on mobile */
        @media (max-width: 640px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </section>
  );
}