import React, { useRef, useEffect, useState } from "react";

// Particle class for the interactive system
class Particle {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.z = Math.random() * 100;
    this.baseX = x;
    this.baseY = y;
    this.canvas = canvas;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.radius = 2 + Math.random() * 3;
    this.color = `hsl(${260 + Math.random() * 60}, 70%, ${50 + Math.random() * 20}%)`;
    this.connections = [];
  }

  update(mouseX, mouseY, isInteracting) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (isInteracting && distance < 150) {
      const force = (150 - distance) / 150;
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 3;
      this.vy -= Math.sin(angle) * force * 3;
      this.vz += force * 2;
    }
    
    // Spring back to base position
    this.vx += (this.baseX - this.x) * 0.02;
    this.vy += (this.baseY - this.y) * 0.02;
    this.vz += (0 - this.z) * 0.02;
    
    // Apply velocity with damping
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
    this.vx *= 0.92;
    this.vy *= 0.92;
    this.vz *= 0.92;
    
    // Gentle floating animation
    this.baseY += Math.sin(Date.now() * 0.001 + this.baseX) * 0.05;
  }

  draw(ctx) {
    const scale = 1 + this.z / 100;
    const opacity = 0.3 + (this.z / 100) * 0.7;
    
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10 + this.z / 10;
    ctx.shadowColor = this.color;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

function InteractiveXRCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isInteracting: false });
  const [isHovering, setIsHovering] = useState(false);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Create particle grid
    const particles = [];
    const spacing = 50;
    const cols = Math.floor(CANVAS_WIDTH / spacing);
    const rows = Math.floor(CANVAS_HEIGHT / spacing);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i + 0.5) * spacing;
        const y = (j + 0.5) * spacing;
        particles.push(new Particle(x, y, canvas));
      }
    }
    
    // Add some random particles for depth
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(
        Math.random() * CANVAS_WIDTH,
        Math.random() * CANVAS_HEIGHT,
        canvas
      ));
    }
    
    particlesRef.current = particles;

    function animate() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.isInteracting
        );
      });
      
      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(168, 85, 247, 0.1)";
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            const opacity = (1 - distance / 80) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity * (p1.z / 100 + p2.z / 100) / 2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.draw(ctx);
      });
      
      // Draw interaction cursor effect
      if (mouseRef.current.isInteracting) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          150
        );
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.1)");
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)");
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Draw ripple effect
        ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(
          mouseRef.current.x,
          mouseRef.current.y,
          30 + Math.sin(Date.now() * 0.005) * 10,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  function handlePointerMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  }

  function handlePointerDown(e) {
    mouseRef.current.isInteracting = true;
    handlePointerMove(e);
  }

  function handlePointerUp() {
    mouseRef.current.isInteracting = false;
  }

  function handlePointerEnter() {
    setIsHovering(true);
  }

  function handlePointerLeave() {
    setIsHovering(false);
    mouseRef.current.isInteracting = false;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-xl shadow-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200/50 cursor-pointer transition-transform hover:scale-[1.02]"
          style={{ maxWidth: "100%", height: "auto" }}
          aria-label="Interactive spatial interface visualization"
          onMouseMove={handlePointerMove}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          onTouchStart={(e) => {
            const rect = canvasRef.current.getBoundingClientRect();
            mouseRef.current.x = e.touches[0].clientX - rect.left;
            mouseRef.current.y = e.touches[0].clientY - rect.top;
            mouseRef.current.isInteracting = true;
          }}
          onTouchMove={(e) => {
            const rect = canvasRef.current.getBoundingClientRect();
            mouseRef.current.x = e.touches[0].clientX - rect.left;
            mouseRef.current.y = e.touches[0].clientY - rect.top;
          }}
          onTouchEnd={handlePointerUp}
        />
        
        {/* Floating UI elements to suggest AR/VR context */}
        <div className={`absolute top-4 left-4 flex items-center gap-2 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-purple-600 font-mono">SPATIAL INTERFACE ACTIVE</span>
        </div>
        
        <div className={`absolute bottom-4 right-4 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-1">
            <div className="w-8 h-1 bg-purple-400 rounded-full opacity-60"></div>
            <div className="w-8 h-1 bg-purple-500 rounded-full opacity-80"></div>
            <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-6 mt-4 items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
          <span className="text-xs text-purple-600 font-medium">HCI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full"></div>
          <span className="text-xs text-purple-600 font-medium">UX</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
          <span className="text-xs text-purple-600 font-medium">VR/AR</span>
        </div>
      </div>
      
      <p className="text-xs text-purple-400 mt-2 text-center max-w-md">
        Interactive spatial particles • Click and drag to manipulate the field
      </p>
    </div>
  );
}

// RevealOnScroll component (simplified version since it wasn't provided)
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

export function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center py-28 bg-gradient-to-b from-white via-purple-50/20 to-white">
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-7xl md:text-8xl font-extrabold mb-2 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent tracking-tight leading-tight animate-gradient">
            Aspen Tabar
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Designer &amp; Developer
          </p>
          <p className="text-sm text-purple-600 mb-6 font-medium tracking-wider">
            Exploring the intersection of computing and human experience
          </p>
          <InteractiveXRCanvas />
        </div>
      </RevealOnScroll>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </section>
  );
}