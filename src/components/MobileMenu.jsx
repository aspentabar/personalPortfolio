import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Same styles as desktop navigation 
  const navLinkStyles = ({ isActive }) =>
    `text-2xl font-semibold my-4 transform transition-all duration-300 ${
      menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    } ${isActive ? "text-purple-400" : "text-purple-700"}`;

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white/95 z-40 flex flex-col items-center justify-center
                     transition-all duration-300 ease-in-out
                     ${
                       menuOpen
                         ? "h-screen opacity-100 pointer-events-auto"
                         : "h-0 opacity-0 pointer-events-none"
                     }
                   `}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-purple-700 text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>
      
      <NavLink
        to="/"
        end
        onClick={() => setMenuOpen(false)}
        className={navLinkStyles}
      >
        Home
      </NavLink>
      
      <NavLink
        to="/projects"
        onClick={() => setMenuOpen(false)}
        className={navLinkStyles}
      >
        Projects
      </NavLink>
      
      <NavLink
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={navLinkStyles}
      >
        About
      </NavLink>
      
      {/* Uncomment when ready to add Contact page
      <NavLink
        to="/contact"
        onClick={() => setMenuOpen(false)}
        className={navLinkStyles}
      >
        Contact
      </NavLink>
      */}
    </div>
  );
};