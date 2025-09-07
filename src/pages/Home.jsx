import React, { useRef, useEffect, useState } from "react";
import { RevealOnScroll } from "../components/RevealOnScroll";

// Interactive Processing.js-inspired animation: user draws colorful trails with pointer/mouse
function InteractiveProcessingCanvas() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [trails, setTrails] = useState([]);
  const [hue, setHue] = useState(200);

  // Increased canvas size
  const CANVAS_WIDTH = 700;
  const CANVAS_HEIGHT = 360;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawTrails() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trails.forEach((trail, i) => {
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let j = 1; j < trail.length; j++) {
          ctx.lineTo(trail[j].x, trail[j].y);
        }
        ctx.strokeStyle = `hsl(${trail[0].hue}, 80%, 60%)`;
        ctx.lineWidth = 6 - (i / trails.length) * 4;
        ctx.lineCap = "round";
        ctx.stroke();
      });
    }

    drawTrails();
  }, [trails]);

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function handlePointerDown(e) {
    setDrawing(true);
    const pos = getPos(e);
    setTrails((prev) => [
      ...prev,
      [{ x: pos.x, y: pos.y, hue }],
    ]);
  }

  function handlePointerMove(e) {
    if (!drawing) return;
    const pos = getPos(e);
    setTrails((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = [...copy[copy.length - 1], { x: pos.x, y: pos.y, hue }];
      return copy;
    });
    setHue((h) => (h + 2) % 360);
  }

  function handlePointerUp() {
    setDrawing(false);
    setTrails((prev) => (prev.length > 12 ? prev.slice(prev.length - 12) : prev));
  }

  function handleClear() {
    setTrails([]);
  }

  return (
    <div className="flex flex-col items-center mt-14">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-lg shadow-lg bg-white border border-purple-200 cursor-crosshair touch-none"
        style={{ maxWidth: "100%" }}
        aria-label="Interactive Processing.js-inspired canvas"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />
      <div className="flex gap-4 mt-3 items-center">
        <button
          onClick={handleClear}
          className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded font-semibold text-purple-700 transition"
        >
          Clear
        </button>
        <span className="text-xs text-purple-400 select-none">
          Draw with your mouse or finger!
        </span>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center py-28">
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-7xl md:text-8xl font-extrabold mb-2 text-purple-700 tracking-tight leading-tight">
            Aspen Tabar
          </h1>
          <p className="text-2xl text-purple-400 mb-4 font-semibold">
            Designer &amp; Developer
          </p>
          <InteractiveProcessingCanvas />
        </div>
      </RevealOnScroll>
    </section>
  );
}