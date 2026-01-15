import React, { useEffect } from "react";
import aspenImg from "../assets/SelfPhoto.jpeg";
import { RevealOnScroll } from "../components/RevealOnScroll";

// ICONS (SVG as React components)
const GmailIcon = ({ className }) => (
  <svg className={className} width="50" height="50" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="#fff" />
    <path d="M6 14v20a4 4 0 004 4h28a4 4 0 004-4V14a4 4 0 00-4-4H10a4 4 0 00-4 4z" fill="#EA4335"/>
    <path d="M42 14l-18 14L6 14" fill="#fff"/>
    <path d="M6 14v20a4 4 0 004 4h28a4 4 0 004-4V14" fill="none" stroke="#EA4335" strokeWidth="2"/>
    <path d="M6 14l18 14L42 14" fill="none" stroke="#EA4335" strokeWidth="2"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} width="50" height="50" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="#fff" />
    <path d="M37 11H11a2 2 0 00-2 2v22a2 2 0 002 2h26a2 2 0 002-2V13a2 2 0 00-2-2zM16 35h-5V20h5v15zm-2.5-17a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm21.5 17h-5V27c0-1.6-1.4-3-3-3s-3 1.4-3 3v8h-5V20h5v2.2c1-1.7 3.7-2.2 5.2-2.2C33.2 20 35 22.2 35 25.2V35z" fill="#0077B5"/>
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} width="50" height="50" viewBox="0 0 48 48" fill="none">
    <rect width="48" height="48" rx="10" fill="#fff"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M24 9C15.163 9 8 16.163 8 25c0 7.08 4.584 13.082 10.94 15.184.8.146 1.092-.346 1.092-.77 0-.38-.014-1.389-.022-2.727-4.451.967-5.39-2.146-5.39-2.146-.728-1.846-1.776-2.338-1.776-2.338-1.452-.993.11-.973.11-.973 1.604.112 2.448 1.649 2.448 1.649 1.427 2.448 3.744 1.74 4.658 1.331.144-1.034.558-1.74 1.014-2.142-3.554-.404-7.29-1.777-7.29-7.913 0-1.747.624-3.176 1.647-4.295-.166-.404-.714-2.03.158-4.233 0 0 1.342-.43 4.4 1.64 1.273-.353 2.64-.53 4-.536 1.36.006 2.727.183 4 .536 3.057-2.07 4.397-1.64 4.397-1.64.874 2.203.326 3.829.16 4.233 1.025 1.119 1.646 2.548 1.646 4.295 0 6.152-3.74 7.505-7.303 7.903.573.495 1.085 1.471 1.085 2.968 0 2.144-.02 3.872-.02 4.398 0 .426.288.922 1.097.766C35.42 38.08 40 32.08 40 25c0-8.837-7.163-16-16-16z" fill="#181717"/>
  </svg>
);

const skillGroups = [
  {
    group: "Programming Languages",
    skills: [
      "Java",
      "Python",
      "C#",
      "Git",
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "React Native",
      "SQL",
      "p5.js",
    ],
  },
  {
    group: "Design Tools",
    skills: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Adobe XD",
      "Adobe Premiere Pro",
      "Notion",
      "Canva",

    ],
  },
  {
    group: "Other Applications",
    skills: [
      "Unity",
      "AutoCAD",
      "SolidWorks",
      "Rhino 3D",
      "Onshape",
      "SketchUp",
      "Tinkercad",
      "Hoverlay",
      "Google Analytics",
      "macOS",
    ],
  },
];

export function About() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Reduced margin on mobile, normal margin on desktop */}
      <div className="mt-5 md:mt-20" />
      <RevealOnScroll>
        {/* Top Row: Text left, Image right */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-12">
          {/* Text Section */}
          <div className="flex-[2] text-left md:pr-0">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
              Hello, I'm Aspen!
            </h1>
            <p className="text-lg text-black mb-6">
              I'm a computer science and design student at Northeastern University, passionate about human-computer interaction, user experience design, and front-end development. I love exploring innovative ways to merge technology and creativity, making digital experiences more meaningful, accessible, and impactful. I'm especially interested in VR/AR, creative coding, and building user-friendly interfaces. When I'm not designing or coding, you might find me playing ice hockey, hiking, or practicing guitar.
            </p>
            <div className="text-md text-black mb-2">
              <span className="font-semibold text-purple-700">Currently seeking:</span> Full-time positions starting May 2025.
              <div className="mt-3 flex flex-row gap-2 items-center">
                <a
                  href="mailto:aspentabar26@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email Aspen"
                  className="hover:scale-110 transition-transform"
                >
                  <GmailIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/aspentabar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aspen's LinkedIn"
                  className="hover:scale-110 transition-transform"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://github.com/aspentabar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aspen's GitHub"
                  className="hover:scale-110 transition-transform"
                >
                  <GitHubIcon />
                </a>
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
          {/* <h2 className="text-xl font-semibold text-purple-700 mb-6">Skills</h2> */}
          <div className="flex flex-col md:flex-row gap-6">
            {skillGroups.map(({ group, skills }) => (
              <div key={group} className="border-1 border-gray-200 rounded-lg shadow p-5 flex-1 min-w-[220px]">
                <h3 className="text-gray-700 font-black mb-3 text-sm tracking-wide">{group}</h3>
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
      </RevealOnScroll>
    </section>
  );
}