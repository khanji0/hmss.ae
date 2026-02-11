import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, Globe, Zap, TrendingUp, CheckCircle2, Send } from 'lucide-react';
import Navigation from '../components/Navigation';
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
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-[7.6923%] pt-[80px]">
        <div className="max-w-[1400px] mx-auto text-center">
          <div 
            className="animate-fade-in"
            style={{
              animation: 'fadeInUp 1s ease-out forwards'
            }}
          >
            <h1 
              className="font-semibold leading-[1.1] tracking-tight text-black mb-8"
              style={{ fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.02em' }}
            >
              The Future of
              <br />
              <span style={{ color: '#00FFD1' }}>Freight Forwarding</span>
            </h1>
            <p className="text-xl md:text-2xl text-black/85 mb-12 max-w-3xl mx-auto font-normal leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: '#00FFD1',
                  color: '#000000',
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
                  e.currentTarget.style.background = 'rgba(0, 255, 209, 0.1)';
                  e.currentTarget.style.color = '#00FFD1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#00FFD1';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Start Shipping Smarter
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => document.getElementById('technology').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '0px',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease-in-out',
                  minHeight: '56px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#FFFFFF';
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
                <div className="text-5xl md:text-6xl font-semibold text-[#00FFD1] mb-2">
                  {stat.value}
                </div>
                <div className="text-black/60 text-lg">{stat.label}</div>
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
            <h2 className="text-5xl md:text-7xl font-semibold text-black mb-6 tracking-tight leading-[1.1]">
              Intelligent Logistics
            </h2>
            <p className="text-xl text-black/70 max-w-2xl">
              Powered by advanced AI and automation, our platform delivers unprecedented efficiency and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className={`border border-black/20 p-12 transition-all duration-700 hover:border-[#00FFD1]/50 hover:bg-black/5 ${
                  isVisible[`service-${service.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="text-6xl font-bold text-[#00FFD1]/30 mb-6">
                  {service.number}
                </div>
                <h3 className="text-3xl font-semibold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-40 px-[7.6923%] bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div 
            id="tech-title"
            data-animate
            className={`text-center mb-24 transition-all duration-1000 ${
              isVisible['tech-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold text-black mb-6 tracking-tight leading-[1.1]">
              Built for Tomorrow
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              We combine cutting-edge technology with decades of logistics expertise to create solutions that don't just meet today's demands—they anticipate tomorrow's challenges.
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
                  <CheckCircle2 size={48} className="text-[#00FFD1]" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-black/70 leading-relaxed">
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
            <h2 className="text-5xl md:text-7xl font-semibold text-black mb-6 tracking-tight leading-[1.1]">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-32">
            {clients.map((client, index) => (
              <div
                key={index}
                id={`client-${index}`}
                data-animate
                className={`border border-black/20 aspect-square flex items-center justify-center transition-all duration-700 hover:border-[#00FFD1]/50 hover:bg-black/5 ${
                  isVisible[`client-${index}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <span className="text-2xl font-bold text-black/40">{client.logo}</span>
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
                <p className="text-lg text-black/85 mb-8 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="text-black font-semibold">{testimonial.author}</div>
                  <div className="text-black/60 text-sm">{testimonial.role}</div>
                  <div className="text-black/40 text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-[7.6923%] bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div 
            id="contact-title"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['contact-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-semibold text-black mb-6 tracking-tight leading-[1.1]">
              Let's Connect
            </h2>
            <p className="text-xl text-black/70">
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
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg focus:border-[#00FFD1] transition-colors"
                  style={{ borderRadius: '0px' }}
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
                  className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg focus:border-[#00FFD1] transition-colors"
                  style={{ borderRadius: '0px' }}
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
                className="bg-white border-black/20 text-black placeholder:text-black/40 h-14 text-lg focus:border-[#00FFD1] transition-colors"
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
                className="bg-white border-black/20 text-black placeholder:text-black/40 text-lg focus:border-[#00FFD1] transition-colors resize-none"
                style={{ borderRadius: '0px' }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: '#00FFD1',
                color: '#000000',
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
                e.currentTarget.style.background = 'rgba(0, 255, 209, 0.1)';
                e.currentTarget.style.color = '#00FFD1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#00FFD1';
                e.currentTarget.style.color = '#000000';
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
              <div className="text-2xl font-semibold text-black mb-2">HUSSAIN MURAD</div>
              <div className="text-black/60">Dubai, UAE</div>
            </div>
            <div className="text-black/40 text-center md:text-right">
              © 2025 Hussain Murad Shipping Services. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
