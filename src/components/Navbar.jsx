import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Styles for desktop nav links
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-purple-400 font-semibold transition-colors"
      : "text-purple-700 hover:text-purple-500 transition-colors";

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-lg border-b border-purple-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            className="font-mono text-xl font-bold text-purple-700"
            end
          >
            Aspen<span className="text-purple-400"> Tabar</span>
          </NavLink>
          {/* Mobile Hamburger Icon */}
          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden text-purple-700"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={navLinkStyles}>
              Home
            </NavLink>
            <NavLink to="/projects" className={navLinkStyles}>
              Projects
            </NavLink>
            <NavLink to="/about" className={navLinkStyles}>
              About
            </NavLink>
            {/* <NavLink to="/contact" className={navLinkStyles}>
              Contact
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
};