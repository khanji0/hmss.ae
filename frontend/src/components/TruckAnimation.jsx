import React, { useEffect, useRef } from 'react';

const TruckAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let trucks = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Truck class
    class Truck {
      constructor(x, y, speed, size, direction) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.direction = direction; // 1 for right, -1 for left
        this.opacity = 0.15 + Math.random() * 0.1; // Subtle, professional opacity
        this.wheelRotation = 0;
      }

      update() {
        this.x += this.speed * this.direction;
        this.wheelRotation += this.speed * 0.1;

        // Reset position when off screen
        if (this.direction === 1 && this.x > canvas.width + 200) {
          this.x = -200;
          this.y = Math.random() * canvas.height;
        } else if (this.direction === -1 && this.x < -200) {
          this.x = canvas.width + 200;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);

        // Draw truck body with professional styling
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        
        // Main trailer/container
        ctx.fillRect(-this.size * 0.8, -this.size * 0.15, this.size * 1.6, this.size * 0.3);
        ctx.strokeRect(-this.size * 0.8, -this.size * 0.15, this.size * 1.6, this.size * 0.3);
        
        // Cab
        ctx.fillRect(-this.size * 0.8, -this.size * 0.15, this.size * 0.4, this.size * 0.3);
        ctx.strokeRect(-this.size * 0.8, -this.size * 0.15, this.size * 0.4, this.size * 0.3);
        
        // Container details (vertical lines for professional look)
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(-this.size * 0.8 + (this.size * 1.6 / 4) * (i + 1), -this.size * 0.15);
          ctx.lineTo(-this.size * 0.8 + (this.size * 1.6 / 4) * (i + 1), this.size * 0.15);
          ctx.stroke();
        }
        
        // Horizontal lines on container
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.8, 0);
        ctx.lineTo(this.size * 0.8, 0);
        ctx.stroke();

        // Wheels
        ctx.fillStyle = '#FFFFFF';
        const wheelY = this.size * 0.15;
        const wheelRadius = this.size * 0.08;
        
        // Front wheels (cab)
        this.drawWheel(-this.size * 0.5, wheelY, wheelRadius);
        this.drawWheel(-this.size * 0.5, -wheelY, wheelRadius);
        
        // Back wheels (trailer - dual axles)
        this.drawWheel(this.size * 0.3, wheelY, wheelRadius);
        this.drawWheel(this.size * 0.3, -wheelY, wheelRadius);
        this.drawWheel(this.size * 0.6, wheelY, wheelRadius);
        this.drawWheel(this.size * 0.6, -wheelY, wheelRadius);

        ctx.restore();
      }

      drawWheel(x, y, radius) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.wheelRotation);
        
        // Wheel rim (outer ring)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner wheel circle
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        
        // Wheel spokes
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(radius * 0.6, 0);
          ctx.stroke();
          ctx.rotate((Math.PI * 2) / 6);
        }
        
        ctx.restore();
      }
    }

    // Initialize trucks
    const initTrucks = () => {
      trucks = [];
      const truckCount = Math.floor((canvas.width * canvas.height) / 150000); // Responsive count
      
      for (let i = 0; i < truckCount; i++) {
        const direction = Math.random() > 0.5 ? 1 : -1;
        const x = direction === 1 ? -200 : canvas.width + 200;
        const y = Math.random() * canvas.height;
        const speed = 0.5 + Math.random() * 1;
        const size = 40 + Math.random() * 60;
        
        trucks.push(new Truck(x, y, speed, size, direction));
      }
    };

    initTrucks();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      trucks.forEach(truck => {
        truck.update();
        truck.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

