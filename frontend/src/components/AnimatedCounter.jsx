import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Handle "24/7" case - display immediately with a fade-in effect
    if (value.includes('/')) {
      setCount(value);
      return;
    }

    // Extract number and suffix from value (e.g., "22+" -> 22, "+")
    const match = value.match(/(\d+)(.*)/);
    if (!match) {
      setCount(value);
      return;
    }

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetNumber - startValue) * easeOutQuart);

      setCount(currentValue + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNumber + suffix);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div ref={elementRef}>
      {count}
    </div>
  );
};

export default AnimatedCounter;

