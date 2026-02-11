import React, { useEffect, useRef, useState } from 'react';

const TruckAnimation = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crane class with container dropping animation
    class Crane {
      constructor(x, y) {
        this.x = x; // Base position
        this.y = y;
        this.craneHeight = 200; // Taller for better visibility
        this.boomLength = 150; // Longer boom
        this.boomAngle = -Math.PI / 4; // 45 degrees down
        this.containerY = y + 50; // Starting position of container
        this.dropSpeed = 0;
        this.isDropping = false;
        this.dropStartY = y + 50;
        this.dropTargetY = y + 250; // Drop target
        this.resetTimer = 0;
        this.opacity = 0.4; // More visible
      }

      update() {
        // Animate container dropping
        if (this.isDropping) {
          this.dropSpeed += 0.3; // Gravity acceleration
          this.containerY += this.dropSpeed;
          
          // When container reaches target, reset
          if (this.containerY >= this.dropTargetY) {
            this.resetTimer++;
            if (this.resetTimer > 90) { // Wait 1.5 seconds before reset
              this.reset();
            }
          }
        } else {
          // Slowly lower container before dropping
          if (this.containerY < this.dropStartY + 30) {
            this.containerY += 0.2;
          } else {
            this.isDropping = true;
            this.dropSpeed = 0;
          }
        }
      }

      reset() {
        this.containerY = this.dropStartY;
        this.dropSpeed = 0;
        this.isDropping = false;
        this.resetTimer = 0;
        this.containerPickedUp = false;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 2;

        // Crane base (vertical tower)
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.craneHeight);
        ctx.stroke();

        // Crane boom (horizontal arm)
        const boomEndX = this.x + Math.cos(this.boomAngle) * this.boomLength;
        const boomEndY = (this.y - this.craneHeight) + Math.sin(this.boomAngle) * this.boomLength;
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.craneHeight);
        ctx.lineTo(boomEndX, boomEndY);
        ctx.stroke();

        // Cable from boom end to container
        ctx.beginPath();
        ctx.moveTo(boomEndX, boomEndY);
        ctx.lineTo(boomEndX, this.containerY);
        ctx.stroke();

        // Container hanging from cable - bright blue (famous shipping container color), rectangular, big
        const containerWidth = 140; // Wider rectangle for better visibility
        const containerHeight = 60; // Taller but still rectangular
        const containerX = boomEndX - containerWidth / 2;
        
        // Container body - solid orange, no lines
        ctx.fillStyle = '#FF6600'; // Orange color
        ctx.fillRect(containerX, this.containerY, containerWidth, containerHeight);


        ctx.restore();
      }
    }

    // Initialize crane - positioned on the left, before stats section
    const crane = new Crane(canvas.width * 0.15, canvas.height * 0.25);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate opacity based on scroll position
      // Hero section is min-h-screen (100vh), fade out after scrolling past it
      const heroHeight = window.innerHeight;
      const fadeStart = heroHeight * 0.5; // Start fading at 50% of hero
      const fadeEnd = heroHeight * 1.2; // Completely gone at 120% of hero
      
      let scrollOpacity = 1;
      if (scrollY > fadeStart) {
        const fadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        scrollOpacity = Math.max(0, 1 - fadeProgress);
      }
      
      // Only draw if opacity is greater than 0
      if (scrollOpacity > 0) {
        // Update crane
        crane.update();
        
        // Temporarily store original opacity
        const originalOpacity = crane.opacity;
        // Apply scroll-based opacity
        crane.opacity = originalOpacity * scrollOpacity;
        
        // Draw crane
        crane.draw();
        
        // Restore original opacity
        crane.opacity = originalOpacity;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default TruckAnimation;

