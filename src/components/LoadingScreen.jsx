import React, { useEffect, useState } from "react";

const WELCOME_TEXT = "Welcome";

export const LoadingScreen = ({ onComplete }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAll(true);
      setTimeout(onComplete, 1500);
    }, WELCOME_TEXT.length * 150 + 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      <div className="flex text-5xl font-extrabold font-mono mb-6 select-none">
        {WELCOME_TEXT.split("").map((char, i) => (
          <span
            key={i}
            className={`text-purple-400 inline-block transition-all duration-300
              ${showAll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{
              transitionDelay: `${i * 150}ms`,
              animation: !showAll
                ? `bounceIn .5s ${i * 0.15}s both`
                : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="relative w-48 h-2 bg-purple-200 rounded overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-purple-400 shadow-[0_0_15px_#c4b5fd] animate-loading-bar"></div>
      </div>
      <style>
        {`
        @keyframes bounceIn {
          0% { opacity: 0; transform: translateY(32px) scale(0.8);}
          60% { opacity: 1; transform: translateY(-8px) scale(1.1);}
          80% { transform: translateY(2px) scale(0.95);}
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-loading-bar {
          animation: loadingBarMove 1.5s infinite linear;
          width: 40%;
        }
        @keyframes loadingBarMove {
          0% { left: 0; }
          50% { left: 60%; }
          100% { left: 0; }
        }
        `}
      </style>
    </div>
  );
};