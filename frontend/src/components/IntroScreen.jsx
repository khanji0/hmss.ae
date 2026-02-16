import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    // Stage 1: Line appears and expands (0-1.2s)
    const timer1 = setTimeout(() => {
      setAnimationStage(1);
    }, 100);

    // Stage 2: Text appears after line fully expands (1.2s-2.8s)
    const timer2 = setTimeout(() => {
      setAnimationStage(2);
    }, 1200);

    // Stage 3: Curtain reveal starts (2.8s-4.2s)
    const timer3 = setTimeout(() => {
      setAnimationStage(3);
    }, 2800);

    // Stage 4: Complete and show landing page (4.2s)
    const timer4 = setTimeout(() => {
      setAnimationStage(4);
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  // Light grid pattern component
  const GridPattern = () => {
    const gridSize = 60;
    const lineOpacity = 0.08;

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
      {animationStage < 4 && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          animate={{
            y: animationStage >= 3 ? '-100%' : 0,
            opacity: animationStage >= 3 ? 0 : 1,
          }}
          transition={{
            duration: animationStage >= 3 ? 1.2 : 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Grid Pattern Background */}
          <GridPattern />

          {/* Vertical Line */}
          <motion.div
            className="absolute"
            style={{
              width: '2px',
              height: '100%',
              background: '#000000',
              transformOrigin: 'bottom center',
            }}
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: animationStage >= 1 ? 1 : 0,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1], // Custom easing for professional feel
            }}
          />

          {/* Text Container */}
          {animationStage >= 2 && (
            <motion.div
              className="absolute z-10 px-4 md:px-8 text-center max-w-[90vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-black tracking-tight relative"
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                >
                  Hussain Murad Shipping Services
                </motion.span>
              </motion.h1>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;

