import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 bg-white border-b border-black/10"
      style={{ height: '80px' }}
    >
      <div className="h-full px-[7.6923%] flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          style={{ minHeight: '80px' }}
        >
          <img 
            src={`${process.env.PUBLIC_URL || ''}/img/hmss_logo.jpeg`}
            alt="HMSS Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />
          <span 
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300"
            style={{ 
              color: '#000000',
              letterSpacing: '0.15em',
              fontWeight: 700,
              lineHeight: '1.1'
            }}
          >
            HMSS
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition-colors duration-300 text-lg font-normal text-black/70 hover:text-black"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="transition-colors duration-300 text-lg font-normal text-black/70 hover:text-black"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="transition-colors duration-300 text-lg font-normal text-black/70 hover:text-black"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('technology')}
            className="transition-colors duration-300 text-lg font-normal text-black/70 hover:text-black"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="transition-colors duration-300 text-lg font-normal text-black/70 hover:text-black"
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden transition-colors duration-300 text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[80px] left-0 right-0 bg-white border-b border-black/10">
          <div className="flex flex-col px-[7.6923%] py-6 gap-4">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('technology')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-black/70 hover:text-black transition-colors duration-300 text-lg font-normal text-left"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
