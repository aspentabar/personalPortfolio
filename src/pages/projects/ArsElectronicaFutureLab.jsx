import { RevealOnScroll } from "../../components/RevealOnScroll";
import ArsImg from "../../assets/arsElecronica.jpeg";

export function ArsElectronicaFutureLab() {
  return (
    <section className="min-h-screen bg-white text-purple-700 py-20 pt-30">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Color Quandary</h1>
          <p className="text-xl text-gray-700 mb-8">
            An interactive installation created at Ars Electronica Futurelab Academy, 
            transforming public movement into large-scale digital competition on the 
            museum’s programmable media façade.
          </p>

          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="uppercase font-semibold text-purple-600 mb-1">Role</h3>
              <p>Interaction Designer & Creative Coder</p>
            </div>
            <div>
              <h3 className="uppercase font-semibold text-purple-600 mb-1">Location</h3>
              <p>Linz, Austria</p>
            </div>
            <div>
              <h3 className="uppercase font-semibold text-purple-600 mb-1">Platforms</h3>
              <p>Media Façade, Public Space</p>
            </div>
            <div>
              <h3 className="uppercase font-semibold text-purple-600 mb-1">Focus</h3>
              <p>HCI, Interactive Art</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <img
            src={ArsImg}
            alt="Color Quandary installation at Ars Electronica"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Case Study Sections */}
        <RevealOnScroll>
          <div className="space-y-16 text-lg leading-relaxed text-gray-800">
            <section>
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Background</h2>
              <p>
                In Summer 2023, I joined the Ars Electronica Futurelab Academy in Linz, 
                Austria as part of a Northeastern University cohort. Over three intensive 
                days, we collaborated with Futurelab researchers to design interactive 
                projects for the museum’s iconic programmable media façade. The program 
                emphasized human-computer interaction, creative coding, and public engagement 
                through large-scale digital art.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Project Overview</h2>
              <p>
                My team developed <em>Color Quandary</em>, an interactive color competition 
                that invited passersby to “vote with their feet” on the museum’s main deck. 
                Using motion detection, participants chose between two colors projected on 
                the Ars Electronica façade. Their movement determined the outcome, with the 
                winning color overtaking the building in real time. The game unfolded in a 
                series of elimination rounds, culminating in a final champion color and a 
                visual display of the standings across the façade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Design & Development</h2>
              <p>
                I designed and coded the interaction system in Java/Processing, integrating 
                motion tracking with generative visuals for the large-scale display. The 
                challenge was to balance playful simplicity with technical feasibility so 
                that anyone walking by could intuitively participate. Inspiration came from 
                familiar “this or that” decision games, reimagined at architectural scale 
                to transform the façade into a stage for collective choice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Final Presentation</h2>
              <p>
                At the closing event, our project was presented live to an international 
                audience of scientists, artists, and the Linz community. Visitors experienced 
                <em> Color Quandary </em> directly on the plaza, engaging in spontaneous 
                group play and discussions sparked by the visual competition. The work 
                demonstrated how human-computer interaction can turn public space into a 
                canvas for both entertainment and reflection.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-700 mb-4">Impact & Reflection</h2>
              <p>
                Through this project, I gained hands-on experience in human-centered 
                computing, interactive art, and cross-cultural collaboration. Showcasing 
                creative coding at Ars Electronica—the world’s leading festival for art, 
                technology, and society—was both technically challenging and deeply rewarding. 
                The experience reinforced my interest in designing interfaces that connect 
                people, technology, and shared public experiences.
              </p>
            </section>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
