import React from 'react';
import ArsImg from "../../assets/arsElecronica.jpeg";

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



export function ArsElectronicaFutureLab() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Section with improved spacing */}
        <RevealOnScroll>
          <div className="mb-20 md:mb-24">
            
            {/* Title and Description */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-purple-900 leading-tight">
              Color Quandary
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl">
              An interactive installation created at Ars Electronica Futurelab Academy, 
              transforming public movement into large-scale digital competition on the 
              museum's programmable media façade.
            </p>
          </div>
        </RevealOnScroll>

        {/* Metadata Grid with better visual separation */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-28 p-8 md:p-10 bg-white rounded-2xl shadow-sm border border-purple-100">
            <div className="space-y-2">
              <h3 className="uppercase text-xs font-bold text-purple-600 tracking-wider">Role</h3>
              <p className="text-gray-800 font-medium">UI/UX Designer & Creative Coder</p>
            </div>
            <div className="space-y-2">
              <h3 className="uppercase text-xs font-bold text-purple-600 tracking-wider">Location</h3>
              <p className="text-gray-800 font-medium">Linz, Austria</p>
            </div>
            <div className="space-y-2">
              <h3 className="uppercase text-xs font-bold text-purple-600 tracking-wider">Platforms</h3>
              <p className="text-gray-800 font-medium">Media Façade, Public Space</p>
            </div>
            <div className="space-y-2">
              <h3 className="uppercase text-xs font-bold text-purple-600 tracking-wider">Focus</h3>
              <p className="text-gray-800 font-medium">HCI, Interactive Art</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Hero Image with enhanced presentation */}
        <RevealOnScroll>
          <div className="mb-28 md:mb-36 -mx-6 lg:-mx-12">
            <div className="relative overflow-hidden rounded-none lg:rounded-3xl shadow-2xl">
              <img
                src={ArsImg}
                alt="Color Quandary installation at Ars Electronica"
                className="w-full object-cover"
                style={{ aspectRatio: '16/9' }}
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