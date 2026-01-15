import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects, getRandomProjects } from '../Projects';
import tunelink3 from "../../assets/tunelink3.png";
import tunelink4 from "../../assets/tunelink4.jpeg";
import tunelink5 from "../../assets/tunelink5.jpeg";
import tunelink6 from "../../assets/tunelink6.jpeg";
import tunelink7 from "../../assets/tunelink7.jpeg";
import tunelink8 from "../../assets/tunelink8.jpeg";
import tunelink9 from "../../assets/tunelink9.jpeg";
import tunelink10 from "../../assets/tunelink10.jpeg";
import tunelink11 from "../../assets/tunelink11.jpeg";
import tunelink12 from "../../assets/tunelink12.jpeg";
import tunelink13 from "../../assets/tunelink13.jpeg";
import tunelink14 from "../../assets/tunelink14.jpeg";
import tunelink15 from "../../assets/tunelink15.jpeg";
import tunelink16 from "../../assets/tunelink16.jpeg";
import tunelink17 from "../../assets/tunelink17.jpeg";
import tunelink18 from "../../assets/tunelink18.jpeg";
import tunelink19 from "../../assets/tunelink19.jpeg";
import tunelink20 from "../../assets/tunelink20.jpeg";
import tunelink21 from "../../assets/tunelink21.jpeg";
import tunelink22 from "../../assets/tunelink22.jpeg";
import tunelink23 from "../../assets/tunelink23.jpeg";
import tunelink24 from "../../assets/tunelink24.jpeg";
import tunelink25 from "../../assets/tunelink25.jpeg";
import tunelink26 from "../../assets/tunelink26.jpeg";
import tunelink27 from "../../assets/tunelink27.jpeg";
import tunelink28 from "../../assets/tunelink28.jpeg";
import tunelink29 from "../../assets/tunelink29.jpeg";
import tunelink30 from "../../assets/tunelink30.jpeg";
import tunelink31 from "../../assets/tunelink31.jpeg";
import tunelink32 from "../../assets/tunelink32.jpeg";
import tunelink33 from "../../assets/tunelink33.jpeg";
import tunelink34 from "../../assets/tunelink34.jpeg";
import tunelink35 from "../../assets/tunelink35.jpeg";
import tunelink36 from "../../assets/tunelink36.jpeg";
import tunelink37 from "../../assets/tunelink37.jpeg";
import tunelink38 from "../../assets/tunelink38.jpeg";
import tunelink39 from "../../assets/tunelink39.jpeg";
import tunelink40 from "../../assets/tunelink40.jpeg";
import tunelinkvid from "../../assets/tunelinkvid.mp4";

// Scroll reveal animation
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

// Activity 1 Single Image Carousel Component
function Activity1Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const activityImages = [
    { id: 1, src: tunelink27, alt: 'Activity 1 Image 1', caption: 'Pop Data Visualization' },
    { id: 2, src: tunelink28, alt: 'Activity 1 Image 2', caption: 'Rap Data Visualization' },
    { id: 3, src: tunelink29, alt: 'Activity 1 Image 3', caption: 'Country Data Visualization' },
    { id: 4, src: tunelink30, alt: 'Activity 1 Image 4', caption: 'Rock Data Visualization' },
    { id: 5, src: tunelink31, alt: 'Activity 1 Image 5', caption: 'Classical Data Visualization' }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? activityImages.length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === activityImages.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const currentImage = activityImages[currentIndex];

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <button
          onClick={handlePrevious}
          className="absolute left-0 md:-left-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous image"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{color: '#000000'}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="w-full max-w-2xl overflow-hidden">
          <div className="relative" style={{ minHeight: '420px' }}>
            <div className="absolute inset-0 flex flex-col">
              <img 
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full rounded-lg object-contain"
                style={{ maxHeight: '390px' }}
              />
              <p className="text-sm text-gray-600 mt-2 text-center">{currentImage.caption}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next image"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{color: '#000000'}}
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

      <div className="flex justify-center mt-6 gap-2">
        {activityImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'w-6' : 'w-2'
            }`}
            style={{backgroundColor: currentIndex === index ? '#000000' : '#D1D5DB'}}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Drawing Conclusions Carousel Component
function DrawingConclusionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const conclusions = [
    { id: 1, src: tunelink7, alt: 'Drawing conclusion 1', caption: 'User 1: Pop - Party in the USA' },
    { id: 2, src: tunelink8, alt: 'Drawing conclusion 2', caption: 'User 2: Pop - Party in the USA' },
    { id: 3, src: tunelink9, alt: 'Drawing conclusion 3', caption: 'User 3: Pop - Party in the USA' },
    { id: 4, src: tunelink10, alt: 'Drawing conclusion 4', caption: 'User 4: Pop - Party in the USA' },
    { id: 5, src: tunelink11, alt: 'Drawing conclusion 5', caption: 'User 1: Rap - 1738' },
    { id: 6, src: tunelink12, alt: 'Drawing conclusion 6', caption: 'User 2: Rap - 1738' },
    { id: 7, src: tunelink13, alt: 'Drawing conclusion 7', caption: 'User 3: Rap - 1738' },
    { id: 8, src: tunelink14, alt: 'Drawing conclusion 8', caption: 'User 4: Rap - 1738' },
    { id: 9, src: tunelink15, alt: 'Drawing conclusion 9', caption: 'User 1: Country - Take Me Home, Country Roads' },
    { id: 10, src: tunelink16, alt: 'Drawing conclusion 10', caption: 'User 2: Country - Take Me Home, Country Roads' },
    { id: 11, src: tunelink17, alt: 'Drawing conclusion 11', caption: 'User 3: Country - Take Me Home, Country Roads' },
    { id: 12, src: tunelink18, alt: 'Drawing conclusion 12', caption: 'User 4: Country - Take Me Home, Country Roads' },
    { id: 13, src: tunelink19, alt: 'Drawing conclusion 13', caption: 'User 1: Rock - We Will Rock You' },
    { id: 14, src: tunelink20, alt: 'Drawing conclusion 14', caption: 'User 2: Rock - We Will Rock You' },
    { id: 15, src: tunelink21, alt: 'Drawing conclusion 15', caption: 'User 3: Rock - We Will Rock You' },
    { id: 16, src: tunelink22, alt: 'Drawing conclusion 16', caption: 'User 4: Rock - We Will Rock You' },
    { id: 17, src: tunelink23, alt: 'Drawing conclusion 17', caption: 'User 1: Classical - Autumn' },
    { id: 18, src: tunelink24, alt: 'Drawing conclusion 18', caption: 'User 2: Classical - Autumn' },
    { id: 19, src: tunelink25, alt: 'Drawing conclusion 19', caption: 'User 3: Classical - Autumn' },
    { id: 20, src: tunelink26, alt: 'Drawing conclusion 20', caption: 'User 4: Classical - Autumn' }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(conclusions.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? totalPages - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === totalPages - 1 ? 0 : prevIndex + 1;
    });
  };

  const startIdx = currentIndex * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = conclusions.slice(startIdx, endIdx);

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={handlePrevious}
          className="absolute -left-4 md:-left-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous items"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{color: '#000000'}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="w-full overflow-hidden">
          <div className="relative" style={{ minHeight: '330px' }}>
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col"
                >
                  <div className="flex-grow flex items-end">
                    <img 
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-lg object-contain"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute -right-4 md:-right-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next items"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{color: '#000000'}}
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

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'w-6' : 'w-2'
            }`}
            style={{backgroundColor: currentIndex === index ? '#000000' : '#D1D5DB'}}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// More Projects Component
function MoreProjects({ currentProjectId }) {
  const moreProjects = getRandomProjects(currentProjectId, 3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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
                {isMobile ? (
                  <div className="relative w-full overflow-hidden" style={{ paddingTop: '66.67%' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 md:h-56 lg:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
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

// Main TuneLink Component
export default function TuneLink() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-100 pt-20 sm:pt-24 pb-8 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 leading-tight" style={{color: '#20BF50'}}>
                TuneLink
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-4 md:mb-8">
              A social app that connects music listeners through collectible icons that reflect their shared tastes and listening habits.
              </p>
              <div className="flex flex-wrap gap-3">
              <a
                href="https://www.figma.com/proto/DsjplEabs6ynZ6VC2O5u4B/T-Aspen-Tabar?page-id=1%3A5&node-id=6400-12408&viewport=-761%2C882%2C0.08&t=1Vgh0AGgNGbX5x1L-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=6400%3A12408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-xs sm:text-sm"
              >
                View Figma Prototype
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
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
            </div>
          </RevealOnScroll>

          {/* Information Grid */}
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#de24cb'}}>
                  Role
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  UI/UX Designer & Researcher
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#de24cb'}}>
                  Focus
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  UI/UX, Prototyping, Social Interaction
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#de24cb'}}>
                  Tools
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  Figma
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-16">
        {/* Main Image */}
        <RevealOnScroll>
          <div className="mb-12 md:mb-36 -mx-4 sm:-mx-6 lg:-mx-12">
            <div className="relative overflow-hidden rounded-lg lg:rounded-3xl shadow-2xl">
              <img
                src={tunelink3}
                alt="TuneLink App Interface"
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Project Overview Section */}
        <RevealOnScroll>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#20BF50'}}>
              Project Overview
            </h2>
            <div className="max-w-3xl">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                TuneLink is a social music app that connects listeners through collectible icons that reflect their shared tastes and listening habits. These icons are earned based on users' music activity, ranging from total listening time to the exploration of new genres. Beyond statistics, TuneLink encourages connection through a shared love of music, allowing users to chat, compare achievements, and discover others nearby with similar interests.
              </p>
            </div>
          </section>
        </RevealOnScroll>
      </div>

      {/* Background Section */}
      <div className="bg-gray-100 py-12 md:py-24 mb-12 md:mb-28 mt-12 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Background
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  The idea for TuneLink came from exploring how music connects people beyond playlists and algorithms. Many existing platforms focus on personal discovery, but few emphasize social discovery through music. This project set out to design a mobile experience where music becomes a bridge between users by turning listening habits into opportunities for interaction.
                </p>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Need Finding Interviews Section */}
        <RevealOnScroll>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
              Need Finding Interviews
            </h2>
            <div className="max-w-3xl">
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                To better understand how people relate to music socially, I conducted interviews focused on how users visualize and emotionally connect with sound. These insights guided TuneLink's visual and interaction design, ensuring it reflected how people already use music as a form of expression.
              </p>
            </div>
            <div className="flex justify-center mb-12">
              <img 
                src={tunelink4}
                alt="Medium Script" 
                className="w-full max-w-2xl rounded-lg"
              />
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 mt-12" style={{color: '#000000'}}>
              Activity 1
            </h3>
            <div className="max-w-3xl">
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                For the first activity, participants completed "this or that" questions while five different songs were played one at a time. This activity helped describe how different genres of music "felt" to them.
              </p>
            </div>
            <div className="flex justify-center mb-10">
              <img 
                src={tunelink5}
                alt="Medium Activity 1" 
                className="w-full max-w-2xl rounded-lg"
              />
            </div>
            
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 mt-10" style={{color: '#000000'}}>
              Results
            </h4>
            {/* Activity 1 Image Carousel */}
            <div>
              <Activity1Carousel />
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 mt-16" style={{color: '#000000'}}>
              Activity 2
            </h3>
            <div className="max-w-3xl">
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                For the second activity, participants created simple digital images using basic shapes in response to the same five songs, played one at a time. This activity represented how different music genres "looked" to them. Both of these activities helped me make design choices for the app.
              </p>
            </div>
            <div className="flex justify-center mb-10">
              <img 
                src={tunelink6}
                alt="Medium Activity 2" 
                className="w-full max-w-2xl rounded-lg"
              />
            </div>
            
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 mt-10" style={{color: '#000000'}}>
              Results
            </h4>
            {/* Drawing Conclusions Carousel */}
            <DrawingConclusionsCarousel />
          </section>
        </RevealOnScroll>
      </div>

      {/* How Might We Question Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                How Might We Question
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-4">
                  From the interviews, I developed the guiding question:
                </p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 lg:whitespace-nowrap">
                "How might we make listening to music a community bonding activity for college students?"
              </p>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  This question shaped every design decision, focusing the app around connection, identity, and the social side of music discovery.
                </p>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="space-y-16 md:space-y-28">
          {/* User Persona Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                User Persona
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  I developed a user persona to represent a typical TuneLink user, such as college students who spend hours each week exploring new artists and sharing tracks with friends.
                </p>
              </div>
              <div className="flex justify-center mt-10">
                <img 
                  src={tunelink32}
                  alt="User Persona" 
                  className="w-full max-w-2xl rounded-lg"
                />
              </div>
            </section>
          </RevealOnScroll>

          {/* Site Map Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Site Map
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  The site map outlines how TuneLink's core features connect, from earning icons and chatting with users to exploring the map and managing a personalized profile. Mapping this structure early helped clarify the app's hierarchy, ensuring that discovery and connection remained intuitive and easy to access.
                </p>
              </div>
              <div className="flex justify-center mt-10">
                <img 
                  src={tunelink33}
                  alt="Site Map" 
                  className="w-full max-w-3xl rounded-lg"
                />
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      {/* Workflows Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Workflows
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  I created workflows to visualize how users would complete key actions, like discovering new connections or changing profile icons. These flows helped refine the user's journey.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <img 
                  src={tunelink38}
                  alt="Workflow 1" 
                  className="w-full rounded-lg"
                />
                <img 
                  src={tunelink39}
                  alt="Workflow 2" 
                  className="w-full rounded-lg"
                />
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="space-y-16 md:space-y-28">
          {/* Paper Wireframes Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Paper Wireframes
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  Initial paper sketches explored different layout possibilities for TuneLink's main screens. These wireframes shows my initial ideas, a simplistic look, and easily accessible design. Rapid sketching helped me iterate quickly before committing to digital prototypes.
                </p>
              </div>
              <img 
                src={tunelink34}
                alt="Paper Wireframes" 
                className="w-full rounded-lg mt-6"
              />
            </section>
          </RevealOnScroll>

          {/* Low Fidelity Wireframe Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Low Fidelity Wireframe
              </h2>
              <div className="mb-6">
                <a
                  href="https://www.figma.com/proto/DsjplEabs6ynZ6VC2O5u4B/T-Aspen-Tabar?page-id=1%3A4&node-id=6095-11627&viewport=498%2C-369%2C0.1&t=afKqycP2ZWnDdq0I-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=6095%3A11627&show-proto-sidebar=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-xs sm:text-sm"
                >
                  View Low Fidelity Prototype
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
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
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  The low-fidelity wireframes translated early ideas into functional screen designs. They demonstrated the placement of icons, menus, and navigation elements, and were used for early usability feedback to confirm that users could intuitively navigate between listening stats, profiles, chat features, and the map.
                </p>
              </div>
              <div className="-mx-4 sm:-mx-6 lg:-mx-12 mt-6">
                <img 
                  src={tunelink35}
                  alt="Low Fidelity Wireframe" 
                  className="w-full rounded-lg"
                />
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      {/* Usability Testing Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Usability Testing
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  I conducted a usability test with a college student who is a frequent music app users. Their feedback highlighted the importance of clear navigation, a minimalist interface, and visible interactive elements. Iterations following testing emphasized clickable areas and refined the home screen's welcoming tone.
                </p>
              </div>
              <img 
                src={tunelink40}
                alt="Usability Testing" 
                className="w-full rounded-lg mt-6"
              />
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="space-y-16 md:space-y-28">
          {/* Incorporation of Familiar Design Systems Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Incorporation of Familiar Design Systems
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                In designing TuneLink, I examined Spotify's visual language, drawing inspiration from its color palette and typography to build familiarity and trust. In addition, I researched and incorporated UI components from Snapchat create an intuitive user experience.
                </p>
              </div>
              <img 
                src={tunelink36}
                alt="Design Systems Integration" 
                className="w-full rounded-lg mt-6"
              />
            </section>
          </RevealOnScroll>

          {/* High Fidelity Prototype Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#20BF50'}}>
                High Fidelity Prototype
              </h2>
              <div className="mb-6">
                <a
                  href="https://www.figma.com/proto/DsjplEabs6ynZ6VC2O5u4B/T-Aspen-Tabar?page-id=1%3A5&node-id=6400-12408&viewport=-761%2C882%2C0.08&t=1Vgh0AGgNGbX5x1L-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=6400%3A12408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-xs sm:text-sm"
                >
                  View High Fidelity Prototype
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
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
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  The final high-fidelity prototype reflects TuneLink's complete visual identity, featuring strong iconography inspired by music genres and multiple ways for users to connect socially.
                </p>
              </div>
              {/* Large presentation images */}
              <div className="mt-16 md:mt-24 space-y-4 md:space-y-6">
                <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
                  <img 
                    src={tunelink37}
                    alt="High Fidelity Prototype" 
                    className="w-full object-contain"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
                  <video 
                    className="w-full object-contain" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    controls
                  >
                    <source src={tunelinkvid} type="video/mp4" />
                  </video>
                </div>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      {/* More Projects Section */}
      <MoreProjects currentProjectId="TuneLink" />
    </section>
  );
}