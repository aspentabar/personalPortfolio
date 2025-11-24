import React, { useRef, useEffect, useState } from 'react';
import omnom3 from "../../assets/omnom3.png";

// Placeholder images - replace these with your actual image imports
const placeholderImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif' font-size='24'%3EImage Placeholder%3C/text%3E%3C/svg%3E";

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

// Storyboard Carousel Component
function StoryboardCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const storyboards = [
    { id: 1, src: placeholderImg, alt: 'Eric Storyboard Frame 1', caption: 'Eric searches for recipes online' },
    { id: 2, src: placeholderImg, alt: 'Eric Storyboard Frame 2', caption: 'Eric remembers OmNom.ai' },
    { id: 3, src: placeholderImg, alt: 'Eric Storyboard Frame 3', caption: 'Takes pictures of pantry' },
    { id: 4, src: placeholderImg, alt: 'Eric Storyboard Frame 4', caption: 'Selects recipe and cooks' },
    { id: 5, src: placeholderImg, alt: 'Emily Storyboard Frame 1', caption: 'Emily comes home late' },
    { id: 6, src: placeholderImg, alt: 'Emily Storyboard Frame 2', caption: 'Remembers OmNom.ai' },
    { id: 7, src: placeholderImg, alt: 'Emily Storyboard Frame 3', caption: 'Takes picture of ingredients' },
    { id: 8, src: placeholderImg, alt: 'Emily Storyboard Frame 4', caption: 'Makes dinner quickly' }
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(storyboards.length / itemsPerPage);

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
  const currentItems = storyboards.slice(startIdx, endIdx);

  return (
    <div className="relative mt-8">
      <div className="flex items-center">
        <button
          onClick={handlePrevious}
          className="absolute -left-4 md:-left-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous items"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#000000'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentItems.map((item) => (
              <div key={item.id} className="flex flex-col">
                <img src={item.src} alt={item.alt} className="w-full rounded-lg object-contain" style={{ maxHeight: '200px' }} />
                <p className="text-sm text-gray-600 mt-2 text-center">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute -right-4 md:-right-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next items"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#000000'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6' : ''}`}
            style={{backgroundColor: currentIndex === index ? '#000000' : '#D1D5DB'}}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Main OmNom Component
export default function OmNom() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-100 pt-20 sm:pt-24 pb-8 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-8 leading-tight" style={{color: '#4CA347'}}>
                OmNom.ai
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-4 md:mb-8">
                An AI-powered recipe app that recommends meals based on ingredients you already have, reducing food waste while making cooking accessible and enjoyable.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.figma.com/proto/lXKM3UyAqVmAMhazrXpm79/Hi-Fi-Prototype?page-id=400%3A344&node-id=400-1957&viewport=416%2C95%2C0.11&t=LzlblRephWv6id61-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=400%3A1957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-xs sm:text-sm"
                >
                  View Figma Prototype
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Information Grid */}
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 mt-6 md:mt-8">
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#4CA347'}}>
                  Role
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  UX Designer & Researcher
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#4CA347'}}>
                  Focus
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  AI Integration, Mobile UX, Prototyping
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#4CA347'}}>
                  Tools
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  Figma, Miro
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="uppercase font-bold tracking-wider text-xs md:text-sm" style={{color: '#4CA347'}}>
                  Collaborators
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  Maia Lemos, Jack Rifkin
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
                src={omnom3}
                alt="OmNom.ai App Interface"
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#4CA347'}}>
              Project Overview
            </h2>
            <div className="max-w-3xl">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                OmNom.ai is a mobile app that transforms home cooking by using AI to recognize ingredients in your fridge and pantry, then recommending personalized recipes based on what you already have. The app considers dietary restrictions, cooking abilities, available appliances, and personal preferences to make cooking accessible for everyone while reducing food waste.
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
                  The concept for OmNom.ai emerged from observing how people struggle with meal planning and food waste. Many have ingredients at home but lack inspiration or knowledge to use them effectively. This project aimed to bridge that gap by creating an intelligent assistant that makes recipe discovery intuitive and reduces the barrier to home cooking.
                </p>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* User Research Section */}
        <RevealOnScroll>
          <section>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
              User Research & Interviews
            </h2>
            <div className="max-w-3xl">
              <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                We conducted 6 in-depth interviews with participants ranging from college students to working professionals to understand their cooking habits, pain points, and needs. Our research focused on understanding decision-making around meal preparation and barriers to cooking at home.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-3" style={{color: '#4CA347'}}>Key Findings</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Time constraints are the biggest barrier to cooking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Users want to reduce food waste but lack planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Recipe discovery happens mainly through social media</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Cooking skill level affects willingness to try new recipes</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold mb-3" style={{color: '#4CA347'}}>User Needs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Quick recipe generation based on available ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Personalized recommendations for dietary restrictions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Clear, easy-to-follow cooking instructions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-sm text-gray-700">Ingredient tracking to minimize waste</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </div>

      {/* Design Goals Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Design Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{color: '#4CA347'}}>Task-Based Goals</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Motivate users to try new recipes</li>
                    <li className="text-sm text-gray-700">• Encourage cooking with existing ingredients</li>
                    <li className="text-sm text-gray-700">• Support profile customization for preferences</li>
                    <li className="text-sm text-gray-700">• Help manage perishable ingredients</li>
                    <li className="text-sm text-gray-700">• Simplify the cooking process</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{color: '#4CA347'}}>UX/Usability Goals</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Quick recipe generation process</li>
                    <li className="text-sm text-gray-700">• Easy and intuitive navigation</li>
                    <li className="text-sm text-gray-700">• Well-organized information display</li>
                    <li className="text-sm text-gray-700">• Seamless cooking integration</li>
                    <li className="text-sm text-gray-700">• Personalized recommendations</li>
                  </ul>
                </div>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="space-y-16 md:space-y-28">
          {/* User Personas Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                User Personas
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  Based on our research, we developed two primary personas representing our target users: Eric, a retired engineer eager to explore cooking, and Emily, a busy student needing quick, efficient meal solutions.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <img src={placeholderImg} alt="Eric Persona" className="w-full rounded-lg shadow-md" />
                <img src={placeholderImg} alt="Emily Persona" className="w-full rounded-lg shadow-md" />
              </div>
            </section>
          </RevealOnScroll>

          {/* User Stories & Storyboards Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                User Stories & Storyboards
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  We created detailed user stories and storyboards to visualize how our personas would interact with OmNom.ai in their daily lives, from discovering the app to successfully cooking meals.
                </p>
              </div>
              {/* Storyboard Carousel */}
              <StoryboardCarousel />
            </section>
          </RevealOnScroll>

          {/* Paper Wireframes Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Paper Wireframes
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  Initial sketches explored different layouts for key screens including the camera interface for ingredient recognition, recipe browsing, and user profile customization. These rapid iterations helped establish the app's information architecture.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <img src={placeholderImg} alt="Wireframe 1" className="w-full rounded-lg" />
                <img src={placeholderImg} alt="Wireframe 2" className="w-full rounded-lg" />
                <img src={placeholderImg} alt="Wireframe 3" className="w-full rounded-lg" />
                <img src={placeholderImg} alt="Wireframe 4" className="w-full rounded-lg" />
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      {/* Wizard of Oz Testing Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#000000'}}>
                Wizard of Oz Testing
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-8">
                  We conducted Wizard of Oz testing with 4 participants to evaluate the app's core functionality before building the AI components. Key tasks included ingredient recognition and profile customization.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-3" style={{color: '#4CA347'}}>Key Findings</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Navigation to home page needed improvement</li>
                    <li className="text-sm text-gray-700">• Review page purpose was unclear</li>
                    <li className="text-sm text-gray-700">• Icon for ingredients needed clarification</li>
                    <li className="text-sm text-gray-700">• Users wanted calorie and time filters</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-3" style={{color: '#4CA347'}}>Design Iterations</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700">• Added home icon to navigation bar</li>
                    <li className="text-sm text-gray-700">• Clarified review page instructions</li>
                    <li className="text-sm text-gray-700">• Combined filter and sort functions</li>
                    <li className="text-sm text-gray-700">• Updated ingredient icon design</li>
                  </ul>
                </div>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="space-y-16 md:space-y-28">
          {/* High Fidelity Prototype Section */}
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{color: '#4CA347'}}>
                High Fidelity Prototype
              </h2>
              <div className="mb-6">
                <a
                  href="https://www.figma.com/proto/lXKM3UyAqVmAMhazrXpm79/Hi-Fi-Prototype?page-id=400%3A344&node-id=400-1957&viewport=416%2C95%2C0.11&t=LzlblRephWv6id61-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=400%3A1957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-xs sm:text-sm"
                >
                  View High Fidelity Prototype
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  The final prototype features a complete visual identity with an intuitive camera-based ingredient recognition system, personalized recipe recommendations, and streamlined user flows that make cooking accessible for users of all skill levels.
                </p>
              </div>
              
              {/* Key Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="#4CA347" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2" style={{color: '#4CA347'}}>AI Image Recognition</h3>
                  <p className="text-sm text-gray-700">Instantly identify ingredients with your camera and build your digital pantry</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="#4CA347" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2" style={{color: '#4CA347'}}>Smart Filtering</h3>
                  <p className="text-sm text-gray-700">Filter recipes by dietary restrictions, cooking time, and available appliances</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="#4CA347" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2" style={{color: '#4CA347'}}>Recipe Collection</h3>
                  <p className="text-sm text-gray-700">Save and organize your favorite recipes for quick access</p>
                </div>
              </div>
              
              {/* Large presentation images */}
              <div className="mt-16 md:mt-24 space-y-4 md:space-y-6">
                <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
                  <img src={placeholderImg} alt="App Screens Overview" className="w-full object-contain" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <img src={placeholderImg} alt="Camera Screen" className="w-full rounded-lg shadow-md" />
                  <img src={placeholderImg} alt="Recipe List" className="w-full rounded-lg shadow-md" />
                  <img src={placeholderImg} alt="Profile Screen" className="w-full rounded-lg shadow-md" />
                  <img src={placeholderImg} alt="Recipe Detail" className="w-full rounded-lg shadow-md" />
                </div>
              </div>
            </section>
          </RevealOnScroll>
        </div>

        {/* Bottom Navigation */}
        <RevealOnScroll>
          <div className="mt-12 md:mt-32 pt-6 md:pt-16 mb-8 md:mb-24 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8">
              <div className="w-full md:w-auto">
                <p className="text-xs sm:text-sm font-medium mb-2 md:mb-3" style={{color: '#4CA347'}}>Key Concepts</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-green-700 rounded-lg text-xs md:text-sm font-medium" style={{backgroundColor: '#E6F9EC'}}>
                    AI Integration
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-green-700 rounded-lg text-xs md:text-sm font-medium" style={{backgroundColor: '#E6F9EC'}}>
                    Mobile UX
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-green-700 rounded-lg text-xs md:text-sm font-medium" style={{backgroundColor: '#E6F9EC'}}>
                    Food Tech
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-green-700 rounded-lg text-xs md:text-sm font-medium" style={{backgroundColor: '#E6F9EC'}}>
                    Sustainability
                  </span>
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-green-700 rounded-lg text-xs md:text-sm font-medium" style={{backgroundColor: '#E6F9EC'}}>
                    User Research
                  </span>
                </div>
              </div>
              <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                <button 
                  className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-white rounded-xl font-medium transition-colors text-xs sm:text-sm md:text-base w-full sm:w-auto" 
                  style={{backgroundColor: '#4CA347'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#3A8A37'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4CA347'}>
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