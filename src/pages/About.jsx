import { RevealOnScroll } from "../components/RevealOnScroll";

export function About() {
  const frontendSkills = [
    "React",
    "Vue",
    "TypeScript",
    "TailwindCSS",
    "Svelte",
  ];
  const backendSkills = [
    "Node.js",
    "Python",
    "AWS",
    "MongoDB",
    "GraphQL",
  ];

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">
            About Me
          </h2>
          <div className="rounded-xl p-8 border border-purple-200 bg-white shadow-lg">
            <p className="text-purple-700 mb-6">
              Passionate developer with expertise in building scalable web
              applications and creating innovative solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-600">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-purple-600">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {backendSkills.map((tech) => (
                    <span
                      key={tech}
                      className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border border-purple-200 bg-white shadow">
              <h3 className="text-xl font-bold mb-4 text-purple-600">🏫 Education</h3>
              <ul className="list-disc list-inside text-purple-700 space-y-2">
                <li>
                  <strong>B.S. in Computer Science</strong> - XYZ University (2016-2020)
                </li>
                <li>
                  Relevant Coursework: Data Structures, Web Development, Cloud Computing...
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-purple-200 bg-white shadow">
              <h3 className="text-xl font-bold mb-4 text-purple-600">🚀 Interests</h3>
              <ul className="list-disc list-inside text-purple-700 space-y-2">
                <li>UI/UX Design</li>
                <li>Creative Coding</li>
                <li>Cloud Platforms & DevOps</li>
                <li>AI & Data Visualization</li>
              </ul>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}