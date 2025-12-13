import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects, getRandomProjects } from '../Projects'; // Adjust path as needed

// RevealOnScroll component for scroll animations
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

// Media Carousel Component
function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const carouselRef = useRef(null);
  
  // Media items configuration - REPLACE THESE WITH YOUR ACTUAL IMAGES/VIDEOS
  const mediaItems = [
    { type: 'image', src: 'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Design+1', alt: 'Design Process 1', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/7B68EE/FFFFFF?text=Design+2', alt: 'Design Process 2', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/6495ED/FFFFFF?text=Design+3', alt: 'Design Process 3', fullView: true },
    { type: 'image', src: 'https://via.placeholder.com/800x600/5B9BD5/FFFFFF?text=Design+4', alt: 'Design Process 4', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/4169E1/FFFFFF?text=Design+5', alt: 'Design Process 5', fullView: true },
    { type: 'image', src: 'https://via.placeholder.com/800x600/1E90FF/FFFFFF?text=Design+6', alt: 'Design Process 6', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/00BFFF/FFFFFF?text=Design+7', alt: 'Design Process 7', fullView: true }
  ];

  // Create extended array for infinite scroll effect
  const extendedItems = [...mediaItems, ...mediaItems, ...mediaItems];
  const offset = mediaItems.length;

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return mediaItems.length - 2;
      }
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= mediaItems.length - 2) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  // Detect when carousel enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true);
        }
      },
      { threshold: 0.3 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [hasBeenViewed]);

  // Auto-advance carousel after first view
  useEffect(() => {
    if (!isPaused && hasBeenViewed) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, hasBeenViewed]);

  // Calculate carousel translation
  const adjustedIndex = currentIndex + offset;
  const itemWidth = 50;
  const gapCompensation = 0.5;
  const translateX = -(adjustedIndex * itemWidth) + gapCompensation;

  return (
    <div ref={carouselRef}
         className="relative mt-12" 
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute -left-4 md:-left-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hidden sm:block"
          aria-label="Previous item"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Media Container */}
        <div className="w-full relative">
          <div className="w-full overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(calc(${translateX}% - 8px))`,
              }}
            >
              {extendedItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-1 md:px-2"
                  style={{ width: '50%' }}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-[250px] md:h-[400px] rounded-lg ${
                        item.fullView ? 'object-contain bg-gray-50' : 'object-cover'
                      }`}
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-[250px] md:h-[400px] rounded-lg object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-1 md:w-2 bg-white pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1 md:w-2 bg-white pointer-events-none z-10"></div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute -right-4 md:-right-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hidden sm:block"
          aria-label="Next item"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 md:mt-6 gap-2">
        {mediaItems.map((_, index) => {
          let isActive = false;
          if (currentIndex === index || currentIndex === index - 1) {
            isActive = true;
          }
          if (currentIndex === mediaItems.length - 2 && index === mediaItems.length - 1) {
            isActive = true;
          }
          
          return (
            <button
              key={index}
              onClick={() => {
                if (index === mediaItems.length - 1) {
                  setCurrentIndex(mediaItems.length - 2);
                } else {
                  setCurrentIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

// More Projects Component
function MoreProjects({ currentProjectId }) {
  const moreProjects = getRandomProjects(currentProjectId, 3);
  
  return (
    <section className="w-full pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8">
            More Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moreProjects.map((project) => (
              <Link
                key={project.id}
                to={project.url}
                className="group block bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-56 lg:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Component
export function ColorContest() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        video.muted = false;
      }).catch((error) => {
        console.log("Autoplay with sound was prevented:", error);
      });
    }
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-100 pt-24 sm:pt-16 pb-10 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-blue-700 leading-tight">
                Color Contest
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-6 md:mb-8">
                An interactive color competition game where players vote with their movement to determine winning colors.
              </p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-sm"
              >
                View Project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </RevealOnScroll>

          {/* Information Grid */}
          <RevealOnScroll>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Role</p>
                <p className="text-neutral-950 text-sm md:text-base">Creative Director & Developer</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Location</p>
                <p className="text-neutral-950 text-sm md:text-base">Boston, MA</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Platforms</p>
                <p className="text-neutral-950 text-sm md:text-base">Interactive Installation</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Focus</p>
                <p className="text-neutral-950 text-sm md:text-base">Visual Design & Interactivity</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Collaborators</p>
                <p className="text-neutral-950 text-sm md:text-base">Team Alpha, Beta Studios</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
        {/* Main Video - REPLACE WITH YOUR VIDEO */}
        <RevealOnScroll>
          <div className="mb-20 md:mb-36 -mx-0 sm:-mx-6 lg:-mx-12">
            <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
              {/* Replace this placeholder with your actual video */}
              <div className="w-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center" 
                   style={{ aspectRatio: '16/9' }}>
                <p className="text-white text-2xl font-bold">Video Placeholder</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Overview Section */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">Overview</h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    Color Contest represents an innovative approach to interactive media design, where participants become active creators in a collective visual experience. This project explores the intersection of human preference, real-time visualization, and collaborative art-making.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    The installation begins with a simple premise: colors compete for dominance based on audience preference. Through an intuitive interface, participants select their favorite colors in a series of head-to-head matchups. Each choice influences the overall visual composition, creating a dynamic artwork that evolves with every interaction. The system tracks voting patterns and generates stunning visual displays that reflect the collective aesthetic preferences of all participants.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    What makes Color Contest unique is its ability to transform abstract preferences into tangible visual experiences. The project demonstrates how simple user inputs can be orchestrated into complex, beautiful outcomes that surprise and delight audiences. By gamifying color selection and adding competitive elements, the installation creates an engaging experience that appeals to diverse audiences while producing genuinely artistic results.
                  </p>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Project Context Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">Project Development</h2>
              <div className="max-w-2xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  This installation was developed as part of an innovative design residency focused on pushing the boundaries of interactive media. The project brought together designers, technologists, and artists to explore new forms of audience engagement.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-4">
                  Over several weeks of intensive development, we prototyped various interaction models, tested different visual representations, and refined the competitive mechanics to create an experience that is both accessible to newcomers and engaging for repeat participants.
                </p>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-12 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Replace these with your actual images */}
                <img 
                  src="https://via.placeholder.com/800x600/6495ED/FFFFFF?text=Development+1" 
                  alt="Development Process" 
                  className="w-full h-[250px] md:h-[400px] rounded-lg object-cover"
                />
                <img 
                  src="https://via.placeholder.com/800x600/4169E1/FFFFFF?text=Development+2" 
                  alt="Development Process" 
                  className="w-full h-[250px] md:h-[400px] rounded-lg object-cover"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            {/* Design & Development Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">Design & Development</h2>
                <div className="max-w-2xl mb-16 md:mb-24">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The creative process began with extensive research into color theory, user psychology, and competitive game mechanics. We developed multiple prototypes using various technologies including web-based interfaces, physical installations, and projection mapping systems. Each iteration was tested with diverse user groups to ensure the experience remained intuitive while offering depth for those who wanted to explore further. The final implementation uses cutting-edge visualization techniques to create smooth, responsive animations that react instantly to user input.
                  </p>
                </div>
                <MediaCarousel />
              </section>
            </RevealOnScroll>

            {/* Final Presentation Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6 mt-16 md:mt-20 lg:mt-32">Final Exhibition</h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The Color Contest premiered at a major design festival, attracting thousands of participants over the course of the event. Visitors were immediately drawn to the vibrant display and intuitive interaction model, with many returning multiple times to see how the collective artwork had evolved.
                  </p>
                </div>
                {/* Large presentation images */}
                <div className="mt-16 md:mt-24 space-y-4 md:space-y-6">
                  <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl">
                    {/* Replace with your actual image */}
                    <img 
                      src="https://via.placeholder.com/1200x675/4A90E2/FFFFFF?text=Final+Exhibition+1" 
                      alt="Final Exhibition 1" 
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl">
                    {/* Replace with your actual image */}
                    <img 
                      src="https://via.placeholder.com/1200x675/7B68EE/FFFFFF?text=Final+Exhibition+2" 
                      alt="Final Exhibition 2" 
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* More Projects Section */}
      <MoreProjects currentProjectId="ColorContest" />
    </section>
  );
}