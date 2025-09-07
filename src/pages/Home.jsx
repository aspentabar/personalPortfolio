import { RevealOnScroll } from "../components/RevealOnScroll";

export function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-purple-700">
            Hi, I'm Aspen Tabar
          </h1>
          <p className="text-xl text-purple-400 mb-6">
            Creative Developer & Designer
          </p>
          <p className="text-purple-700 mb-8">
            I design and build modern, scalable web experiences with a passion for clean code and beautiful UI.
          </p>
          <a
            href="/projects"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded px-6 py-3 shadow transition"
          >
            View My Projects
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}