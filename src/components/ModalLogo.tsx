import React from 'react';

interface ModalLogoProps {
  className?: string;
  showBadge?: boolean;
}

export const ModalLogo: React.FC<ModalLogoProps> = ({ className = '', showBadge = true }) => {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Modal-inspired Dual-Prism Geometric M Logo */}
      <svg
        className="w-7 h-7 shrink-0"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="modalBrand1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-text-main)" />
            <stop offset="100%" stopColor="var(--color-accent-pri)" />
          </linearGradient>
          <linearGradient id="modalBrand2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-pri)" />
            <stop offset="100%" stopColor="#5F9374" />
          </linearGradient>
        </defs>

        {/* Left Prism */}
        <polygon
          points="4,26 12,6 16,10 8,30"
          fill="url(#modalBrand1)"
        />
        {/* Right Prism */}
        <polygon
          points="16,26 24,6 28,10 20,30"
          fill="url(#modalBrand2)"
        />
        {/* Geometric cross-accent with secondary tone */}
        <polygon
          points="12,6 16,10 24,6 20,2"
          fill="var(--color-accent-sec)"
          opacity="0.9"
        />
      </svg>

      <div className="flex items-center gap-1.5">
        <span className="font-black tracking-tight text-text-main text-base sm:text-lg font-sans">
          Odyssey
        </span>
        {showBadge && (
          <span className="px-1.5 py-0.5 bg-surface-subtle border border-border-strong text-accent-pri text-[10px] font-mono font-bold rounded">
            v0.1-atlas
          </span>
        )}
      </div>
    </div>
  );
};
