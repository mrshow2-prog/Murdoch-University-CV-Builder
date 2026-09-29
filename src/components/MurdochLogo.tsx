import React from 'react';

interface MurdochLogoProps {
  className?: string;
  variant?: 'white' | 'red';
  showSubtitle?: boolean;
}

export const MurdochLogo: React.FC<MurdochLogoProps> = ({ 
  className = "h-9",
  variant = 'white',
  showSubtitle = true
}) => {
  const isWhite = variant === 'white';
  const muColor = isWhite ? '#FFFFFF' : '#E4002B';
  const textColor = isWhite ? '#FFFFFF' : '#E4002B';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Murdoch University SVG Wordmark */}
      <svg 
        viewBox="0 0 240 60" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* MU Symbol */}
        <path 
          d="M6 50V10H20.5L29 30.5L37.5 10H52V50H40.5V26.5L33 44.5H25L17.5 26.5V50H6Z" 
          fill={muColor} 
        />
        <path 
          d="M58 10H70V34C70 41.5 74.5 45.5 81.5 45.5C88.5 45.5 93 41.5 93 34V10H105V34C105 48.5 95 55 81.5 55C68 55 58 48.5 58 34V10Z" 
          fill={muColor} 
        />
        {/* Murdoch University Text */}
        <text 
          x="114" 
          y="26" 
          fill={textColor} 
          fontFamily="'Calibri', 'Segoe UI', Arial, sans-serif" 
          fontSize="22" 
          fontWeight="900" 
          letterSpacing="-0.5"
        >
          Murdoch
        </text>
        <text 
          x="114" 
          y="49" 
          fill={textColor} 
          fontFamily="'Calibri', 'Segoe UI', Arial, sans-serif" 
          fontSize="22" 
          fontWeight="900" 
          letterSpacing="-0.5"
        >
          University
        </text>
      </svg>
      {/* Dubai Campus Subtitle */}
      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-white/30 pl-2.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">Dubai</span>
          <span className="text-[8.5px] text-white/80 font-semibold tracking-tight">Careers Office</span>
        </div>
      )}
    </div>
  );
};
