import React, { useRef, useEffect } from 'react';
import ArsVid from "../../assets/ArsVid1.mp4";

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
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Design & Development</h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    I designed and coded the interaction system in Java/Processing, integrating motion tracking with generative visuals for the large-scale display. The challenge was to balance playful simplicity with technical feasibility so that anyone walking by could intuitively participate. Inspiration came from familiar "this or that" decision games, reimagined at architectural scale to transform the façade into a stage for collective choice.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Final Presentation</h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    At the closing event, our project was presented live to an international audience of scientists, artists, and the Linz community. Visitors experienced Color Quandary directly on the plaza, engaging in spontaneous group play and discussions sparked by the visual competition. The work demonstrated how human-computer interaction can turn public space into a canvas for both entertainment and reflection.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Impact & Reflection</h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Through this project, I gained hands-on experience in human-centered computing, interactive art, and cross-cultural collaboration. Showcasing creative coding at Ars Electronica—the world's leading festival for art, technology, and society—was both technically challenging and deeply rewarding. The experience reinforced my interest in designing interfaces that connect people, technology, and shared public experiences.
                  </p>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>

        {/* Bottom Navigation or Call to Action */}
        <RevealOnScroll>
          <div className="mt-32 md:mt-40 pt-16 md:pt-20 border-t border-purple-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <p className="text-sm text-purple-600 font-medium mb-2">Technologies Used</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Processing</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Java</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Motion Tracking</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">Generative Design</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors">
                View Next Project →
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}