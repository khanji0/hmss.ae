import React, { useEffect, useRef, useState } from 'react';

const ParallaxContainer = ({ children, speed = 0.5 }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      targetOffset.current = {
        x: (e.clientX - centerX) * speed * 0.02,
        y: (e.clientY - centerY) * speed * 0.02
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smooth interpolation for ultra-smooth motion
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.1;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.1;

      setOffset({
        x: currentOffset.current.x,
        y: currentOffset.current.y
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
