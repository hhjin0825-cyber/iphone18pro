import React, { useId } from 'react';
import { DeviceColorKey } from '../types/iphone';

interface ApplePhotoLogoProps {
  colorKey?: DeviceColorKey;
  variant?: '3d-mirror' | 'flat';
  lightPos?: { x: number; y: number };
  className?: string;
}

const MIRROR_PALETTES: Record<
  DeviceColorKey,
  {
    top: string;
    upperMid: string;
    horizonDark: string;
    lowerMid: string;
    bottom: string;
    rimGlow: string;
    shadowColor: string;
  }
> = {
  burgundy: {
    top: '#fff1f2',
    upperMid: '#fda4af',
    horizonDark: '#5b1222',
    lowerMid: '#e11d48',
    bottom: '#9f1239',
    rimGlow: 'rgba(255, 228, 230, 0.75)',
    shadowColor: 'rgba(20, 2, 7, 0.75)',
  },
  glacier: {
    top: '#ffffff',
    upperMid: '#e0f2fe',
    horizonDark: '#477692',
    lowerMid: '#bae6fd',
    bottom: '#7dd3fc',
    rimGlow: 'rgba(240, 249, 255, 0.85)',
    shadowColor: 'rgba(12, 34, 48, 0.6)',
  },
  black: {
    top: '#e2e8f0',
    upperMid: '#94a3b8',
    horizonDark: '#0f1117',
    lowerMid: '#475569',
    bottom: '#1e293b',
    rimGlow: 'rgba(226, 232, 240, 0.65)',
    shadowColor: 'rgba(0, 0, 0, 0.95)',
  },
  silver: {
    top: '#ffffff',
    upperMid: '#f8fafc',
    horizonDark: '#94a3b8',
    lowerMid: '#e2e8f0',
    bottom: '#cbd5e1',
    rimGlow: 'rgba(255, 255, 255, 0.95)',
    shadowColor: 'rgba(40, 44, 52, 0.45)',
  },
};

export const ApplePhotoLogo: React.FC<ApplePhotoLogoProps> = ({
  colorKey = 'silver',
  variant = '3d-mirror',
  lightPos = { x: 45, y: 35 },
  className = 'w-14 h-16',
}) => {
  const uid = useId().replace(/:/g, '');
  const maskId = `apple-photo-mask-${uid}`;
  const baseGradId = `apple-mirror-grad-${uid}`;
  const horizonGradId = `apple-horizon-grad-${uid}`;
  const glintGradId = `apple-glint-grad-${uid}`;
  const bevelFilterId = `apple-bevel-filter-${uid}`;

  const palette = MIRROR_PALETTES[colorKey];

  // Map percentage lightPos (0-100) into SVG viewBox (0-152 x 0-185)
  const lx = (lightPos.x / 100) * 152;
  const ly = (lightPos.y / 100) * 185;

  if (variant === 'flat') {
    return (
      <svg
        className={className}
        viewBox="0 0 152 185"
        aria-label="Apple Logo"
        role="img"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="152"
            height="185"
            style={{ maskType: 'luminance' }}
          >
            <rect x="0" y="0" width="152" height="185" fill="#000000" />
            <image
              href="/assets/aistudio/image_932e7ca7.png"
              x="-90"
              y="-76"
              width="323"
              height="347"
              preserveAspectRatio="none"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="152"
          height="185"
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 152 185"
      aria-label="Apple Metallic Mirror Logo"
      role="img"
      style={{
        filter: `drop-shadow(0 2px 5px ${palette.shadowColor}) drop-shadow(0 -0.5px 1px rgba(255,255,255,0.28))`,
      }}
    >
      <defs>
        {/* Exact luminance mask extracted directly from user-provided photo */}
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="152"
          height="185"
          style={{ maskType: 'luminance' }}
        >
          <rect x="0" y="0" width="152" height="185" fill="#000000" />
          <image
            href="/assets/aistudio/image_932e7ca7.png"
            x="-90"
            y="-76"
            width="323"
            height="347"
            preserveAspectRatio="none"
          />
        </mask>

        {/* PVD Liquid Mirror Base Gradient */}
        <linearGradient id={baseGradId} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={palette.top} />
          <stop offset="32%" stopColor={palette.upperMid} />
          <stop offset="52%" stopColor={palette.horizonDark} />
          <stop offset="72%" stopColor={palette.lowerMid} />
          <stop offset="100%" stopColor={palette.bottom} />
        </linearGradient>

        {/* Studio Horizon Glass Reflection Layer */}
        <linearGradient id={horizonGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </linearGradient>

        {/* Interactive Cursor Specular Highlight */}
        <radialGradient id={glintGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
          <stop offset="35%" stopColor={palette.rimGlow} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* 3D Embossed Bevel Edge Catchlight Filter built from exact photo luminance */}
        <filter id={bevelFilterId} x="-5%" y="-5%" width="110%" height="110%">
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="rawAlpha" />
          <feComponentTransfer in="rawAlpha" result="cleanAlpha">
            <feFuncA type="linear" slope="1.08" intercept="-0.03" />
          </feComponentTransfer>
          <feGaussianBlur in="cleanAlpha" stdDeviation="1.9" result="bevelMap" />
          <feSpecularLighting
            in="bevelMap"
            surfaceScale="5.5"
            specularConstant="1.25"
            specularExponent="26"
            lightingColor="#ffffff"
            result="specLight"
          >
            <fePointLight x={lx} y={ly} z="75" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            in2="cleanAlpha"
            operator="in"
            result="clippedBevelSpec"
          />
        </filter>
      </defs>

      {/* Masked Studio Mirror Emblem */}
      <g mask={`url(#${maskId})`}>
        {/* 1. Polished Metallic Chrome Base */}
        <rect x="0" y="0" width="152" height="185" fill={`url(#${baseGradId})`} />

        {/* 2. Curved Studio Horizon Reflection Band */}
        <path
          d="M-10,104 Q76,78 162,104 L162,190 L-10,190 Z"
          fill={`url(#${horizonGradId})`}
        />

        {/* 3. Dynamic Mouse-Tracked Specular Glow */}
        <circle cx={lx} cy={ly} r="88" fill={`url(#${glintGradId})`} opacity="0.7" />

        {/* 4. Crisp Diagonal Sapphire Glass Glare Slice */}
        <polygon
          points="-10,58 158,-18 168,26 -10,110"
          fill="rgba(255, 255, 255, 0.22)"
        />
        <polygon
          points="-10,118 168,36 168,46 -10,128"
          fill="rgba(255, 255, 255, 0.1)"
        />
      </g>

      {/* 5. Physical 3D Specular Bevel Rim & Edge Highlight from Uploaded Photo */}
      <image
        href="/assets/aistudio/image_932e7ca7.png"
        x="-90"
        y="-76"
        width="323"
        height="347"
        preserveAspectRatio="none"
        filter={`url(#${bevelFilterId})`}
        opacity="0.92"
        className="pointer-events-none"
      />
    </svg>
  );
};
