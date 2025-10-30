import React, { useRef, useEffect, useState } from "react";

// Using external placeholder media from Unsplash/Pexels
const placeholderVideo =
  "https://videos.pexels.com/video-files/3129971/3129971-hd_1280_720_25fps.mp4";
const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", // headphone/music
  "https://images.unsplash.com/photo-1511376777868-611b54f68947", // app ux
  "https://images.unsplash.com/photo-1559027615-5b6a0e6a2a6b", // wireframes
  "https://images.unsplash.com/photo-1553877522-43269d4ea984", // testing
  "https://images.unsplash.com/photo-1515169067865-5387ec356754", // final UI
];

// Scroll reveal animation
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
    return () => ref.current && observer.unobserve(ref.current);
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

// Image carousel (matches ColorQuandary layout)
function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative mt-12">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0">
              <img
                src={src}
                alt={`TuneLink design ${i + 1}`}
                className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* nav arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-2 hidden sm:block"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-2 hidden sm:block"
      >
        ›
      </button>
    </div>
  );
}

// Main TuneLink Component
export default function TuneLink() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.play().catch(() => {});
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-gray-100 pt-24 sm:pt-16 pb-10 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-purple-700 leading-tight">
                TuneLink
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-6 md:mb-8">
                A social music app connecting users through shared listening
                habits, gamified achievements, and real-time location-based
                discovery.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/watch?v=XTjQf0kIaXs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full font-medium transition-colors text-sm"
                >
                  Watch Demo
                </a>
                <a
                  href="https://www.figma.com/proto/DsjplEabs6ynZ6VC2O5u4B/T-Aspen-Tabar?page-id=1%3A5&node-id=6400-12408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors text-sm"
                >
                  View Prototype
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* INFO GRID */}
          <RevealOnScroll>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
              <div>
                <p className="text-purple-400 uppercase font-bold tracking-wider text-xs md:text-sm">
                  Role
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  UX Designer & Researcher
                </p>
              </div>
              <div>
                <p className="text-purple-400 uppercase font-bold tracking-wider text-xs md:text-sm">
                  Focus
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  HCI, Social Interaction, UX
                </p>
              </div>
              <div>
                <p className="text-purple-400 uppercase font-bold tracking-wider text-xs md:text-sm">
                  Tools
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  Figma, Notion, Illustrator
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* HERO VIDEO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-20">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
            <video
              ref={videoRef}
              src={placeholderVideo}
              className="w-full object-cover"
              style={{ aspectRatio: "16/9" }}
              autoPlay
              loop
              muted
              playsInline
              controls
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
          </div>
        </RevealOnScroll>
      </div>

      {/* OVERVIEW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <RevealOnScroll>
          <section className="mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
              Overview
            </h2>
            <p className="max-w-3xl text-gray-700 text-base md:text-lg leading-relaxed">
              TuneLink fosters meaningful connections through music. Users earn
              profile icons by reaching listening milestones, explore others on
              an interactive map, and connect through shared music stats and
              playlists.
            </p>
          </section>
        </RevealOnScroll>
      </div>

      {/* RESEARCH */}
      <div className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              Research & Insights
            </h2>
            <p className="max-w-3xl text-gray-700 text-base md:text-lg leading-relaxed">
              Through interviews, usability tests, and iterative prototyping,
              TuneLink emphasized visual minimalism, emotional familiarity, and
              recognition-based UX to strengthen social bonds through sound.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* DESIGN & DEVELOPMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20">
        <RevealOnScroll>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-6">
            Design & Development
          </h2>
          <p className="max-w-3xl text-gray-700 mb-10 text-base md:text-lg leading-relaxed">
            Starting from the question, “How might we make listening to music a
            community bonding activity for college students?”, TuneLink evolved
            through concept sketches, low-fidelity wireframes, and prototype
            testing cycles.
          </p>
          <MediaCarousel />
        </RevealOnScroll>
      </div>

      {/* FINAL PROTOTYPE */}
      <div className="bg-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
              Final Prototype
            </h2>
            <p className="max-w-3xl text-gray-700 mb-10 text-base md:text-lg leading-relaxed">
              The final TuneLink prototype brings social and sonic worlds
              together — encouraging playful exploration, personalized
              connection, and shared listening experiences.
            </p>
            <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
              <img
                src={images[4]}
                alt="TuneLink final prototype"
                className="w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* KEY CONCEPTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20">
        <RevealOnScroll>
          <div className="border-t border-gray-200 pt-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <p className="text-sm text-purple-600 font-medium mb-3">
                Key Concepts
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "UX Research",
                  "HCI",
                  "Gamification",
                  "Social UX",
                  "Prototyping",
                  "Music Discovery",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="px-6 py-3 md:px-8 md:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors text-sm md:text-base">
              View Next Project →
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
