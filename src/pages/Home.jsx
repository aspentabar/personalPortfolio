import React, { useRef, useEffect, useState } from "react";

// RevealOnScroll component
function RevealOnScroll({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseInWindow, setMouseInWindow] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: normalizedX, y: normalizedY });
      setMouseInWindow(true);
    };

    const handleMouseLeave = () => {
      setMouseInWindow(false);
      setTimeout(() => setMousePos({ x: 0, y: 0 }), 300);
    };

    const handleMouseEnter = () => {
      setMouseInWindow(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseEnter);
    };
  }, []);

  // Glow effect
  const glowStyle = {
    background: `radial-gradient(
      circle at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%,
      rgba(168, 85, 247, 0.15) 0%,
      rgba(168, 85, 247, 0.05) 40%,
      transparent 70%
    )`,
    opacity: mouseInWindow ? 1 : 0,
    transition: "opacity 0.3s ease-out",
  };

  // Text transforms
  const nameTransform = {
    transform: `
      translate(${mousePos.x * 20}px, ${mousePos.y * 15}px) 
      rotateX(${-mousePos.y * 5}deg) 
      rotateY(${mousePos.x * 5}deg)
      scale(${mouseInWindow ? 1.05 : 1})
    `,
    transition: "transform 0.2s ease-out",
  };

  const titleTransform = {
    transform: `
      translate(${mousePos.x * -15}px, ${mousePos.y * 10}px)
      rotateX(${-mousePos.y * 3}deg) 
      rotateY(${mousePos.x * -3}deg)
    `,
    transition: "transform 0.25s ease-out",
  };

  const subtitleTransform = {
    transform: `
      translate(${mousePos.x * 10}px, ${mousePos.y * -8}px)
      rotateX(${mousePos.y * 2}deg) 
      rotateY(${mousePos.x * 2}deg)
    `,
    transition: "transform 0.3s ease-out",
    opacity: mouseInWindow ? 0.9 : 0.8,
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* 🔹 Fullscreen background layer for glow + particles */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={glowStyle}>
        {mouseInWindow && (
          <>
            <div
              className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
              style={{
                left: `calc(50% + ${mousePos.x * 150}px)`,
                top: `calc(50% + ${mousePos.y * 150}px)`,
                transform: "translate(-50%, -50%)",
                transition: "all 0.5s ease-out",
              }}
            />
            <div
              className="absolute w-3 h-3 bg-purple-500 rounded-full opacity-40"
              style={{
                left: `calc(50% + ${mousePos.x * -100}px)`,
                top: `calc(50% + ${mousePos.y * -100}px)`,
                transform: "translate(-50%, -50%)",
                transition: "all 0.7s ease-out",
              }}
            />
            <div
              className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50"
              style={{
                left: `calc(50% + ${mousePos.x * 120}px)`,
                top: `calc(50% + ${mousePos.y * -80}px)`,
                transform: "translate(-50%, -50%)",
                transition: "all 0.6s ease-out",
              }}
            />
          </>
        )}
      </div>

      {/* 🔹 Foreground content */}
      <div className="relative z-10 text-center">
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 select-none"
          style={nameTransform}
        >
          <span className="inline-block text-purple-600">Aspen</span>
          <span className="inline-block ml-4 text-purple-600">Tabar</span>
        </h1>

        <p
          className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium select-none"
          style={titleTransform}
        >
          Designer <span className="mx-3 text-purple-400">&amp;</span> Developer
        </p>

        <p
          className="text-sm md:text-base text-purple-600 font-medium tracking-wider select-none"
          style={subtitleTransform}
        >
          Exploring the intersection of computing and human experience
        </p>
      </div>

      {/* Hint text */}
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
