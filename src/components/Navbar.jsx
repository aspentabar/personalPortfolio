import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-lg border-b border-purple-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="font-mono text-xl font-bold text-purple-700">
            Aspen<span className="text-purple-400"> Tabar</span>
          </a>
          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden text-purple-700"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-purple-700 hover:text-purple-500 transition-colors">Home</a>
            <a href="#about" className="text-purple-700 hover:text-purple-500 transition-colors">About</a>
            <a href="#projects" className="text-purple-700 hover:text-purple-500 transition-colors">Projects</a>
            <a href="#contact" className="text-purple-700 hover:text-purple-500 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};