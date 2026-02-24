import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('background'); // background, textReveal, pageReveal, complete
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timers = [];

    // STEP 1: Background fade in (0-0.5s)
    timers.push(setTimeout(() => {
      setStage('textReveal');
      setShowText(true);
    }, 500));

    // STEP 2: Text reveals from left to right (0.5s-3.5s)
    timers.push(setTimeout(() => {
      setStage('pageReveal');
    }, 3500));

    // STEP 3: Page reveal transition (3.5s-4.5s)
    timers.push(setTimeout(() => {
      setStage('complete');
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 4500));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);

  // Subtle grain texture
  const GrainTexture = () => (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
      }}
    />
  );

  // Light grid pattern
  const GridPattern = () => {
    const gridSize = 60;
    const lineOpacity = 0.04;

    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, ${lineOpacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, ${lineOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    );
  };

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: stage === 'pageReveal' ? '-100%' : 0
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 0.5 },
            y: {
              duration: stage === 'pageReveal' ? 1.5 : 0,
              ease: [0.16, 1, 0.3, 1],
            }
          }}
        >
          {/* Background Texture */}
          <GrainTexture />
          <GridPattern />

          {/* Text Container with Logo - One continuous text revealing from left to right */}
          {showText && (
            <div className="absolute flex items-center gap-6" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              {/* Logo - Left side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src="/img/hmss_logo.jpeg" 
                  alt="HMSS Logo" 
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
                />
              </motion.div>
              
              {/* Text */}
              <motion.div
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight"
                style={{ 
                  whiteSpace: 'nowrap',
                  lineHeight: '1',
                  color: '#000000',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ 
                    clipPath: 'inset(0 100% 0 0)',
                    opacity: 0
                  }}
                  animate={{ 
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 1
                  }}
                  transition={{
                    duration: 3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  Hussain Murad Shipping Services
                </motion.span>
              </motion.div>
            </div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
