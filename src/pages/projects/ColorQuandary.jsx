import React, { useRef, useEffect, useState } from 'react';
import ArsVid from "../../assets/ArsVid1.mp4";
import Ars1 from "../../assets/ars1.jpeg";
import Ars2 from "../../assets/ars2.jpeg";
import Ars3 from "../../assets/ars3.jpeg";
import Ars4 from "../../assets/ars4.jpeg";
import Ars5 from "../../assets/ars5.jpeg";
import Ars6 from "../../assets/ars6.jpeg";
import Ars7 from "../../assets/ars7.jpeg";
import Ars8 from "../../assets/ars8.jpeg";
import Ars9 from "../../assets/ars9.jpeg";
import Ars10 from "../../assets/ars10.jpeg";
import FloorTracking from "../../assets/FloorTracking.mp4";

// RevealOnScroll component
function RevealOnScroll({ children }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
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

// Carousel Component
function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const carouselRef = useRef(null);
  
  // Media items array - mix of images and video (reordered)
  const mediaItems = [
    { type: 'image', src: Ars10, alt: 'Design Process 6', fullView: false },
    { type: 'video', src: FloorTracking, alt: 'Floor Tracking Demo', fullView: false },
    { type: 'image', src: Ars7, alt: 'Design Process 3', fullView: true },
    { type: 'image', src: Ars5, alt: 'Design Process 1', fullView: false },
    { type: 'image', src: Ars9, alt: 'Design Process 5', fullView: true },
    { type: 'image', src: Ars6, alt: 'Design Process 2', fullView: false },
    { type: 'image', src: Ars8, alt: 'Design Process 4', fullView: true }
  ];

  // Create an extended array for smooth scrolling
  // Add extra items at the beginning for smooth backwards scrolling
  const extendedItems = [...mediaItems, ...mediaItems, ...mediaItems];
  const offset = mediaItems.length; // Start in the middle copy

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Detect when carousel comes into view for the first time
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of carousel is visible
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

  // Auto-advance carousel every 5 seconds only after it's been viewed
  useEffect(() => {
    if (!isPaused && hasBeenViewed) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, hasBeenViewed]);

  // Calculate the translation offset
  const adjustedIndex = currentIndex + offset;
  const itemWidth = 50; // Each item takes 50% width
  const gapCompensation = 0.5; // Compensate for the gap between images
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
          className="absolute -left-12 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous item"
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Media Container with Sliding Animation and Strict Masking */}
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
                  key={`${index}`} 
                  className="flex-shrink-0 px-2"
                  style={{ width: '50%' }}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-[300px] md:h-[400px] rounded-lg ${
                        item.fullView ? 'object-contain bg-gray-50' : 'object-cover'
                      }`}
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-[300px] md:h-[400px] rounded-lg object-cover"
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
          {/* Strong edge masks to ensure no bleeding */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-white pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white pointer-events-none z-10"></div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute -right-12 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next item"
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
      <div className="flex justify-center mt-6 gap-2">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index || (currentIndex + 1) % mediaItems.length === index
                ? 'bg-purple-600 w-6'
                : 'bg-gray-300'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ColorQuandary() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Start playing the video (it will be muted initially for autoplay to work)
      video.play().then(() => {
        // Once playing, unmute the video
        video.muted = false;
      }).catch((error) => {
        // If unmuting causes playback to stop, keep it muted
        console.log("Autoplay with sound was prevented:", error);
      });
    }
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Header Section with light background */}
      <div className="bg-gray-100 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              {/* Title and Description */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-purple-700 leading-tight">
                Color Quandary
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-8">
                An interactive installation exploring how human computer interactions can turn audience movement into large-scale visual competition.
              </p>
              <a
                href="https://ars.electronica.art/futurelab/en/projects-northeastern-university-2023/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-sm"
              >
                Ars Electronica
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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
            <div className="flex flex-col gap-6 md:flex-row my-8">
              <div className="flex flex-col items-start pr-6">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Role</p>
                <p className="text-neutral-950">UX Designer & Creative Coder</p>
              </div>
              <div className="flex flex-col items-start pr-6 md:pl-6">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Location</p>
                <p className="text-neutral-950">Linz, Austria</p>
              </div>
              <div className="flex flex-col items-start pr-6 md:pl-6">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Platforms</p>
                <p className="text-neutral-950">Public Media Façade</p>
              </div>
              <div className="flex flex-col items-start md:pl-6">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Focus</p>
                <p className="text-neutral-950">HCI & Interactive Art</p>
              </div>
              <div className="flex flex-col items-start md:pl-6">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Collaborators</p>
                <p className="text-neutral-950">Ellie Williams, Marta Hill</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
        {/* Video */}
        <RevealOnScroll>
          <div className="mb-28 md:mb-36 -mx-6 lg:-mx-12 -mt-[0px]">
            <div className="relative overflow-hidden rounded-none lg:rounded-3xl shadow-2xl">
              <video
                ref={videoRef}
                src={ArsVid}
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Case Study Content with improved spacing and typography */}
        <div className="-mx-6 lg:-mx-12">
          <div className="space-y-20 md:space-y-28">
            <RevealOnScroll>
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Overview</h2>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Color Quandary is an interactive color competition that engages viewers to vote with their feet for their favorite colors, creating a playful atmosphere on the main deck of the Ars Electronica Center.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    At the start of each competition, the Ars Electronica facade divides into two colors. Players in the plaza are tracked using motion detection software and move towards the side with their favorite color to weigh in on their preference. The winning color overtakes the entire building. A round of Color Quandary includes seven individual games: four quarterfinal games, two semifinal games and one final game. After a winner is crowned, the entire facade transforms into a display indicative of the overall standings of each color.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700">
                    Color Quandary is inspired by "this or that" games in which users are asked to make a quick decision about which option they prefer. Though the idea was simplified to translate better on the Ars Electronica Center facade, the heart of the idea is the same. Color Quandary invites passersby to use their bodies to control the facade with an accessible, easy to understand and visually interesting game.
                  </p>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Ars Electronica Futurelab Academy Section - Full Width with Same Gray Background */}
      <div className="bg-gray-100 py-20 md:py-24 mb-20 md:mb-28 mt-20 md:mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Ars Electronica Futurelab Academy</h2>
              <div className="max-w-2xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  I was selected by Northeastern University's Design Department to take part in the Ars Electronica Futurelab Academy in Linz, Austria. This collaborative program brings together art, technology, and research at a world-renowned research museum.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-4">
                  Over three intensive days, I worked with an interdisciplinary team of Northeastern students and Ars Electronica researchers to design and prototype an interactive art installation for the programmable media façade of the Ars Electronica Center.
                </p>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-16 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img 
                  src={Ars1} 
                  alt="Ars Electronica Academy" 
                  className="w-full h-[300px] md:h-[400px] rounded-lg object-cover"
                />
                <img 
                  src={Ars2} 
                  alt="Ars Electronica Academy" 
                  className="w-full h-[300px] md:h-[400px] rounded-lg object-cover"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="-mx-6 lg:-mx-12">
          <div className="space-y-20 md:space-y-28">
            <RevealOnScroll>
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Design & Development</h2>
                <div className="max-w-2xl mb-24">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    After whiteboard brainstorming ways to gamify the façade, my team and I finalized our concept and developed the installation using Java and Processing.js, running simulations on our laptops to accurately mirror how the Ars Electronica media façade would behave at full architectural scale. With support from Ars Electronica Futurelab researchers, we also integrated motion sensors to track human movement in front of the building, allowing the façade to react dynamically to people in the public space.
                  </p>
                </div>
                {/* Add Media Carousel here */}
                <MediaCarousel />
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6 mt-50">Final Presentation</h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    At the closing presentation, our project was showcased live to an international audience of researchers, scientists, artists, and the local Linz community. Visitors experienced Color Quandary directly on the plaza, engaging in spontaneous play sparked by the visual competition.
                  </p>
                </div>
                {/* Large images below Final Presentation */}
                <div className="mt-24 -mx-6 lg:-mx-12 space-y-6">
                  <div className="relative overflow-hidden rounded-none lg:rounded-3xl shadow-2xl">
                    <img 
                      src={Ars3} 
                      alt="Final Presentation 1" 
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-none lg:rounded-3xl shadow-2xl">
                    <img 
                      src={Ars4} 
                      alt="Final Presentation 2" 
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>

        {/* Bottom Navigation or Call to Action */}
        <RevealOnScroll>
          <div className="mt-24 md:mt-32 pt-12 md:pt-16 mb-16 md:mb-24 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
              <div>
                <p className="text-sm text-purple-600 font-medium mb-3">Key Concepts</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Motion Tracking</span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Creative Coding</span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">User Experience</span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Public Media Façade</span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">HCI</span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Interactive Art</span>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors text-base">
                  View Next Project →
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}