import React from "react";
import aspenImg from "../assets/SelfPhoto.jpeg";

const skillGroups = [
  {
    group: "Programming Languages",
    skills: [
      "Java",
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "React Native",
      "SQL",
      "Processing.js",
    ],
  },
  {
    group: "Design Tools",
    skills: [
      "Figma",
      "Canva",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Adobe XD",
      "Adobe Premiere Pro",
      "Miro",
      "Notion",
      "WeVideo",
    ],
  },
  {
    group: "Engineering & 3D",
    skills: [
      "AutoCAD",
      "SolidWorks",
      "Rhino 3D",
      "Onshape",
      "SketchUp",
      "Tinkercad",
      "Hoverlay",
      "Unity",
    ],
  },
];

export function About() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Add extra margin at the top */}
      <div className="mt-20" />
      {/* Top Row: Text left, Image right */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-12">
        {/* Text Section */}
        <div className="flex-[2] text-left md:pr-0">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
            Hello, I’m Aspen!
          </h1>
          <p className="text-lg text-black mb-6">
            I’m a computer science and design student at Northeastern University, passionate about human-computer interaction, user experience design, and front-end development. I love exploring innovative ways to merge technology and creativity, making digital experiences more meaningful, accessible, and impactful. I’m especially interested in VR/AR, creative coding, and building beautiful, user-friendly interfaces. When I’m not designing or coding, you might find me playing ice hockey, hiking, or strumming my guitar.
          </p>
          <div className="text-md text-black mb-2">
            <span className="font-semibold text-purple-700">Currently seeking:</span> Full-time positions starting May 2025.
            <div className="mt-3 space-y-1">
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:aspentabar@gmail.com"
                  className="text-purple-700 underline hover:text-purple-500 break-all"
                >
                  aspentabar@gmail.com
                </a>
              </div>
              <div>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/aspentabar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 underline hover:text-purple-500 break-all"
                >
                  linkedin.com/in/aspentabar
                </a>
              </div>
              <div>
                <span className="font-semibold">GitHub:</span>{" "}
                <a
                  href="https://github.com/aspentabar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 underline hover:text-purple-500 break-all"
                >
                  github.com/aspentabar
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex-[1.3] flex justify-center md:justify-end">
          <img
            src={aspenImg}
            alt="Aspen Tabar portrait"
            className="w-[350px] h-[460px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div className="w-full mb-10">
        <h2 className="text-xl font-semibold text-purple-700 mb-6">Skills</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {skillGroups.map(({ group, skills }) => (
            <div key={group} className="bg-purple-50 rounded-lg shadow p-5 flex-1 min-w-[220px]">
              <h3 className="text-black font-semibold mb-3 text-sm tracking-wide uppercase">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}