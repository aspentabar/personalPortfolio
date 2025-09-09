import React, { useRef, useEffect, useState } from "react";

// RevealOnScroll component (unchanged)
function RevealOnScroll({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

function InteractiveCursorEffect() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);

  const [mouseInWindow, setMouseInWindow] = useState(true);

  // Smoothed positions for text and particles
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x: nx, y: ny };
      setMouseInWindow(true);
    };

    const handleMouseLeave = () => setMouseInWindow(false);
    const handleMouseEnter = () => setMouseInWindow(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      // Smooth lerp toward target mouse position
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.1;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.1;

      const { x, y } = posRef.current;

      // Update glow and particle styles directly
      const container = containerRef.current;
      if (container) {
        const glow = container.querySelector(".glow");
        if (glow)
          glow.style.background = `radial-gradient(
            circle at ${50 + x * 30}% ${50 + y * 30}%,
            rgba(168,85,247,0.15) 0%,
            rgba(168,85,247,0.05) 40%,
            transparent 70%
          )`;

        const particles = container.querySelectorAll(".particle");
        particles.forEach((p, i) => {
          const factors = [
            { fx: 150, fy: 150, t: 0.5 },
            { fx: -100, fy: -100, t: 0.7 },
            { fx: 120, fy: -80, t: 0.6 },
          ];
          const f = factors[i];
          p.style.left = `calc(50% + ${x * f.fx}px)`;
          p.style.top = `calc(50% + ${y * f.fy}px)`;
        });

        // Update text transforms
        const name = container.querySelector(".name");
        const title = container.querySelector(".title");
        const subtitle = container.querySelector(".subtitle");

        if (name)
          name.style.transform = `translate(${x * 20}px, ${y * 15}px) rotateX(${
            -y * 5
          }deg) rotateY(${x * 5}deg) scale(${mouseInWindow ? 1.05 : 1})`;

        if (title)
          title.style.transform = `translate(${x * -15}px, ${y * 10}px) rotateX(${
            -y * 3
          }deg) rotateY(${x * -3}deg)`;

        if (subtitle)
          subtitle.style.transform = `translate(${x * 10}px, ${y * -8}px) rotateX(${
            y * 2
          }deg) rotateY(${x * 2}deg)`;
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [mouseInWindow]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Background glow and particles */}
      <div
        className="fixed inset-0 z-0 pointer-events-none glow"
        style={{ opacity: mouseInWindow ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60 particle transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-3 h-3 bg-purple-500 rounded-full opacity-40 particle transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 particle transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 select-none name text-purple-600">
          Aspen Tabar
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium select-none title">
          Designer <span className="mx-3 text-purple-400">&amp;</span> Developer
        </p>
        <p className="text-sm md:text-base text-purple-600 font-medium tracking-wider select-none subtitle">
          Exploring the intersection of computing and human experience
        </p>
      </div>

      {/* Hint */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-purple-400 z-10"
        style={{
          opacity: mouseInWindow ? 0 : 0.6,
          transition: "opacity 0.5s ease-out",
        }}
      >
        Move your cursor to interact
      </div>
    </div>
  );
}

export function Home() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
      <RevealOnScroll>
        <InteractiveCursorEffect />
      </RevealOnScroll>
    </section>
  );
}
