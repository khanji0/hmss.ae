import React from 'react';

const UAEFlag = ({ className = '', style = {} }) => {
  return (
    <svg
      width="100"
      height="50"
      viewBox="0 0 120 60"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Red vertical stripe on the left (1/4 of width) */}
      <rect
        x="0"
        y="0"
        width="30"
        height="60"
        fill="#FF0000"
      />
      
      {/* Green horizontal stripe (top) */}
      <rect
        x="30"
        y="0"
        width="90"
        height="20"
        fill="#00FF00"
      />
      
      {/* White horizontal stripe (middle) */}
      <rect
        x="30"
        y="20"
        width="90"
        height="20"
        fill="#FFFFFF"
      />
      
      {/* Black horizontal stripe (bottom) */}
      <rect
        x="30"
        y="40"
        width="90"
        height="20"
        fill="#000000"
      />
    </svg>
  );
};

export default UAEFlag;

