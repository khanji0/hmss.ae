import React, { useEffect, useRef } from 'react';

const GradientOverlay = () => {
  const gradientRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMousePos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth interpolation
      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.05;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.05;

      if (gradientRef.current) {
        gradientRef.current.style.background = `
          radial-gradient(
            600px circle at ${mousePos.current.x}% ${mousePos.current.y}%,
            rgba(0, 0, 0, 0.03),
            transparent 40%
          ),
          radial-gradient(
            800px circle at ${100 - mousePos.current.x}% ${100 - mousePos.current.y}%,
            rgba(0, 0, 0, 0.02),
            transparent 40%
          )
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default GradientOverlay;
