import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, Globe, Zap, TrendingUp, CheckCircle2, Send } from 'lucide-react';
import Navigation from '../components/Navigation';
import GridBackground from '../components/GridBackground';
import GradientOverlay from '../components/GradientOverlay';
import TruckAnimation from '../components/TruckAnimation';
import AnimatedCounter from '../components/AnimatedCounter';
import { companyInfo, services, clients, testimonials, stats, features } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
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

      // Draw red dots at intersections
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

          ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`; // Red
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
    company: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState({});

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
    // Mock form submission
    toast.success('Message sent successfully! We will contact you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white text-black min-h-screen relative overflow-hidden">
      <TruckAnimation />
      <GridBackground />
      <GradientOverlay />
      <div className="relative" style={{ zIndex: 10 }}>
        <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-end justify-center px-[7.6923%] pt-[80px] pb-32">
          <div className="max-w-[1400px] mx-auto text-center relative w-full">
            {/* Truck Image - Positioned on Top */}
            <div 
              className="animate-fade-in mb-4"
              style={{
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <img 
                src="/img/truck.jpg"
                alt="Truck"
                className="mx-auto"
                style={{
                  width: 'clamp(150px, 20vw, 240px)',
                  height: 'auto',
                  opacity: 0.6,
                  filter: 'brightness(1.1)',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            <div 
              className="animate-fade-in relative"
              style={{
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '0.2s',
                opacity: 0
              }}
            >
            <h1 
              className="leading-[1.1] tracking-tight mb-8 relative z-10"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.02em' }}
            >
              <span style={{ color: '#000000' }}>End-to-End</span>
              <br />
              <span style={{ color: '#000000', fontWeight: 'bold' }}>Freight Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-black/90 mb-12 max-w-3xl mx-auto font-normal leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#333333';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#000000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Start Shipping Smarter
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => document.getElementById('technology').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: '#000000',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRadius: '0px',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease-in-out',
                  minHeight: '56px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                }}
              >
                Explore Technology
              </button>
            </div>
            </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div 
                  className="text-5xl md:text-6xl font-semibold mb-2"
                  style={{ color: '#000000' }}
                >
                  <AnimatedCounter value={stat.value} duration={2000} />
                </div>
                <div className="text-lg text-black/80">{stat.label}</div>
              </div>
            ))}
          </div>
          </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-[7.6923%]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className={`border border-black/20 p-12 transition-all duration-700 hover:border-black/50 hover:bg-black/5 ${
                  isVisible[`service-${service.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div 
                  className="text-6xl font-bold mb-6"
                  style={{
                    color: '#000000',
                    opacity: 0.3
                  }}
                >
                  {service.number}
                </div>
                <h3 className="text-3xl font-semibold mb-4 text-black">
                  {service.title}
                </h3>
                <p className="text-lg text-black/80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          </div>
      </section>

      {/* Process Flow Section */}
      <section id="process" className="py-40 px-[7.6923%] bg-black relative overflow-hidden">
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
              <span style={{ color: '#9CA3AF' }}>Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Ready to Ship?
            </p>
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
                    { title: 'Request Your Shipment', desc: 'Submit your shipment details and requirements.' },
                    { title: 'Cargo Pickup', desc: 'We collect your cargo directly from your location.' },
                    { title: 'Customs Clearance & Transportation', desc: 'We handle customs processing and manage transportation.' },
                    { title: 'Doorstep Delivery', desc: 'Your shipment is delivered safely to your destination.' }
                  ].map((step, index) => (
                    <React.Fragment key={index}>
                      <div 
                        className="flex-shrink-0 group"
                        style={{
                          width: '420px',
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
                            className="border border-gray-800 bg-black p-10 transition-all duration-500 hover:border-gray-600 hover:scale-[1.02] relative overflow-hidden flex flex-col"
                            style={{ minHeight: '420px', borderRadius: '0px' }}
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
                                className="text-white mb-6 leading-[1.1] tracking-tight"
                                style={{ 
                                  fontSize: 'clamp(32px, 4.5vw, 56px)', 
                                  letterSpacing: '-0.02em',
                                  fontWeight: 'bold',
                                  lineHeight: '1.1'
                                }}
                              >
                                {step.title}
                              </h3>
                              <p className="text-base text-gray-400 leading-relaxed mt-auto">
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
                            height: '420px',
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
                { title: 'Request Your Shipment', desc: 'Submit your shipment details and requirements.' },
                { title: 'Cargo Pickup', desc: 'We collect your cargo directly from your location.' },
                { title: 'Customs Clearance & Transportation', desc: 'We handle customs processing and manage transportation.' },
                { title: 'Doorstep Delivery', desc: 'Your shipment is delivered safely to your destination.' }
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
                            className="border border-gray-800 bg-black p-8 transition-all duration-500 hover:border-gray-600 relative overflow-hidden flex flex-col"
                            style={{ borderRadius: '0px', minHeight: '320px' }}
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
                                className="text-white mb-5 leading-[1.1] tracking-tight"
                                style={{ 
                                  fontSize: 'clamp(28px, 6vw, 42px)', 
                                  letterSpacing: '-0.02em',
                                  fontWeight: 'bold',
                                  lineHeight: '1.1'
                                }}
                              >
                                {step.title}
                              </h3>
                              <p className="text-base text-gray-400 leading-relaxed mt-auto">
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
      <section id="technology" className="py-40 px-[7.6923%] bg-gray-50/50 backdrop-blur-sm">
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
            <p className="text-xl text-black/80 max-w-3xl mx-auto">
              HMSS - Hussain Murad Shipping Services LLC is at the forefront of global transportation and logistics worldwide. We define logistics as the management of goods, information, and financial transactions ensuring timely and cost-effective flow from suppliers to customers globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className={`transition-all duration-700 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="mb-6">
                  <CheckCircle2 
                    size={48} 
                    style={{ color: '#000000' }} 
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-lg text-black/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-40 px-[7.6923%]">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-32">
            {clients.map((client, index) => (
              <div
                key={index}
                id={`client-${index}`}
                data-animate
                className={`border border-black/20 aspect-square flex items-center justify-center transition-all duration-700 hover:border-black/50 hover:bg-black/5 ${
                  isVisible[`client-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <span className="text-2xl font-bold text-black/50">{client.logo}</span>
              </div>
            ))}
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
      <section id="contact" className="py-40 px-[7.6923%] bg-gray-50/50 backdrop-blur-sm">
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
            <p className="text-xl text-black/80">
              Ready to transform your logistics operations? Get in touch with our team.
            </p>
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
            <div>
              <Input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg focus:border-black transition-colors"
                style={{ borderRadius: '0px' }}
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
                style={{ borderRadius: '0px' }}
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
            <div>
              <div 
                className="text-2xl font-semibold mb-2"
                style={{ color: '#000000' }}
              >
                HUSSAIN MURAD SHIPPING SERVICES LLC
              </div>
              <div className="text-black/70">Established 2002 | Dubai, UAE</div>
            </div>
            <div className="text-black/60 text-center md:text-right">
              © 2025 Hussain Murad Shipping Services LLC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Landing;
