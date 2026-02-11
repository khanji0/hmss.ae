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
      <section className="min-h-screen flex items-center justify-center px-[7.6923%] pt-[80px]">
          <div className="max-w-[1400px] mx-auto text-center">
            <div 
              className="animate-fade-in"
              style={{
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
            <h1 
              className="leading-[1.1] tracking-tight mb-8"
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
