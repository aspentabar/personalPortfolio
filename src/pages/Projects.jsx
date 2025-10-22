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
    tech: ["Java", "Processing.js", "HCI", "UX"],
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
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="mt-10" />
          <div className="mb-2 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2 select-none">
              Projects
            </h1>
          </div>

          {/* Filter Bar */}
          <div className="flex items-end justify-start mb-8 border-b border-gray-200 relative pt-5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelected(cat.value)}
                className={`mr-6 pb-1 text-base font-medium transition-colors duration-300 bg-transparent
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filtered.map((proj, i) => (
              <div
                key={proj.id}
                className="p-0 rounded-2xl bg-white shadow hover:shadow-2xl transition overflow-hidden flex flex-col animate-fadeIn"
                style={{
                  minHeight: 440,
                  animationDelay: `${i * 80}ms`,
                  animationDuration: "550ms",
                  animationTimingFunction: "cubic-bezier(.4,0,.2,1)",
                }}
              >
                <Link to={proj.url} className="block group">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-60 md:h-80 lg:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-7">
                    <h3 className="text-2xl font-bold mb-3 text-purple-700">
                      {proj.title}
                    </h3>
                    <p className="text-black mb-5 text-lg">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {proj.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-purple-700 hover:text-purple-500 transition-colors font-semibold">
                      View Project →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* FadeIn animation */}
      <style>{`
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(32px);
          animation-name: fadeInUp;
          animation-fill-mode: forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
