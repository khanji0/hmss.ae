import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import UAEFlag from './UAEFlag';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/10' : 'bg-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="h-full px-[7.6923%] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center relative" style={{ minHeight: '80px', paddingLeft: '2px' }}>
          {/* UAE Flag positioned behind text */}
          <div 
            className="absolute"
            style={{ 
              opacity: 0.22,
              zIndex: 0,
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%) scale(0.75)',
              transition: 'opacity 0.3s ease'
            }}
          >
            <UAEFlag />
          </div>
          {/* Text on top */}
          <span 
            className="text-2xl font-bold tracking-wider relative z-10"
            style={{ 
              color: '#000000',
              letterSpacing: '0.15em',
              fontWeight: 700,
              lineHeight: '1.1',
              paddingLeft: '6px'
            }}
          >
            HMSS
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('services')}
            className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('technology')}
            className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal"
          >
            Technology
          </button>
          <button 
            onClick={() => scrollToSection('clients')}
            className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal"
          >
            Clients
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-primary"
            style={{
              background: '#000000',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.4s ease-in-out',
              minHeight: '48px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#333333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
            }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/10">
          <div className="flex flex-col px-[7.6923%] py-6 gap-4">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('technology')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Technology
            </button>
            <button 
              onClick={() => scrollToSection('clients')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Clients
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-left"
              style={{
                background: '#000000',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.4s ease-in-out',
                minHeight: '48px'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
