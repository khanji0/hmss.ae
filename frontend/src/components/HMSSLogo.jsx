import React from 'react';

const HMSSLogo = ({ className = '', style = {} }) => {
  return (
    <svg
      width="320"
      height="90"
      viewBox="0 0 320 90"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red vertical stripe on the left (triangular shape) */}
      <path
        d="M 0 0 L 0 90 L 30 45 Z"
        fill="#FF0000"
      />

      {/* Wavy banner with UAE flag colors */}
      {/* Green stripe (top) - wavy top and bottom edges */}
      <path
        d="M 30 0 
           Q 50 8, 70 0 
           T 110 0 
           T 150 0 
           T 190 0 
           T 230 0 
           T 270 0 
           T 310 0 
           L 320 0 
           L 320 25 
           Q 300 17, 280 25 
           T 240 25 
           T 200 25 
           T 160 25 
           T 120 25 
           T 80 25 
           T 40 25 
           T 30 25 
           Z"
        fill="#00FF00"
      />

      {/* White stripe (middle) - wavy top and bottom edges */}
      <path
        d="M 30 25 
           Q 50 33, 70 25 
           T 110 25 
           T 150 25 
           T 190 25 
           T 230 25 
           T 270 25 
           T 310 25 
           L 320 25 
           L 320 50 
           Q 300 42, 280 50 
           T 240 50 
           T 200 50 
           T 160 50 
           T 120 50 
           T 80 50 
           T 40 50 
           T 30 50 
           Z"
        fill="#FFFFFF"
      />

      {/* Black stripe (bottom) - wavy top and bottom edges */}
      <path
        d="M 30 50 
           Q 50 58, 70 50 
           T 110 50 
           T 150 50 
           T 190 50 
           T 230 50 
           T 270 50 
           T 310 50 
           L 320 50 
           L 320 90 
           Q 300 82, 280 90 
           T 240 90 
           T 200 90 
           T 160 90 
           T 120 90 
           T 80 90 
           T 40 90 
           T 30 90 
           Z"
        fill="#000000"
      />

      {/* Globe icon on the left, overlapping red and white sections */}
      <g transform="translate(15, 45)">
        <circle
          cx="0"
          cy="0"
          r="16"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        {/* Globe continents - showing parts of Africa, Europe, and Asia */}
        <path
          d="M -8 -5 Q -4 -8, 0 -5 Q 4 -2, 8 -5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M -6 0 Q -2 -2, 2 0 Q 6 2, 10 0"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M -8 5 Q -4 8, 0 5 Q 4 2, 8 5"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Vertical longitude line */}
        <line x1="0" y1="-16" x2="0" y2="16" stroke="#FFFFFF" strokeWidth="1" />
        {/* Horizontal latitude line */}
        <line x1="-16" y1="0" x2="16" y2="0" stroke="#FFFFFF" strokeWidth="1" />
      </g>

      {/* HMSS text - bold, black, with H and M slightly italicized */}
      <text
        x="55"
        y="38"
        fontSize="32"
        fontWeight="900"
        fill="#000000"
        fontFamily="Arial, sans-serif"
        style={{ letterSpacing: '3px' }}
      >
        <tspan style={{ fontStyle: 'italic' }}>H</tspan>
        <tspan dx="2" style={{ fontStyle: 'italic' }}>M</tspan>
        <tspan dx="2">S</tspan>
        <tspan dx="2">S</tspan>
      </text>

      {/* Company name in script/handwritten font, following the curve of the bottom black stripe */}
      <text
        x="55"
        y="68"
        fontSize="10"
        fill="#000000"
        fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive, serif"
        style={{ fontStyle: 'italic', letterSpacing: '0.5px' }}
      >
        Hussain Murad Shipping Services
      </text>
      <text
        x="55"
        y="82"
        fontSize="9"
        fill="#000000"
        fontFamily="'Brush Script MT', 'Lucida Handwriting', cursive, serif"
        style={{ fontStyle: 'italic' }}
      >
        (LLC)
      </text>
    </svg>
  );
};

export default HMSSLogo;

