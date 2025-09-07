import { useNavigate } from "react-router-dom";
import cloudImg from "../../assets/SelfPhoto.jpeg";
import { RevealOnScroll } from "../../components/RevealOnScroll";


export default function CloudPlatform() {
  const navigate = useNavigate();

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <RevealOnScroll>
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-purple-700 font-semibold hover:underline text-lg"
        >← Back to Projects</button>

        <div className="rounded-2xl shadow-xl bg-white overflow-hidden mb-8">
          <img src={cloudImg} alt="Cloud Platform" className="w-full h-80 object-cover object-center" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">Cloud Platform</h1>
            <p className="mb-4 text-purple-700">
              Scalable cloud infrastructure management with real-time monitoring and automated scaling.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["React", "Node.js", "AWS", "Docker"].map((tech) => (
                <span
                  key={tech}
                  className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-purple-600 mt-6 mb-2">Project Details</h2>
            <p className="text-purple-900">
              {/* Replace with your detailed writeup */}
              This platform allows users to deploy, monitor, and scale cloud resources seamlessly.
              Features include real-time dashboards, automated scaling policies, and integrated analytics.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}