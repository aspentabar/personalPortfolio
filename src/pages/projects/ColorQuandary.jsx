import React from 'react';
import ArsImg from "../../assets/arsElecronica.jpeg";
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
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-15">
              An interactive installation exploring how human computer interactions can turn audience movement into large-scale visual competition.
              </p>
            </div>
          </RevealOnScroll>

          {/* Information Grid */}
          <RevealOnScroll>
          <div class="flex flex-col gap-6 md:flex-row my-8">
            <div class="flex flex-col items-start pr-6">
              <p class="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Role</p>
              <p class="text-neutral-950">UX Designer & Creative Coder</p>
            </div>

            <div class="flex flex-col items-start pr-6 md:pl-6">
              <p class="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Location</p>
              <p class="text-neutral-950">Linz, Austria</p>
            </div>

            <div class="flex flex-col items-start pr-6 md:pl-6">
              <p class="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Platforms</p>
              <p class="text-neutral-950">Public Media Façade</p>
            </div>

            <div class="flex flex-col items-start md:pl-6">
              <p class="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Focus</p>
              <p class="text-neutral-950">HCI & Interactive Art</p>
            </div>

            <div class="flex flex-col items-start md:pl-6">
              <p class="text-purple-400 uppercase font-bold tracking-wider text-[14px]">Collaborators</p>
              <p class="text-neutral-950">Ellie Williams, Marta Hill</p>
            </div>
          </div>
        </RevealOnScroll>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">

        {/* Image */}
        <RevealOnScroll>
        <div className="mb-28 md:mb-36 -mx-6 lg:-mx-12 -mt-[0px]">


        <div className="relative overflow-hidden rounded-none lg:rounded-3xl shadow-2xl">
          <video
            src={ArsVid}
            className="w-full object-cover"
            style={{ aspectRatio: '16/9' }} 
            autoPlay 
            loop 
            playsInline
            controls
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
        </div>

          </div>
        </RevealOnScroll>

        {/* Case Study Content with improved spacing and typography */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-20 md:space-y-28">
            
            <RevealOnScroll>
              <section className="relative">
                <div className="absolute -left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                <div className="pl-8 md:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Background</h2>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                    In Summer 2023, I joined the Ars Electronica Futurelab Academy in Linz, 
                    Austria as part of a Northeastern University cohort. Over three intensive 
                    days, we collaborated with Futurelab researchers to design interactive 
                    projects for the museum's iconic programmable media façade. The program 
                    emphasized human-computer interaction, creative coding, and public engagement 
                    through large-scale digital art.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section className="relative">
                <div className="absolute -left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                <div className="pl-8 md:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Project Overview</h2>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                    My team developed <em className="font-semibold text-purple-700">Color Quandary</em>, an interactive color competition 
                    that invited passersby to "vote with their feet" on the museum's main deck. 
                    Using motion detection, participants chose between two colors projected on 
                    the Ars Electronica façade. Their movement determined the outcome, with the 
                    winning color overtaking the building in real time. The game unfolded in a 
                    series of elimination rounds, culminating in a final champion color and a 
                    visual display of the standings across the façade.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section className="relative">
                <div className="absolute -left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                <div className="pl-8 md:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Design & Development</h2>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                    I designed and coded the interaction system in Java/Processing, integrating 
                    motion tracking with generative visuals for the large-scale display. The 
                    challenge was to balance playful simplicity with technical feasibility so 
                    that anyone walking by could intuitively participate. Inspiration came from 
                    familiar "this or that" decision games, reimagined at architectural scale 
                    to transform the façade into a stage for collective choice.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section className="relative">
                <div className="absolute -left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                <div className="pl-8 md:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Final Presentation</h2>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                    At the closing event, our project was presented live to an international 
                    audience of scientists, artists, and the Linz community. Visitors experienced 
                    <em className="font-semibold text-purple-700"> Color Quandary </em> directly on the plaza, engaging in spontaneous 
                    group play and discussions sparked by the visual competition. The work 
                    demonstrated how human-computer interaction can turn public space into a 
                    canvas for both entertainment and reflection.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            <RevealOnScroll>
              <section className="relative">
                <div className="absolute -left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                <div className="pl-8 md:pl-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Impact & Reflection</h2>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                    Through this project, I gained hands-on experience in human-centered 
                    computing, interactive art, and cross-cultural collaboration. Showcasing 
                    creative coding at Ars Electronica—the world's leading festival for art, 
                    technology, and society—was both technically challenging and deeply rewarding. 
                    The experience reinforced my interest in designing interfaces that connect 
                    people, technology, and shared public experiences.
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