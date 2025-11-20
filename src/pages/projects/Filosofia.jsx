import React, { useRef, useEffect, useState } from 'react';

// Import your assets - update these paths to match your project structure
// Video
import FiloVid from "../../assets/filovid.mp4";

// Images
import Filo1 from "../../assets/filo1.png";
import Filo2 from "../../assets/filo2.png";
import Filo3 from "../../assets/filo3.png";
import Filo4 from "../../assets/filo4.png";
import Filo5 from "../../assets/filo5.png";
import Filo6 from "../../assets/filo6.png";
import Filo7 from "../../assets/filo7.png";
import Filo8 from "../../assets/filo8.png";
import Filo9 from "../../assets/filo9.png";
import Filo10 from "../../assets/filo10.png";
import Filo11 from "../../assets/filo11.png";
import Filo12 from "../../assets/filo12.png";
import Filo13 from "../../assets/filo13.png";

// PDF
import FilosofiaPDF from "../../assets/Filosofia.pdf";

// Filosofia PDF Pages as PNG images
import Filosofia1 from "../../assets/filosofia_1.png";
import Filosofia2 from "../../assets/filosofia_2.png";
import Filosofia3 from "../../assets/filosofia_3.png";
import Filosofia4 from "../../assets/filosofia_4.png";
import Filosofia5 from "../../assets/filosofia_5.png";
import Filosofia6 from "../../assets/filosofia_6.png";
import Filosofia7 from "../../assets/filosofia_7.png";
import Filosofia8 from "../../assets/filosofia_8.png";
import Filosofia9 from "../../assets/filosofia_9.png";
import Filosofia10 from "../../assets/filosofia_10.png";
import Filosofia11 from "../../assets/filosofia_11.png";
import Filosofia12 from "../../assets/filosofia_12.png";

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

// Mockup Gallery Component
function MockupGallery() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Mockup items configuration
  const mockupItems = [
    { src: Filo1, alt: 'Filosophia Specimen Page 1' },
    { src: Filo2, alt: 'Filosophia Specimen Page 2' },
    { src: Filo3, alt: 'Filosophia Specimen Page 3' },
    { src: Filo4, alt: 'Filosophia Specimen Page 4' },
    { src: Filo5, alt: 'Filosophia Specimen Page 5' },
    { src: Filo6, alt: 'Filosophia Specimen Page 6' },
    { src: Filo7, alt: 'Filosophia Specimen Page 7' },
    { src: Filo8, alt: 'Filosophia Specimen Page 8' },
    { src: Filo9, alt: 'Filosophia Specimen Page 9' },
    { src: Filo10, alt: 'Filosophia Specimen Page 10' },
    { src: Filo11, alt: 'Filosophia Specimen Page 11' },
    { src: Filo12, alt: 'Filosophia Specimen Page 12' },
    { src: Filo13, alt: 'Filosophia Specimen Page 13' }
  ];

  useEffect(() => {
    // Force a reflow after component mounts
    setImagesLoaded(true);
  }, []);

  return (
    <div className="mt-12 space-y-6 md:space-y-8 max-w-3xl mx-auto">
      {mockupItems.map((item, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg shadow-lg bg-gray-50 min-h-[200px]">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-auto object-contain block"
            loading="eager"
            style={{ 
              display: 'block',
              width: '100%',
              height: 'auto'
            }}
            onLoad={(e) => {
              e.target.style.opacity = '1';
            }}
            onError={(e) => {
              console.error(`Failed to load image ${index + 1}:`, e.target.src);
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Filosofia Document Carousel Component
function FilosofiaCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Filosofia pages configuration
  const filosofiaPages = [
    { src: Filosofia1, alt: 'Filosofia Page 1' },
    { src: Filosofia2, alt: 'Filosofia Page 2' },
    { src: Filosofia3, alt: 'Filosofia Page 3' },
    { src: Filosofia4, alt: 'Filosofia Page 4' },
    { src: Filosofia5, alt: 'Filosofia Page 5' },
    { src: Filosofia6, alt: 'Filosofia Page 6' },
    { src: Filosofia7, alt: 'Filosofia Page 7' },
    { src: Filosofia8, alt: 'Filosofia Page 8' },
    { src: Filosofia9, alt: 'Filosofia Page 9' },
    { src: Filosofia10, alt: 'Filosofia Page 10' },
    { src: Filosofia11, alt: 'Filosofia Page 11' },
    { src: Filosofia12, alt: 'Filosofia Page 12' }
  ];
  
  // Navigation handlers
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? filosofiaPages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === filosofiaPages.length - 1 ? 0 : prev + 1));
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentPage, isPaused]);

  return (
    <div className="relative mt-12"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>

      <div className="flex items-center justify-center">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 md:-left-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous page"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-black"
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

        {/* Page Display - Scaled up slightly */}
        <div className="w-full max-w-3xl px-8 md:px-12">
          <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-50">
            <img
              src={filosofiaPages[currentPage].src}
              alt={filosofiaPages[currentPage].alt}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next page"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-black"
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
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {filosofiaPages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentPage === index ? 'bg-black w-6' : 'bg-gray-300'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Main Component
export function Filosophia() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log("Autoplay was prevented:", error);
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-black leading-tight">
                Filosofia's Diary
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-6 md:mb-8">
                A typography specimen for the typeface 'Filosofia', showcasing its features and history through the format of a diary.
              </p>
              <a 
                href={FilosofiaPDF} 
                download="Filosofia.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full font-medium transition-colors text-sm"
              >
                Download PDF
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </a>
            </div>
          </RevealOnScroll>

          {/* Information Grid */}
          <RevealOnScroll>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="text-gray-400 uppercase font-bold tracking-wider text-xs md:text-sm">Role</p>
                <p className="text-neutral-950 text-sm md:text-base">Graphic Designer</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-400 uppercase font-bold tracking-wider text-xs md:text-sm">Tools</p>
                <p className="text-neutral-950 text-sm md:text-base">Adobe InDesign, Adobe Illustrator</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-400 uppercase font-bold tracking-wider text-xs md:text-sm">Focus</p>
                <p className="text-neutral-950 text-sm md:text-base">Typography</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
        {/* Main Video */}
        <RevealOnScroll>
          <div className="mb-20 md:mb-36 -mx-0 sm:-mx-6 lg:-mx-12">
            <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
              <video
                ref={videoRef}
                src={FiloVid}
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
                autoPlay
                loop
                muted
                playsInline
                controls
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Project Overview Section */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6">Project Overview</h2>
                <div className="space-y-4 max-w-4xl">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    This project is a comprehensive typography specimen that brings the Filosofia typeface to life through storytelling, visual analysis, and typographic exploration. I studied its origins, design qualities, and unique ligatures, highlighting how Zuzana Licko's reinterpretation of Bodoni informed its elegant, high-contrast character. Through this work, I aimed to demonstrate how typography can communicate both information and emotion.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            {/* Mockups Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <MockupGallery />
              </section>
            </RevealOnScroll>

            {/* Full Document Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0 mt-16 md:mt-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6">Full Document</h2>
                <div className="max-w-4xl mb-8">
                  <a 
                    href={FilosofiaPDF} 
                    download="Filosofia.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-full font-medium transition-colors text-sm"
                  >
                    Download Full PDF
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </a>
                </div>
                <FilosofiaCarousel />
              </section>
            </RevealOnScroll>
          </div>
        </div>

        {/* Bottom Navigation */}
        <RevealOnScroll>
          <div className="mt-16 md:mt-32 pt-8 md:pt-16 mb-12 md:mb-24 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-8">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-3">Key Concepts</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-black rounded-lg text-xs md:text-sm font-medium">Typography</span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-black rounded-lg text-xs md:text-sm font-medium">Type Specimen</span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-black rounded-lg text-xs md:text-sm font-medium">Editorial Design</span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-black rounded-lg text-xs md:text-sm font-medium">Visual Storytelling</span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-black rounded-lg text-xs md:text-sm font-medium">Graphic Design</span>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <button className="px-6 py-3 md:px-8 md:py-4 bg-black hover:bg-gray-800 text-white rounded-xl font-medium transition-colors text-sm md:text-base">
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