import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, Globe, Zap, TrendingUp, CheckCircle2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import GridBackground from '../components/GridBackground';
import GradientOverlay from '../components/GradientOverlay';
import AnimatedCounter from '../components/AnimatedCounter';
import { companyInfo, services, clients, testimonials, stats, features } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { toast } from 'sonner';

// Process Grid Background Component with Red Dots
const ProcessGridBackground = () => {
  const canvasRef = React.useRef(null);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const targetMousePos = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const section = canvas.closest('section');
    if (!section) return;

    const updateCanvasSize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      targetMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    section.addEventListener('mousemove', handleMouseMove);

    const gridSize = 60;
    const dotRadius = 1.5;
    const lineOpacity = 0.05;
    const dotOpacity = 0.3;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.1;
      mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.1;

      // Draw vertical lines
      ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw dark green dots at intersections
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dx = mousePos.current.x - x;
          const dy = mousePos.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          let radius = dotRadius;
          let opacity = dotOpacity;

          if (distance < maxDistance) {
            const factor = 1 - distance / maxDistance;
            radius = dotRadius + factor * 2;
            opacity = dotOpacity + factor * 0.4;
          }

          ctx.fillStyle = `rgba(0, 96, 57, ${opacity})`; // Dark Green (#006039)
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const Landing = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    origin: '',
    destination: '',
    cargoType: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Origin: ${formData.origin}
Destination: ${formData.destination}
Cargo Type: ${formData.cargoType}
Message: ${formData.message}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:Jibranakhan6@gmail.com?subject=Contact Request from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    toast.success('Opening email client... Please send the email to complete your request.');
    setFormData({ 
      name: '', 
      email: '', 
      phone: '',
      company: '', 
      origin: '',
      destination: '',
      cargoType: '',
      message: '' 
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="text-black min-h-screen relative overflow-hidden bg-white">
      <GridBackground />
      <GradientOverlay />
      <div className="relative" style={{ zIndex: 10 }}>
        <Navigation />

        {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-start justify-start px-[7.6923%] pt-[180px] pb-32 relative" style={{ zIndex: 10 }}>
          <div className="max-w-[1400px] mx-auto text-center w-full">
            <div 
              className="animate-fade-in"
              style={{
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
            <h1 
              className="leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.02em' }}
            >
              <span style={{ color: '#000000' }}>End-to-End</span>
              <br />
              <span style={{ color: '#000000', fontWeight: 'bold' }}>Freight Solutions</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-3xl mx-auto font-bold tracking-wide" style={{ color: '#DC143C' }}>
              Connecting Dubai to the World Since 2002
            </p>
            <p className="text-xl md:text-2xl text-black/90 mb-8 max-w-3xl mx-auto font-normal leading-relaxed">
              {companyInfo.description}
            </p>
            
            {/* Scroll Down Animation */}
            <div className="flex flex-col items-center gap-3 animate-scroll-indicator mt-8">
              <span className="text-sm font-medium text-black/60 tracking-wider uppercase">Learn More</span>
            <div 
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="w-6 h-10 border-2 border-black/40 rounded-full flex items-start justify-center p-2 group-hover:border-black/60 transition-colors duration-300">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-scroll-dot group-hover:bg-red-700 transition-colors duration-300"></div>
              </div>
              <svg 
                className="animate-bounce-arrow" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
              >
                <path d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
            </div>
          </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-[7.6923%] relative" style={{ zIndex: 10 }}>
          <div className="max-w-[1400px] mx-auto">
          <div 
            id="services-title" 
            data-animate
            className={`mb-24 transition-all duration-1000 ${
              isVisible['services-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight leading-[1.1]">
              <span style={{ color: '#000000' }}>Comprehensive </span>
              <span style={{ color: '#000000' }}>Logistics Solutions</span>
            </h2>
            <p className="text-xl text-black/80 max-w-2xl">
              Established in 2002 with full recognition from Dubai Government, local bodies, and chambers. Providing customized freight solutions focused on invaluable customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className={`border border-black/20 p-12 transition-all duration-700 hover:border-black/50 hover:bg-black/5 flex flex-col ${
                  isVisible[`service-${service.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Circular Image */}
                <div className="mb-8 flex items-center justify-center">
                  <div 
                    className="rounded-full overflow-hidden"
                    style={{
                      width: '180px',
                      height: '180px',
                      border: '2px solid rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-black text-center">
                  {service.title}
                </h3>
                <motion.button
                  onClick={() => setSelectedService(service)}
                  className="mt-auto text-sm font-medium text-black border border-black/30 px-6 py-3 transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
                  style={{ borderRadius: '0px' }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn More
                </motion.button>
              </div>
            ))}
          </div>

          {/* Service Details Dialog */}
          <Dialog open={selectedService !== null} onOpenChange={(open) => !open && setSelectedService(null)}>
            <DialogContent 
              className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white border-2 border-black/10" 
              style={{ 
                borderRadius: '0px',
                padding: '3rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <AnimatePresence mode="wait">
                {selectedService && (
                  <motion.div
                    key={selectedService.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <DialogHeader>
                      {/* Animated Image */}
                      <motion.div 
                        className="mb-8 flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <motion.div 
                          className="rounded-full overflow-hidden shadow-lg"
                          style={{
                            width: '160px',
                            height: '160px',
                            border: '3px solid rgba(0, 0, 0, 0.1)'
                          }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={selectedService.image} 
                            alt={selectedService.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </motion.div>

                      {/* Animated Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <DialogTitle 
                          className="text-4xl font-semibold text-black mb-6 text-center"
                          style={{ lineHeight: '1.2' }}
                        >
                          {selectedService.title}
                        </DialogTitle>
                      </motion.div>

                      {/* Animated Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <DialogDescription 
                          className="text-lg text-black/80 leading-relaxed text-center" 
                          style={{ 
                            color: 'rgba(0, 0, 0, 0.8)',
                            fontSize: '1.125rem',
                            lineHeight: '1.75rem'
                          }}
                        >
                          {selectedService.description}
                        </DialogDescription>
                      </motion.div>

                      {/* Decorative Line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent"
                        style={{ originX: 0.5 }}
                      />
                    </DialogHeader>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>
          </div>
      </section>

      {/* Process Flow Section */}
      <section id="process" className="py-40 px-[7.6923%] bg-black relative overflow-hidden" style={{ zIndex: 10 }}>
        {/* Grid Background with Red Dots */}
        <ProcessGridBackground />
        
        {/* Grainy Texture Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            opacity: 0.08,
            mixBlendMode: 'overlay',
            zIndex: 1
          }}
        ></div>
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div 
            id="process-title"
            data-animate
            className={`mb-24 transition-all duration-1000 ${
              isVisible['process-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight leading-[1.1]">
              <span style={{ color: '#FFFFFF' }}>How It </span>
              <span style={{ color: '#FFFFFF' }}>Works</span>
            </h2>
            <div className="flex flex-col items-start gap-4">
              <p className="text-xl text-gray-400 max-w-2xl">
                Ready to Ship?
              </p>
              <motion.button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 text-white font-semibold text-lg tracking-wide relative overflow-hidden group"
                style={{ 
                  borderRadius: '0px',
                  backgroundColor: '#006039',
                  border: '2px solid #006039',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#007a4a',
                  boxShadow: '0 10px 15px -3px rgba(0, 96, 57, 0.3), 0 4px 6px -2px rgba(0, 96, 57, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request Shipment
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </div>
          </div>

          {/* Process Steps Grid */}
          <div 
            id="process-steps"
            data-animate
            className={`relative transition-all duration-1000 ${
              isVisible['process-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Desktop Horizontal Flow */}
            <div className="hidden lg:block">
              <div className="process-scroll-container relative overflow-x-auto pb-8">
                <div className="flex items-start gap-6 min-w-max px-4">
                  {[
                    { title: 'Request a Quote', desc: 'Submit your shipment details.' },
                    { title: 'Cargo Pickup', desc: 'We collect your cargo from your location.' },
                    { title: 'Customs & Shipping', desc: 'We handle customs clearance and transportation.' },
                    { title: 'Safe Delivery', desc: 'Your shipment is delivered to your destination.' }
                  ].map((step, index) => (
                    <React.Fragment key={index}>
                      <div 
                        className="flex-shrink-0 group"
                          style={{
                            width: '320px',
                            animation: isVisible['process-steps'] 
                              ? `processStepFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards` 
                              : 'none',
                            animationDelay: `${index * 80}ms`,
                            opacity: isVisible['process-steps'] ? undefined : 0
                          }}
                        >
                        <div className="relative h-full">
                          {/* Step Card with Black Background */}
                          <div 
                            className="border border-gray-800 bg-black p-8 transition-all duration-500 hover:border-gray-600 hover:scale-[1.02] relative overflow-hidden flex flex-col"
                            style={{ minHeight: '280px', borderRadius: '0px' }}
                          >
                            {/* Grainy overlay on card */}
                            <div 
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
                                opacity: 0.1,
                                mixBlendMode: 'overlay'
                              }}
                            ></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                              <div className="text-xs font-semibold text-gray-500 mb-5 tracking-wider uppercase">
                                Step {index + 1}
                              </div>
                              <h3 
                                className="text-white mb-4 leading-[1.1] tracking-tight"
                                style={{ 
                                  fontSize: 'clamp(24px, 3.5vw, 36px)', 
                                  letterSpacing: '-0.02em',
                                  fontWeight: 'bold',
                                  lineHeight: '1.1'
                                }}
                              >
                                {step.title}
                              </h3>
                              <p className="text-sm text-gray-400 leading-relaxed mt-auto">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Simple Connector Arrow */}
                      {index < 3 && (
                        <div 
                          className="flex-shrink-0 flex items-center justify-center relative"
                          style={{
                            width: '48px',
                            height: '280px',
                            animation: isVisible['process-steps'] 
                              ? `processStepFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards` 
                              : 'none',
                            animationDelay: `${index * 80 + 40}ms`,
                            opacity: isVisible['process-steps'] ? undefined : 0
                          }}
                        >
                          {/* Simple Arrow Line */}
                          <div className="absolute left-0 right-0 h-[1px] bg-gray-800"></div>
                          
                          {/* Simple Arrow Head */}
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-0"
                          >
                            <path 
                              d="M2 8L12 8M12 8L9 5M12 8L9 11" 
                              stroke="#9CA3AF" 
                              strokeWidth="2" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Vertical Flow */}
            <div className="lg:hidden space-y-8">
              {[
                { title: 'Request a Quote', desc: 'Submit your shipment details.' },
                { title: 'Cargo Pickup', desc: 'We collect your cargo from your location.' },
                { title: 'Customs & Shipping', desc: 'We handle customs clearance and transportation.' },
                { title: 'Safe Delivery', desc: 'Your shipment is delivered to your destination.' }
              ].map((step, index) => (
                <React.Fragment key={index}>
                  <div 
                    id={`process-step-${index}`}
                    data-animate
                    className={`transition-all duration-700 ${
                      isVisible[`process-step-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 relative">
                        {index < 3 && (
                          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-800"></div>
                        )}
                        <div className="pl-0 pb-6 w-full">
                          <div 
                            className="border border-gray-800 bg-black p-6 transition-all duration-500 hover:border-gray-600 relative overflow-hidden flex flex-col"
                            style={{ borderRadius: '0px', minHeight: '220px' }}
                          >
                            {/* Grainy overlay on card */}
                            <div 
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
                                opacity: 0.1,
                                mixBlendMode: 'overlay'
                              }}
                            ></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                              <div className="text-xs font-semibold text-gray-500 mb-4 tracking-wider uppercase">
                                Step {index + 1}
                              </div>
                              <h3 
                                className="text-white mb-3 leading-[1.1] tracking-tight"
                                style={{ 
                                  fontSize: 'clamp(20px, 5vw, 28px)', 
                                  letterSpacing: '-0.02em',
                                  fontWeight: 'bold',
                                  lineHeight: '1.1'
                                }}
                              >
                                {step.title}
                              </h3>
                              <p className="text-sm text-gray-400 leading-relaxed mt-auto">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-40 px-[7.6923%] bg-gray-50/50 backdrop-blur-sm relative" style={{ zIndex: 10 }}>
          <div className="max-w-[1400px] mx-auto">
          <div 
            id="tech-title"
            data-animate
            className={`text-center mb-24 transition-all duration-1000 ${
              isVisible['tech-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight leading-[1.1]">
              <span style={{ color: '#000000' }}>Trusted Since </span>
              <span style={{ color: '#000000' }}>2002</span>
            </h2>
            <p className="text-xl text-black/80 max-w-3xl mx-auto mb-16">
              HMSS - Hussain Murad Shipping Services LLC is at the forefront of global transportation and logistics worldwide. We define logistics as the management of goods, information, and financial transactions ensuring timely and cost-effective flow from suppliers to customers globally.
            </p>
          </div>

          {/* Stats Section with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
            {stats.map((stat, index) => {
              // Calculate years dynamically
              const currentYear = new Date().getFullYear();
              const yearsInBusiness = currentYear - 2002;
              
              return (
                <div 
                  key={index} 
                  id={`tech-stat-${index}`}
                  data-animate
                  className={`text-center transition-all duration-1000 ${
                    isVisible[`tech-stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div 
                    className="text-5xl md:text-6xl font-bold mb-3"
                    style={{ color: '#000000' }}
                  >
                    {stat.label === "Years in Business" ? (
                      <AnimatedCounter value={`${yearsInBusiness}+`} duration={2000} />
                    ) : (
                      <AnimatedCounter value={stat.value} duration={2000} />
                    )}
                  </div>
                  <div className="text-lg text-black/70 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
          </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-40 px-[7.6923%] relative" style={{ zIndex: 10 }}>
          <div className="max-w-[1400px] mx-auto">
          <div 
            id="clients-title"
            data-animate
            className={`text-center mb-24 transition-all duration-1000 ${
              isVisible['clients-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight leading-[1.1]">
              <span style={{ color: '#000000' }}>Trusted by </span>
              <span style={{ color: '#000000' }}>Industry Leaders</span>
            </h2>
          </div>

          {/* Scrolling Clients */}
          <div className="mb-32 overflow-hidden relative">
            <div className="flex gap-16 animate-scroll-left">
              {/* First set */}
              {clients.map((client, index) => {
                // Color mapping for each company
                const colors = [
                  '#FF6B35', // MSC - Orange
                  '#C8102E', // Maersk - Red
                  '#003087', // CMA CGM - Blue
                  '#FF6B00', // COSCO - Orange
                  '#FFCC00', // Hapag-Lloyd - Yellow
                  '#FF6900', // ONE - Orange
                  '#00A651', // Evergreen - Green
                  '#0066CC', // HMM - Blue
                  '#FF6B00', // Yang Ming - Orange
                  '#003087'  // OOCL - Blue
                ];
                return (
                  <div
                    key={`client-1-${index}`}
                    className="flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ minWidth: '200px' }}
                  >
                    <span 
                      className="text-2xl font-bold whitespace-nowrap"
                      style={{ color: colors[index] }}
                    >
                      {client.logo}
                    </span>
                  </div>
                );
              })}
              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => {
                const colors = [
                  '#FF6B35', // MSC
                  '#C8102E', // Maersk
                  '#003087', // CMA CGM
                  '#FF6B00', // COSCO
                  '#FFCC00', // Hapag-Lloyd
                  '#FF6900', // ONE
                  '#00A651', // Evergreen
                  '#0066CC', // HMM
                  '#FF6B00', // Yang Ming
                  '#003087'  // OOCL
                ];
                return (
                  <div
                    key={`client-2-${index}`}
                    className="flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ minWidth: '200px' }}
                  >
                    <span 
                      className="text-2xl font-bold whitespace-nowrap"
                      style={{ color: colors[index] }}
                    >
                      {client.logo}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                id={`testimonial-${testimonial.id}`}
                data-animate
                className={`border border-black/20 p-8 transition-all duration-700 ${
                  isVisible[`testimonial-${testimonial.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <p className="text-lg text-black/90 mb-8 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-black font-semibold">{testimonial.author}</div>
                  <div className="text-black/70 text-sm">{testimonial.role}</div>
                  <div className="text-black/50 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
          </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-[7.6923%] bg-gray-50/50 backdrop-blur-sm relative" style={{ zIndex: 10 }}>
          <div className="max-w-4xl mx-auto">
          <div 
            id="contact-title"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['contact-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold mb-6 tracking-tight leading-[1.1]">
              <span style={{ color: '#000000' }}>Let's </span>
              <span style={{ color: '#000000' }}>Connect</span>
            </h2>
            <p className="text-xl text-black/80 mb-4">
              Ready to transform your logistics operations? Get in touch with our team.
            </p>
            <a 
              href="tel:+971559994939" 
              className="text-lg font-medium text-black/80 hover:text-black transition-colors duration-300 inline-block"
            >
              📞 +971 55 999 4939
            </a>
          </div>

          <form 
            onSubmit={handleSubmit}
            id="contact-form"
            data-animate
            className={`space-y-8 transition-all duration-1000 ${
              isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                  style={{ 
                    borderRadius: '0px',
                    borderWidth: '1px',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                  style={{ 
                    borderRadius: '0px',
                    borderWidth: '1px',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                  style={{ 
                    borderRadius: '0px',
                    borderWidth: '1px',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                  style={{ 
                    borderRadius: '0px',
                    borderWidth: '1px',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Input
                  type="text"
                  name="origin"
                  placeholder="Origin (e.g., Dubai, UAE)"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                  style={{ 
                    borderRadius: '0px',
                    borderWidth: '1px',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="destination"
                  placeholder="Destination (e.g., London, UK)"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                  style={{ 
                    borderRadius: '0px',
                    borderWidth: '1px',
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#000000';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                />
              </div>
            </div>
            <div>
              <Input
                type="text"
                name="cargoType"
                placeholder="Cargo Type (e.g., General Cargo, Container, etc.)"
                value={formData.cargoType}
                onChange={handleChange}
                required
                className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg transition-colors"
                style={{ 
                  borderRadius: '0px',
                  borderWidth: '1px',
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder="Tell us about your shipping needs"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-white border-black/20 text-black placeholder:text-black/40 text-lg focus:border-black transition-colors resize-none"
                style={{ 
                  borderRadius: '0px',
                  borderWidth: '1px',
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#000000';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.4s ease-in-out',
                minHeight: '56px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333333';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Send Message
              <Send size={20} />
            </button>
          </form>
          </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/20 py-12 px-[7.6923%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <img 
                src="/img/hmss_logo.jpeg" 
                alt="HMSS Logo" 
                className="h-16 w-auto object-contain"
              />
              <div>
                <div 
                  className="text-2xl font-semibold mb-2"
                  style={{ color: '#000000' }}
                >
                  HUSSAIN MURAD SHIPPING SERVICES LLC
                </div>
                <div className="text-black/70">Established 2002 | Dubai, UAE</div>
              </div>
            </div>
            <div className="text-black/60 text-center md:text-right">
              © 2026 Hussain Murad Shipping Services LLC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Landing;
