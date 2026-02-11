import React from 'react';

const ShipIcon = ({ size = 24, className = '', style = {} }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ship hull */}
      <path
        d="M 2 18 L 4 14 L 8 12 L 16 12 L 20 14 L 22 18 L 2 18 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="0.5"
      />
      {/* Ship deck */}
      <path
        d="M 4 14 L 4 10 L 20 10 L 20 14 Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth="0.5"
      />
      {/* Ship containers/cargo */}
      <rect x="6" y="8" width="3" height="2" fill="#000000" />
      <rect x="10" y="8" width="3" height="2" fill="#000000" />
      <rect x="14" y="8" width="3" height="2" fill="#000000" />
      {/* Ship mast */}
      <line x1="12" y1="10" x2="12" y2="4" stroke="#000000" strokeWidth="1.5" />
      {/* Ship flag */}
      <path
        d="M 12 4 L 16 6 L 12 6 Z"
        fill="#000000"
      />
    </svg>
  );
};

export default ShipIcon;

