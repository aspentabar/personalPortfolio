import { useState } from "react";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { Link } from "react-router-dom";

// Images
import ArsImg from "../assets/arsElecronica.jpeg";
import aiImg from "../assets/SelfPhoto.jpeg";

// Project categories
const categories = [
  { label: "All Work", value: "all" },
  { label: "UX Design", value: "ux" },
  { label: "Mobile Development", value: "mobile" },
  { label: "Web Development", value: "web" },
  { label: "Graphic Design", value: "graphic" },
  { label: "Branding", value: "branding" },
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
    tech: ["Creative Coding", "UX", "User Experience", "Public Media Façade", "HCI"],
    url: "/projects/ColorQuandary",
    categories: ["ux", "cloud", "all"],
  },
  {
    id: "ai-analytics-dashboard",
    title: "AI Analytics Dashboard",
    image: aiImg,
    description:
      "ML-powered data visualization platform with predictive analytics and interactive reports.",
    tech: ["Python", "TensorFlow", "D3.js", "Flask"],
    url: "/projects/ai-analytics-dashboard",
    categories: ["ux", "web", "all"],
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
                <Link to={proj.url} className="block group">
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