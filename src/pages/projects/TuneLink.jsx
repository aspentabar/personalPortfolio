import React, { useRef, useEffect, useState } from 'react';
import tunelink3 from "../../assets/tunelink3.png";
import tunelink4 from "../../assets/tunelink4.jpeg";
import tunelink5 from "../../assets/tunelink5.jpeg";
import tunelink6 from "../../assets/tunelink6.jpeg";

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
      <div className="bg-gray-100 pt-24 sm:pt-16 pb-10 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-purple-700 leading-tight">
                TuneLink
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-6 md:mb-8">
                A social music app that connects listeners through collectible icons that reflect their shared tastes and listening habits.
              </p>
              <div className="flex flex-wrap gap-3">
              <a
                href="https://www.figma.com/proto/DsjplEabs6ynZ6VC2O5u4B/T-Aspen-Tabar?page-id=1%3A5&node-id=6400-12408&viewport=-761%2C882%2C0.08&t=1Vgh0AGgNGbX5x1L-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=6400%3A12408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-sm"
              >
                View Figma Prototype
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
            </div>
          </RevealOnScroll>

          {/* Information Grid */}
          <RevealOnScroll>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-xs md:text-sm">
                  Role
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  UX Designer & Researcher
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-purple-400 uppercase font-bold tracking-wider text-xs md:text-sm">
                  Focus
                </p>
                <p className="text-neutral-950 text-sm md:text-base">
                  HCI, Social Interaction, UX
                </p>
              </div>
              <div className="flex flex-col items-start">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
        {/* Main Image */}
        <RevealOnScroll>
          <div className="mb-20 md:mb-36 -mx-0 sm:-mx-6 lg:-mx-12">
            <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
              <img
                src={tunelink3}
                alt="TuneLink App Interface"
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Project Overview Section */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                  Project Overview
                </h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    TuneLink is a social music app that connects listeners through collectible icons that reflect their shared tastes and listening habits. These icons are earned based on users' music activity, ranging from total listening time to the exploration of new genres. Beyond statistics, TuneLink encourages connection through a shared love of music, allowing users to chat, compare achievements, and discover others nearby with similar interests.
                  </p>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Background Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
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
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            {/* Need Finding Interviews Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                  Need Finding Interviews
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    To better understand how people relate to music socially, I conducted interviews focused on how users visualize and emotionally connect with sound. These insights guided TuneLink's visual and interaction design, ensuring it reflected how people already use music as a form of expression.
                  </p>
                  <div className="flex justify-center">
                    <img 
                      src={tunelink4}
                      alt="Medium Script" 
                      className="w-full max-w-2xl rounded-lg mt-6"
                    />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-6">
                    For the first activity, participants completed "this or that" questions while five different songs were played one at a time. This activity helped describe how different genres of music "felt" to them.
                  </p>
                  <div className="flex justify-center">
                    <img 
                      src={tunelink5}
                      alt="Medium Activity 1" 
                      className="w-full max-w-2xl rounded-lg mt-6"
                    />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-6">
                    For the second activity, participants created simple digital images using basic shapes in response to the same five songs, played one at a time. This activity represented how different music genres "looked" to them. Both of these activities helped me make design choices for the app.
                  </p>
                  <div className="flex justify-center">
                    <img 
                      src={tunelink6}
                      alt="Medium Activity 2" 
                      className="w-full max-w-2xl rounded-lg mt-6"
                    />
                  </div>
                  
                  {/* Marisol grid of 4 images */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div>
                      <img 
                        src="https://via.placeholder.com/400x300/E9D5FF/9333EA?text=Conclusion+1" 
                        alt="Drawing conclusion 1" 
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center">Drawing conclusion 1</p>
                    </div>
                    <div>
                      <img 
                        src="https://via.placeholder.com/400x300/E9D5FF/9333EA?text=Conclusion+2" 
                        alt="Drawing conclusion 2" 
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center">Drawing conclusion 2</p>
                    </div>
                    <div>
                      <img 
                        src="https://via.placeholder.com/400x300/E9D5FF/9333EA?text=Conclusion+3" 
                        alt="Drawing conclusion 3" 
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center">Drawing conclusion 3</p>
                    </div>
                    <div>
                      <img 
                        src="https://via.placeholder.com/400x300/E9D5FF/9333EA?text=Conclusion+4" 
                        alt="Drawing conclusion 4" 
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center">Drawing conclusion 4</p>
                    </div>
                  </div>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* How Might We Question Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                How Might We Question
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  From the interviews, I developed the guiding question: "How might we make listening to music a community bonding activity for college students?" This question shaped every design decision, focusing the app around connection, identity, and the social side of music discovery.
                </p>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            {/* User Personas Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                  User Personas
                </h2>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    I developed a user personas to represent a typical TuneLink users, such as college students who spend hours each week exploring new artists and sharing tracks with friends.
                  </p>
                  <img 
                    src="https://via.placeholder.com/800x500/E9D5FF/9333EA?text=Medium+1+Persona+Image" 
                    alt="User Persona" 
                    className="w-full rounded-lg mt-6"
                  />
                </div>
              </section>
            </RevealOnScroll>

            {/* Site Map Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6 mt-16 md:mt-20 lg:mt-32">
                  Site Map
                </h2>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The site map outlines how TuneLink's core features connect, from earning icons and chatting with users to exploring the map and managing a personalized profile. Mapping this structure early helped clarify the app's hierarchy, ensuring that discovery and connection remained intuitive and easy to access.
                  </p>
                  <img 
                    src="https://via.placeholder.com/800x500/E9D5FF/9333EA?text=Medium+Image+of+Site+Map" 
                    alt="Site Map" 
                    className="w-full rounded-lg mt-6"
                  />
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Workflows Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                Workflows
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  I created workflows to visualize how users would complete key actions, like discovering new connections or earning music icons. These flows helped refine the user's journey.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <img 
                  src="https://via.placeholder.com/600x400/E9D5FF/9333EA?text=Workflow+1" 
                  alt="Workflow 1" 
                  className="w-full rounded-lg"
                />
                <img 
                  src="https://via.placeholder.com/600x400/E9D5FF/9333EA?text=Workflow+2" 
                  alt="Workflow 2" 
                  className="w-full rounded-lg"
                />
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            {/* Paper Wireframes Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                  Paper Wireframes
                </h2>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Initial paper sketches explored different layout possibilities for TuneLink's main screens. These wireframes emphasized clear navigation, a minimal look, and easily recognizable visual cues tied to the music icons. Rapid sketching helped me iterate quickly before committing to digital prototypes.
                  </p>
                  <img 
                    src="https://via.placeholder.com/800x500/E9D5FF/9333EA?text=Paper+Wireframes" 
                    alt="Paper Wireframes" 
                    className="w-full rounded-lg mt-6"
                  />
                </div>
              </section>
            </RevealOnScroll>

            {/* Low Fidelity Wireframe Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6 mt-16 md:mt-20 lg:mt-32">
                  Low Fidelity Wireframe
                </h2>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The low-fidelity wireframes translated early ideas into functional screen designs. They demonstrated the placement of icons, menus, and navigation elements, and were used for early usability feedback to confirm that users could intuitively navigate between listening stats, profiles, and chat features.
                  </p>
                  <img 
                    src="https://via.placeholder.com/800x500/E9D5FF/9333EA?text=Low+Fidelity+Wireframe" 
                    alt="Low Fidelity Wireframe" 
                    className="w-full rounded-lg mt-6"
                  />
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Usability Testing Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                Usability Testing
              </h2>
              <div className="max-w-3xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  I conducted a usability test with a college student who is a frequent music app users. Their feedback highlighted the importance of clear navigation, a minimalist interface, and visible interactive elements. Iterations following testing emphasized clickable areas and refined the home screen's welcoming tone.
                </p>
              </div>
              <img 
                src="https://via.placeholder.com/800x500/E9D5FF/9333EA?text=Usability+Testing" 
                alt="Usability Testing" 
                className="w-full rounded-lg mt-6"
              />
            </section>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            {/* Spotify Scheme Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6">
                  Incorporation of Spotify Scheme
                </h2>
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Since TuneLink integrates with existing streaming platforms, I adopted elements of Spotify's recognizable color palette to establish familiarity while maintaining TuneLink's unique identity. The use of deep greens and clean neutrals helps connect the interface to users' existing mental models while enhancing the visual cohesion of the app.
                  </p>
                  <img 
                    src="https://via.placeholder.com/800x500/E9D5FF/9333EA?text=Spotify+Scheme+Integration" 
                    alt="Spotify Scheme" 
                    className="w-full rounded-lg mt-6"
                  />
                </div>
              </section>
            </RevealOnScroll>

            {/* High Fidelity Prototype Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-4 md:mb-6 mt-16 md:mt-20 lg:mt-32">
                  High Fidelity Prototype
                </h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The final high-fidelity prototype reflects TuneLink's complete visual identity, featuring strong iconography inspired by music genres and multiple ways for users to connect socially.
                  </p>
                </div>
                {/* Large presentation images */}
                <div className="mt-16 md:mt-24 -mx-0 sm:-mx-6 lg:-mx-12 space-y-4 md:space-y-6">
                  <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
                    <img 
                      src="https://via.placeholder.com/1200x675/E9D5FF/9333EA?text=High+Fidelity+Prototype" 
                      alt="High Fidelity Prototype" 
                      className="w-full object-cover" 
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl lg:rounded-3xl shadow-2xl">
                    <video 
                      className="w-full object-cover" 
                      style={{ aspectRatio: '16/9' }} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      controls
                    >
                      <source src="https://videos.pexels.com/video-files/3129971/3129971-hd_1280_720_25fps.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>

        {/* Bottom Navigation */}
        <RevealOnScroll>
          <div className="mt-16 md:mt-32 pt-8 md:pt-16 mb-12 md:mb-24 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-8">
              <div>
                <p className="text-sm text-purple-600 font-medium mb-3">Key Concepts</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium">
                    UX Research
                  </span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium">
                    HCI
                  </span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium">
                    Gamification
                  </span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium">
                    Social UX
                  </span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium">
                    Prototyping
                  </span>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-50 text-purple-700 rounded-lg text-xs md:text-sm font-medium">
                    Music Discovery
                  </span>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <button className="px-6 py-3 md:px-8 md:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors text-sm md:text-base">
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