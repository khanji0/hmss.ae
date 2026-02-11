import React, { useEffect, useRef, useState } from 'react';

const ShipAnimation = () => {
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle scroll for opacity
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Fade out as user scrolls down - slower fade
      const newOpacity = Math.max(0, 1 - (scrollY / windowHeight) * 1.2);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    // Ship class
    class Ship {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;

        // Ship hull (main body) - long rectangular shape
        // Bottom edge is mostly straight, top edge broken by superstructure and cargo
        const hullY = this.size * 0.15; // Vertical position of hull
        const hullHeight = this.size * 0.05; // Height of hull
        
        ctx.fillRect(-this.size * 0.5, hullY, this.size, hullHeight);

        // Ship bow (front/left) - slightly pointed, curves upwards
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.5, hullY);
        ctx.lineTo(-this.size * 0.52, hullY - this.size * 0.02);
        ctx.lineTo(-this.size * 0.5, hullY - this.size * 0.03);
        ctx.lineTo(-this.size * 0.48, hullY);
        ctx.closePath();
        ctx.fill();
        
        // Bulbous bow - small rectangular protrusion extending downwards
        ctx.fillRect(-this.size * 0.52, hullY + hullHeight, this.size * 0.04, this.size * 0.02);

        // Ship stern (back/right) - curves slightly upwards, flat vertical edge
        ctx.beginPath();
        ctx.moveTo(this.size * 0.5, hullY);
        ctx.lineTo(this.size * 0.52, hullY - this.size * 0.02);
        ctx.lineTo(this.size * 0.5, hullY - this.size * 0.01);
        ctx.lineTo(this.size * 0.5, hullY);
        ctx.closePath();
        ctx.fill();

        // Superstructure/Bridge - located towards front (left) half
        // Stacked rectangular sections, tapering as they go higher
        const superstructureX = -this.size * 0.35; // Left side of ship
        const superstructureBaseY = hullY - this.size * 0.08; // On top of hull
        const baseWidth = this.size * 0.2;
        const baseHeight = this.size * 0.25;
        
        // Base section (largest)
        ctx.fillRect(superstructureX, superstructureBaseY, baseWidth, baseHeight);
        
        // Middle section (narrower, tapering)
        const middleWidth = baseWidth - this.size * 0.03;
        const middleHeight = this.size * 0.12;
        ctx.fillRect(
          superstructureX + this.size * 0.015,
          superstructureBaseY - middleHeight,
          middleWidth,
          middleHeight
        );
        
        // Top section (narrowest)
        const topWidth = middleWidth - this.size * 0.02;
        const topHeight = this.size * 0.08;
        ctx.fillRect(
          superstructureX + this.size * 0.025,
          superstructureBaseY - middleHeight - topHeight,
          topWidth,
          topHeight
        );

        // Windows on superstructure - two rows of small square cutouts
        ctx.fillStyle = '#FFFFFF'; // Black cutouts for windows (on white ship)
        const windowSize = this.size * 0.02;
        const windowSpacing = this.size * 0.04;
        
        // First row of windows (lower)
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            superstructureX + this.size * 0.03 + i * windowSpacing,
            superstructureBaseY + this.size * 0.05,
            windowSize,
            windowSize
          );
        }
        
        // Second row of windows (upper)
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            superstructureX + this.size * 0.03 + i * windowSpacing,
            superstructureBaseY + this.size * 0.12,
            windowSize,
            windowSize
          );
        }
        ctx.fillStyle = '#FFFFFF';

        // Funnel/Smokestack - cylindrical, on top of superstructure
        const funnelX = superstructureX + baseWidth * 0.4;
        const funnelY = superstructureBaseY - middleHeight - topHeight;
        const funnelWidth = this.size * 0.06;
        const funnelHeight = this.size * 0.1;
        
        ctx.fillRect(funnelX, funnelY, funnelWidth, funnelHeight);
        
        // Smoke from funnel - wavy, cloud-like shape rising up
        ctx.fillStyle = '#FFFFFF';
        // First smoke puff
        ctx.beginPath();
        ctx.arc(funnelX + funnelWidth * 0.5, funnelY - this.size * 0.05, this.size * 0.04, 0, Math.PI * 2);
        ctx.fill();
        
        // Second smoke puff (larger, higher)
        ctx.beginPath();
        ctx.arc(funnelX + funnelWidth * 0.5 + this.size * 0.03, funnelY - this.size * 0.12, this.size * 0.05, 0, Math.PI * 2);
        ctx.fill();
        
        // Third smoke puff (even larger, highest)
        ctx.beginPath();
        ctx.arc(funnelX + funnelWidth * 0.5 + this.size * 0.06, funnelY - this.size * 0.2, this.size * 0.06, 0, Math.PI * 2);
        ctx.fill();
        
        // Wavy smoke trail connecting puffs
        ctx.beginPath();
        ctx.moveTo(funnelX + funnelWidth * 0.5, funnelY);
        ctx.quadraticCurveTo(
          funnelX + funnelWidth * 0.5 + this.size * 0.02,
          funnelY - this.size * 0.08,
          funnelX + funnelWidth * 0.5 + this.size * 0.05,
          funnelY - this.size * 0.15
        );
        ctx.lineWidth = this.size * 0.04;
        ctx.stroke();

        // Mast/Antenna - to the left of funnel, thin vertical line
        const mastX = superstructureX - this.size * 0.02;
        const mastTopY = superstructureBaseY - middleHeight - topHeight - this.size * 0.1;
        ctx.beginPath();
        ctx.moveTo(mastX, superstructureBaseY - middleHeight - topHeight);
        ctx.lineTo(mastX, mastTopY);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cargo containers - central and rear sections (right side of ship)
        // Four distinct rectangular blocks, evenly spaced
        const containerY = hullY - this.size * 0.06; // On deck, above hull
        const containerHeight = this.size * 0.06;
        const containerWidth = this.size * 0.1;
        
        // Container positions (evenly spaced in central and rear sections)
        const containerPositions = [
          -this.size * 0.05,   // Just right of superstructure
          this.size * 0.1,     // Central
          this.size * 0.25,    // Rear-central
          this.size * 0.4      // Rear
        ];
        
        containerPositions.forEach((containerX) => {
          // Main container block
          ctx.fillRect(containerX, containerY, containerWidth, containerHeight);
          
          // Horizontal line dividing container (seam/edge)
          ctx.beginPath();
          ctx.moveTo(containerX, containerY + containerHeight * 0.5);
          ctx.lineTo(containerX + containerWidth, containerY + containerHeight * 0.5);
          ctx.stroke();
        });

        ctx.restore();

        ctx.restore();
      }

    }

    // Initialize ship - static position in center background
    const ship = new Ship(canvas.width / 2, canvas.height * 0.5, Math.min(canvas.width * 0.7, 900));

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update ship position to center
      ship.x = canvas.width / 2;
      ship.y = canvas.height * 0.5;
      ship.size = Math.min(canvas.width * 0.7, 900);
      
      // Draw ship
      ship.draw();
    };

    // Initial draw
    draw();

    // Redraw on resize
    const handleResize = () => {
      resizeCanvas();
      draw();
    };

    window.removeEventListener('resize', resizeCanvas);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: opacity,
        transition: 'opacity 0.8s ease-out'
      }}
    />
  );
};

export default ShipAnimation;

