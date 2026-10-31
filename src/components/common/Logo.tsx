import React from 'react';
import Link from 'next/link';

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  showText = true,
  size = 'md',
  className = '',
  href = '/',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const LogoIcon = (
    <div
      className={`relative ${iconSizes[size]} rounded-2xl shadow-md shadow-emerald-600/20 group-hover:shadow-emerald-600/35 transition-all duration-300 group-hover:scale-105 shrink-0 flex items-center justify-center`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Deep emerald-to-teal backdrop */}
          <linearGradient id="ccLogoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="0.6" stopColor="#0d9488" />
            <stop offset="1" stopColor="#047857" />
          </linearGradient>

          {/* Left C (Care): Luminous White Gradient */}
          <linearGradient id="ccLeftGrad" x1="12" y1="18" x2="36" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#ecfdf5" />
          </linearGradient>

          {/* Right C (Connect): Vibrant Mint-to-White Gradient */}
          <linearGradient id="ccRightGrad" x1="28" y1="18" x2="52" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6ee7b7" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>

          {/* Clean ambient drop shadow */}
          <filter id="ccSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#022c22" floodOpacity="0.35" />
          </filter>

          {/* 3D Interlock weave shadow */}
          <filter id="ccWeaveShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1.5" dy="1.5" stdDeviation="1.5" floodColor="#022c22" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Squircle App Container */}
        <rect width="64" height="64" rx="18" fill="url(#ccLogoBg)" />
        <rect
          x="1"
          y="1"
          width="62"
          height="62"
          rx="17"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.2"
          fill="none"
        />

        {/* 1. Left 'C' (Care) - Base Arc */}
        <path
          d="M 36 41 A 13.5 13.5 0 1 1 36 23"
          stroke="url(#ccLeftGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#ccSoftShadow)"
        />

        {/* 2. Right 'C' (Connect) - Interlinking Loop */}
        <path
          d="M 52 41 A 13.5 13.5 0 1 1 52 23"
          stroke="url(#ccRightGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#ccSoftShadow)"
        />

        {/* 3. Left 'C' Top Arm Weaves OVER Right 'C' (Flawless 3D Chain Interlock) */}
        <path
          d="M 30 18.8 A 13.5 13.5 0 0 1 36 23"
          stroke="url(#ccLeftGrad)"
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#ccWeaveShadow)"
        />
      </svg>
    </div>
  );

  const Content = (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {LogoIcon}
      {showText && (
        <span
          className={`${textSizes[size]} font-extrabold tracking-tight text-foreground transition-colors flex items-center select-none`}
        >
          Care<span className="text-primary font-black ml-0.5">Connect</span>
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{Content}</Link>;
  }

  return Content;
};
