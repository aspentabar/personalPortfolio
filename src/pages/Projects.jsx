import { RevealOnScroll } from "../components/RevealOnScroll";

const featuredProjects = [
  {
    title: "Cloud Platform",
    description: "Scalable cloud infrastructure management with real-time monitoring and automated scaling.",
    tech: ["React", "Node.js", "AWS", "Docker"],
    url: "#",
  },
  {
    title: "AI Analytics Dashboard",
    description: "ML-powered data visualization platform with predictive analytics and interactive reports.",
    tech: ["Python", "TensorFlow", "D3.js", "Flask"],
    url: "#",
  },
];

export function Projects() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((proj) => (
              <div
                key={proj.title}
                className="p-6 rounded-xl border border-purple-200 bg-white shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-2 text-purple-600">{proj.title}</h3>
                <p className="text-purple-700 mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={proj.url}
                  className="text-purple-500 hover:text-purple-700 transition-colors font-semibold"
                >
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}