import React, { useState, useRef, useEffect } from 'react';
import { DeviceColor } from '../types/iphone';
import { ApplePhotoLogo } from './ApplePhotoLogo';
import {
  ZoomIn,
  Play,
  Pause,
  RotateCcw,
  Aperture,
  Music,
  Bell,
  PhoneCall,
  Compass,
  Camera,
  Flashlight,
  FlipHorizontal,
  Box,
} from 'lucide-react';

interface DeviceModelViewProps {
  currentColor: DeviceColor;
  viewSide?: 'back' | 'front' | 'side-by-side' | 'unified-3d';
  showAnnotations?: boolean;
}

const CHASSIS_Z_SLICES = [-11.5, -9.5, -7.5, -5.5, -3.5, -1.5, 0, 1.5, 3.5, 5.5, 7.5, 9.5, 11.5];

export const DeviceModelView: React.FC<DeviceModelViewProps> = ({
  currentColor,
  viewSide = 'side-by-side',
  showAnnotations = true,
}) => {
  const [hoveredLens, setHoveredLens] = useState<string | null>(null);
  const [isMacroZoom, setIsMacroZoom] = useState<boolean>(false);
  const [apertureClosed, setApertureClosed] = useState<boolean>(false);

  // Motion & True 3D Orbit states
  const [isFloating, setIsFloating] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [autoSpin, setAutoSpin] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Default 3/4 hero angles so 3D depth, titanium rim, USB-C, and protruding lenses pop immediately
  const defaultAngle =
    viewSide === 'unified-3d'
      ? { x: 8, y: 158 }
      : viewSide === 'back'
      ? { x: 8, y: 158 }
      : { x: 7, y: 0 };

  const [orbit, setOrbit] = useState<{ x: number; y: number }>(defaultAngle);
  const [hoverTilt, setHoverTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 42, y: 32 });

  const dragStartRef = useRef<{ x: number; y: number; orbitX: number; orbitY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive Dynamic Island states
  const [islandState, setIslandState] = useState<'compact' | 'music' | 'timer' | 'call'>('compact');

  // Reset default angle when switching viewSide
  useEffect(() => {
    setAutoSpin(false);
    setOrbit(
      viewSide === 'unified-3d'
        ? { x: 8, y: 158 }
        : viewSide === 'back'
        ? { x: 8, y: 158 }
        : { x: 7, y: 0 }
    );
  }, [viewSide]);

  // Continuous 360 turntable spin
  useEffect(() => {
    if (!autoSpin || isDragging) return;
    const interval = setInterval(() => {
      setOrbit((prev) => ({ ...prev, y: (prev.y + 1.1) % 360 }));
    }, 24);
    return () => clearInterval(interval);
  }, [autoSpin, isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMacroZoom) return;
    // Ignore clicks on interactive buttons/lenses
    const target = e.target as HTMLElement;
    if (target.closest('[data-interactive="true"]')) return;

    setIsDragging(true);
    setAutoSpin(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      orbitX: orbit.x,
      orbitY: orbit.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMacroZoom) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;

    setLightPos({
      x: Math.max(5, Math.min(95, px)),
      y: Math.max(5, Math.min(95, py)),
    });

    if (isDragging && dragStartRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setOrbit({
        x: Math.max(-45, Math.min(45, dragStartRef.current.orbitX - dy * 0.25)),
        y: dragStartRef.current.orbitY + dx * 0.45,
      });
      return;
    }

    setIsHovered(true);
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setHoverTilt({
      x: ((e.clientY - rect.top - centerY) / centerY) * -6,
      y: ((e.clientX - rect.left - centerX) / centerX) * 8,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      dragStartRef.current = null;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverTilt({ x: 0, y: 0 });
    setLightPos({ x: 42, y: 32 });
  };

  const handleFlipDevices = () => {
    setAutoSpin(false);
    setOrbit((prev) => ({ x: 8, y: prev.y + 180 }));
  };

  const handleResetAngle = () => {
    setAutoSpin(false);
    setHoverTilt({ x: 0, y: 0 });
    setOrbit(defaultAngle);
  };

  // Authentic Apple color profiles & 3D metallic PBR shader values
  const colorMap = {
    burgundy: {
      name: '버건디 (Burgundy)',
      backGlass: 'linear-gradient(155deg, #641727 0%, #4a0f1c 48%, #320812 100%)',
      islandPlateau: '#470f1b',
      islandTop: 'linear-gradient(145deg, #5a1524 0%, #440d19 60%, #310811 100%)',
      islandBorder: '#7c1e32',
      islandSkirt: '#29060e',
      islandShadow: 'rgba(18, 2, 6, 0.78)',
      frameRim: '#6d1b2d',
      frameSide: 'linear-gradient(90deg, #400b17 0%, #7f2236 32%, #a83951 50%, #6d192b 72%, #390913 100%)',
      frameVertical: 'linear-gradient(180deg, #7c2235 0%, #52101f 50%, #7c2235 100%)',
      buttonBg: 'linear-gradient(180deg, #983247 0%, #5f1525 100%)',
      frameHighlight: '#9c2d45',
      lensBezel: '#882439',
      lensRingDark: '#26060d',
      ambientGlow: 'rgba(186, 24, 67, 0.38)',
      ribbonStroke1: '#7d1e31',
      ribbonStroke2: '#4a0e19',
      ribbonGlow: '#9b2b42',
      engravingPrimary: 'rgba(255, 228, 234, 0.36)',
      engravingSecondary: 'rgba(255, 228, 234, 0.22)',
      magsafeRing: 'rgba(255, 220, 228, 0.14)',
    },
    glacier: {
      name: '글레이셔 (Glacier)',
      backGlass: 'linear-gradient(155deg, #a6c3d6 0%, #86a6ba 48%, #6d8c9f 100%)',
      islandPlateau: '#84a2b5',
      islandTop: 'linear-gradient(145deg, #9cb9cc 0%, #82a0b4 60%, #6b899c 100%)',
      islandBorder: '#b8d3e4',
      islandSkirt: '#587485',
      islandShadow: 'rgba(20, 38, 50, 0.62)',
      frameRim: '#94b2c5',
      frameSide: 'linear-gradient(90deg, #627f91 0%, #a5c3d6 30%, #d4ebf8 50%, #8aa9bd 72%, #597687 100%)',
      frameVertical: 'linear-gradient(180deg, #b0cee0 0%, #7393a7 50%, #b0cee0 100%)',
      buttonBg: 'linear-gradient(180deg, #c7e0f0 0%, #7d9eb2 100%)',
      frameHighlight: '#cce4f4',
      lensBezel: '#a4c5d9',
      lensRingDark: '#253946',
      ambientGlow: 'rgba(56, 189, 248, 0.35)',
      ribbonStroke1: '#b4d3e8',
      ribbonStroke2: '#7395ab',
      ribbonGlow: '#cde4f4',
      engravingPrimary: 'rgba(255, 255, 255, 0.48)',
      engravingSecondary: 'rgba(255, 255, 255, 0.3)',
      magsafeRing: 'rgba(255, 255, 255, 0.2)',
    },
    black: {
      name: '블랙 (Black)',
      backGlass: 'linear-gradient(155deg, #28282d 0%, #19191d 48%, #0f0f12 100%)',
      islandPlateau: '#19191d',
      islandTop: 'linear-gradient(145deg, #25252b 0%, #17171b 60%, #0e0e11 100%)',
      islandBorder: '#383840',
      islandSkirt: '#070709',
      islandShadow: 'rgba(0, 0, 0, 0.9)',
      frameRim: '#383842',
      frameSide: 'linear-gradient(90deg, #121215 0%, #3a3a42 30%, #5c5c68 50%, #2c2c33 72%, #111114 100%)',
      frameVertical: 'linear-gradient(180deg, #43434d 0%, #1f1f24 50%, #43434d 100%)',
      buttonBg: 'linear-gradient(180deg, #575763 0%, #27272d 100%)',
      frameHighlight: '#5f5f6b',
      lensBezel: '#444450',
      lensRingDark: '#0b0b0d',
      ambientGlow: 'rgba(168, 85, 247, 0.28)',
      ribbonStroke1: '#3c3c44',
      ribbonStroke2: '#1e1e22',
      ribbonGlow: '#585864',
      engravingPrimary: 'rgba(226, 232, 240, 0.34)',
      engravingSecondary: 'rgba(226, 232, 240, 0.2)',
      magsafeRing: 'rgba(255, 255, 255, 0.1)',
    },
    silver: {
      name: '실버 (Silver)',
      backGlass: 'linear-gradient(155deg, #f0f1f4 0%, #dfdfE4 48%, #c9cbd1 100%)',
      islandPlateau: '#dcdde2',
      islandTop: 'linear-gradient(145deg, #ededf0 0%, #d8d9de 60%, #c6c7cd 100%)',
      islandBorder: '#ffffff',
      islandSkirt: '#9fa2aa',
      islandShadow: 'rgba(65, 68, 76, 0.45)',
      frameRim: '#dcdde3',
      frameSide: 'linear-gradient(90deg, #989ba3 0%, #e4e6eb 28%, #ffffff 50%, #c8cbd2 74%, #91949c 100%)',
      frameVertical: 'linear-gradient(180deg, #f3f4f7 0%, #b7bac2 50%, #f3f4f7 100%)',
      buttonBg: 'linear-gradient(180deg, #ffffff 0%, #b9bcc4 100%)',
      frameHighlight: '#ffffff',
      lensBezel: '#e4e6eb',
      lensRingDark: '#696c74',
      ambientGlow: 'rgba(226, 232, 240, 0.38)',
      ribbonStroke1: '#ffffff',
      ribbonStroke2: '#c8c8cc',
      ribbonGlow: '#ffffff',
      engravingPrimary: 'rgba(40, 44, 52, 0.48)',
      engravingSecondary: 'rgba(40, 44, 52, 0.3)',
      magsafeRing: 'rgba(40, 45, 55, 0.12)',
    },
  }[currentColor.key];

  // Reusable 3D Titanium/Aluminum Extruded Core + Side Rails + Bottom USB-C / Speakers
  const renderChassis3DCasing = () => (
    <>
      {/* 1. 13-Slice CNC Metallic Core Extrusion (fills curved 52px corners seamlessly at all 360 angles) */}
      {CHASSIS_Z_SLICES.map((z, idx) => {
        const isEdgeChamfer = idx === 0 || idx === CHASSIS_Z_SLICES.length - 1;
        return (
          <div
            key={z}
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              transform: `translateZ(${z}px)`,
              backgroundColor: colorMap.frameRim,
              border: `2px solid ${isEdgeChamfer ? colorMap.frameHighlight : colorMap.frameRim}`,
              boxShadow: isEdgeChamfer ? 'inset 0 0 4px rgba(255,255,255,0.22)' : undefined,
            }}
          />
        );
      })}

      {/* 2. Left Brushed Titanium Rail (-X outward normal) */}
      <div
        className="absolute top-[52px] bottom-[52px] left-0 w-[26px] pointer-events-none"
        style={{
          marginLeft: '-13px',
          transform: 'rotateY(-90deg)',
          transformStyle: 'preserve-3d',
          background: colorMap.frameSide,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top & Bottom PVD Antenna Band Breaks */}
        <div className="w-full h-[3px] bg-black/55 mt-8" />
        <div className="w-full h-[3px] bg-black/55 absolute bottom-10" />

        {/* 3D Extruded Action Button */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-16 w-[8px] h-9 rounded-full border border-white/25 shadow-md"
          style={{
            transform: 'translateZ(2.5px)',
            background: colorMap.buttonBg,
          }}
        >
          <div className="w-[2px] h-5 bg-black/35 rounded-full mx-auto mt-2" />
        </div>

        {/* 3D Extruded Volume Up */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-28 w-[7px] h-14 rounded-full border border-white/25 shadow-md"
          style={{
            transform: 'translateZ(2.5px)',
            background: colorMap.buttonBg,
          }}
        />

        {/* 3D Extruded Volume Down */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-46 w-[7px] h-14 rounded-full border border-white/25 shadow-md"
          style={{
            transform: 'translateZ(2.5px)',
            background: colorMap.buttonBg,
          }}
        />
      </div>

      {/* 3. Right Brushed Titanium Rail (+X outward normal) */}
      <div
        className="absolute top-[52px] bottom-[52px] right-0 w-[26px] pointer-events-none"
        style={{
          marginRight: '-13px',
          transform: 'rotateY(90deg)',
          transformStyle: 'preserve-3d',
          background: colorMap.frameSide,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top & Bottom PVD Antenna Band Breaks */}
        <div className="w-full h-[3px] bg-black/55 mt-8" />
        <div className="w-full h-[3px] bg-black/55 absolute bottom-10" />

        {/* 3D Extruded Side Power / Siri Button */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-22 w-[7px] h-20 rounded-full border border-white/25 shadow-md"
          style={{
            transform: 'translateZ(2.5px)',
            background: colorMap.buttonBg,
          }}
        />

        {/* 3D Sapphire Camera Control Touch Button (Flush-Recessed Crystal Bar) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-24 w-[8px] h-16 rounded-full border border-white/45 bg-neutral-950 shadow-inner flex items-center justify-center"
          style={{
            transform: 'translateZ(1.2px)',
          }}
        >
          <div className="w-[3px] h-11 rounded-full bg-gradient-to-b from-neutral-500 via-neutral-800 to-neutral-500" />
        </div>
      </div>

      {/* 4. Top Brushed Rail (+Y upward normal) */}
      <div
        className="absolute left-[52px] right-[52px] top-0 h-[26px] pointer-events-none flex items-center justify-between px-4"
        style={{
          marginTop: '-13px',
          transform: 'rotateX(90deg)',
          background: colorMap.frameVertical,
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
        }}
      >
        <div className="w-[3px] h-full bg-black/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-black/70 border border-white/15" />
        <div className="w-[3px] h-full bg-black/50" />
      </div>

      {/* 5. Bottom Brushed Rail (-Y downward normal): USB-C Port, Pentalobe Screws & Speaker Holes */}
      <div
        className="absolute left-[52px] right-[52px] bottom-0 h-[26px] pointer-events-none flex items-center justify-between px-4"
        style={{
          marginBottom: '-13px',
          transform: 'rotateX(-90deg)',
          background: colorMap.frameVertical,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)',
        }}
      >
        {/* Left Speaker Micro-Holes */}
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="w-1.5 h-1.5 rounded-full bg-neutral-950 border border-white/15 shadow-inner" />
          ))}
        </div>

        {/* Left Pentalobe Screw + USB-C Port + Right Pentalobe Screw */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 border border-black/80" />
          {/* USB-C Titanium Recessed Port */}
          <div className="w-9 h-3 rounded-full bg-neutral-950 border border-white/25 shadow-inner flex items-center justify-center">
            <div className="w-5.5 h-[3px] rounded-full bg-neutral-500/80" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 border border-black/80" />
        </div>

        {/* Right Speaker Micro-Holes */}
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="w-1.5 h-1.5 rounded-full bg-neutral-950 border border-white/15 shadow-inner" />
          ))}
        </div>
      </div>
    </>
  );

  // Reusable 3D Rear Glass Surface with Extruded Camera Island & Raised Triple Lens Barrels
  const renderRearFace = (faceTransform: string, hideBackface = false) => (
    <div
      className="absolute inset-0 rounded-[52px] p-2.5 group"
      style={{
        transform: faceTransform,
        transformStyle: 'preserve-3d',
        backfaceVisibility: hideBackface ? 'hidden' : 'visible',
        background: colorMap.backGlass,
        border: `2.5px solid ${colorMap.frameRim}`,
        boxShadow: `
          inset 0 1px 2px rgba(255,255,255,0.45),
          inset 0 -1px 2px rgba(0,0,0,0.45)
        `,
      }}
    >
      {/* Clipped Glass Surface Sheen, Edge Chamfer & Subtle MagSafe Coil Silhouette */}
      <div className="absolute inset-0 rounded-[49.5px] overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-55 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle 480px at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.72) 0%, transparent 70%)`,
          }}
        />
        {/* 2.5D Ceramic Shield Glass Inner Edge Highlight */}
        <div
          className="absolute inset-[2px] rounded-[48px] border border-white/15 pointer-events-none"
        />
        {/* Authentic Satin MagSafe Magnetic Ring + Alignment Bar */}
        <div
          className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-35 group-hover:opacity-75 transition-opacity duration-500"
        >
          <div
            className="w-36 h-36 rounded-full"
            style={{
              border: `4px solid ${colorMap.magsafeRing}`,
            }}
          />
          <div
            className="w-2.5 h-6 rounded-full"
            style={{ backgroundColor: colorMap.magsafeRing }}
          />
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3D EXTRUDED WIDE HORIZON CAMERA ISLAND (5-TIER SOLID SKIRT STACK)  */}
      {/* =================================================================== */}
      <div
        className="relative w-full h-36"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ambient Shadow Cast on Ceramic Shield Back Glass */}
        <div
          className="absolute inset-0 rounded-[38px] pointer-events-none"
          style={{
            transform: 'translateZ(0.4px) translateY(3px)',
            boxShadow: `0 16px 28px ${colorMap.islandShadow}`,
          }}
        />

        {/* Extruded Camera Island 5-Layer Solid Wall (seamless bump wall from every angle) */}
        {[1.0, 2.2, 3.4, 4.6, 5.6].map((pz) => (
          <div
            key={pz}
            className="absolute inset-0 rounded-[38px] pointer-events-none"
            style={{
              transform: `translateZ(${pz}px)`,
              backgroundColor: colorMap.islandSkirt,
              border: `1.5px solid ${colorMap.islandBorder}`,
            }}
          />
        ))}

        {/* Top Machined Camera Plateau Face (translateZ 6px) */}
        <div
          className="absolute inset-0 rounded-[38px] p-3.5 transition-all duration-300"
          style={{
            transform: 'translateZ(6px)',
            transformStyle: 'preserve-3d',
            background: colorMap.islandTop,
            border: `2px solid ${colorMap.islandBorder}`,
            boxShadow: `
              inset 0 2.5px 6px rgba(255,255,255,0.48),
              inset 0 -2.5px 6px rgba(0,0,0,0.55)
            `,
          }}
        >
          {/* Specular Brushed Grain Sweep */}
          <div
            className="absolute inset-0 rounded-[36px] pointer-events-none opacity-25 mix-blend-overlay overflow-hidden"
            style={{
              background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0px, transparent 1px, transparent 3px)',
            }}
          />

          <div
            className="relative w-full h-full flex items-center justify-between px-1"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Left Cluster: 3 Physically Extruded Multi-Ring Pro Lens Barrels */}
            <div className="relative w-40 h-28" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* 1. Top-Left Lens: 48MP Main Variable Aperture (5-Slice Solid 3D Barrel) */}
              <div
                data-interactive="true"
                onMouseEnter={() => setHoveredLens('main')}
                onMouseLeave={() => setHoveredLens(null)}
                onClick={() => setApertureClosed(!apertureClosed)}
                className="absolute top-0.5 left-0.5 w-13 h-13 cursor-pointer transition-transform hover:scale-105"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(1px)' }}
                title="클릭 시 6엽 가변 조리개 실시간 구동"
              >
                {[1.2, 2.4, 3.6, 4.6].map((bz) => (
                  <div
                    key={bz}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      transform: `translateZ(${bz}px)`,
                      backgroundColor: colorMap.lensRingDark,
                      border: `2px solid ${colorMap.lensBezel}`,
                    }}
                  />
                ))}
                {/* Top Sapphire Glass Housing (translateZ 5.5px) */}
                <div
                  className="absolute inset-[1px] rounded-full"
                  style={{
                    transform: 'translateZ(5.5px)',
                    background: 'radial-gradient(circle at 32% 32%, #32323d 0%, #0d0d12 72%, #000 100%)',
                    border: `2.5px solid ${colorMap.lensBezel}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.85), inset 0 1px 4px rgba(255,255,255,0.55)',
                  }}
                >
                  {/* Optical Anti-Reflective Baffle Micro-Rings */}
                  <div
                    className="absolute inset-1 rounded-full border border-cyan-400/60 flex items-center justify-center"
                    style={{
                      background:
                        'repeating-radial-gradient(circle, #06080f 0px, #0d1522 2px, #04060c 4px)',
                    }}
                  >
                    {/* 6-Blade Mechanical Iris Pupil */}
                    <div
                      className={`rounded-full bg-black border border-rose-500/85 shadow-inner flex items-center justify-center transition-all duration-300 ${
                        apertureClosed ? 'w-3.5 h-3.5' : 'w-6 h-6'
                      }`}
                    >
                      <div
                        className={`rounded-full bg-cyan-400 shadow-[0_0_7px_#38bdf8] transition-all duration-300 ${
                          apertureClosed ? 'w-1 h-1' : 'w-2 h-2 animate-pulse'
                        }`}
                      />
                    </div>
                    <div className="absolute top-1 left-1.5 w-4 h-2 rounded-full bg-white/30 -rotate-35 blur-[0.5px] pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-300/40 blur-[0.4px] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 2. Bottom-Left Lens: 48MP Ultra-Wide (5-Slice Solid 3D Barrel) */}
              <div
                data-interactive="true"
                onMouseEnter={() => setHoveredLens('ultrawide')}
                onMouseLeave={() => setHoveredLens(null)}
                className="absolute bottom-0.5 left-0.5 w-13 h-13 cursor-pointer transition-transform hover:scale-105"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(1px)' }}
              >
                {[1.2, 2.4, 3.6, 4.6].map((bz) => (
                  <div
                    key={bz}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      transform: `translateZ(${bz}px)`,
                      backgroundColor: colorMap.lensRingDark,
                      border: `2px solid ${colorMap.lensBezel}`,
                    }}
                  />
                ))}
                <div
                  className="absolute inset-[1px] rounded-full"
                  style={{
                    transform: 'translateZ(5.5px)',
                    background: 'radial-gradient(circle at 32% 32%, #32323d 0%, #0d0d12 72%, #000 100%)',
                    border: `2.5px solid ${colorMap.lensBezel}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.85), inset 0 1px 4px rgba(255,255,255,0.55)',
                  }}
                >
                  <div
                    className="absolute inset-1 rounded-full border border-purple-400/60 flex items-center justify-center"
                    style={{
                      background:
                        'repeating-radial-gradient(circle, #090612 0px, #19102b 2px, #05040a 4px)',
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-black border border-purple-500/70 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_5px_#a855f7]" />
                    </div>
                    <div className="absolute top-1 left-1.5 w-4 h-2 rounded-full bg-white/30 -rotate-35 blur-[0.5px] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* 3. Middle-Right Lens: 48MP Periscope Telephoto (5-Slice Solid 3D Barrel) */}
              <div
                data-interactive="true"
                onMouseEnter={() => setHoveredLens('telephoto')}
                onMouseLeave={() => setHoveredLens(null)}
                className="absolute top-7 left-18 w-13 h-13 cursor-pointer transition-transform hover:scale-105"
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(1px)' }}
              >
                {[1.2, 2.4, 3.6, 4.6].map((bz) => (
                  <div
                    key={bz}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      transform: `translateZ(${bz}px)`,
                      backgroundColor: colorMap.lensRingDark,
                      border: `2px solid ${colorMap.lensBezel}`,
                    }}
                  />
                ))}
                <div
                  className="absolute inset-[1px] rounded-full"
                  style={{
                    transform: 'translateZ(5.5px)',
                    background: 'radial-gradient(circle at 32% 32%, #32323d 0%, #0d0d12 72%, #000 100%)',
                    border: `2.5px solid ${colorMap.lensBezel}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.85), inset 0 1px 4px rgba(255,255,255,0.55)',
                  }}
                >
                  <div
                    className="absolute inset-1 rounded-full border border-emerald-400/60 flex items-center justify-center"
                    style={{
                      background:
                        'repeating-radial-gradient(circle, #050d0c 0px, #0b1f1c 2px, #030706 4px)',
                    }}
                  >
                    <div className="w-5 h-5 rounded-xs bg-black border border-emerald-500/70 shadow-inner flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-xs bg-indigo-500 shadow-[0_0_6px_#6366f1]" />
                    </div>
                    <div className="absolute top-1 left-1.5 w-4 h-2 rounded-full bg-white/30 -rotate-35 blur-[0.5px] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Raised True Tone Flash, Mic Mesh & LiDAR */}
            <div
              className="flex flex-col items-center justify-between h-28 pr-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                data-interactive="true"
                onMouseEnter={() => setHoveredLens('flash')}
                onMouseLeave={() => setHoveredLens(null)}
                className="w-7 h-7 rounded-full bg-amber-50 border-2 border-white/95 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-115"
                style={{ transform: 'translateZ(2px)' }}
              >
                <div className="grid grid-cols-2 gap-0.5 p-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
              </div>

              <div
                className="w-2.5 h-2.5 rounded-full bg-black/95 border border-white/25 shadow-inner"
                style={{ transform: 'translateZ(0.5px)' }}
                title="스튜디오 빔포밍 마이크"
              />

              <div
                data-interactive="true"
                onMouseEnter={() => setHoveredLens('lidar')}
                onMouseLeave={() => setHoveredLens(null)}
                className="w-6.5 h-6.5 rounded-full bg-neutral-950 border border-white/35 shadow-inner flex items-center justify-center cursor-pointer transition-transform hover:scale-115"
                style={{ transform: 'translateZ(1.5px)' }}
                title="LiDAR 3D 공간 스캐너"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-purple-500/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* PHOTO-ACCURATE 3D MIRROR APPLE LOGO                                 */}
      {/* =================================================================== */}
      <div
        className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ transform: 'translateZ(1px)' }}
      >
        <ApplePhotoLogo
          colorKey={currentColor.key}
          variant="3d-mirror"
          lightPos={lightPos}
          className="w-13 h-16 sm:w-14 sm:h-[68px] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Bottom Color-Aware Laser Engraving & Regulatory Markings */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 text-[9px] font-mono tracking-widest uppercase whitespace-nowrap pointer-events-none"
        style={{
          transform: 'translateZ(0.5px)',
          color: colorMap.engravingPrimary,
        }}
      >
        <span className="font-semibold">iPhone 18 Pro</span>
        <span className="text-[7px]" style={{ color: colorMap.engravingSecondary }}>
          Designed by Apple in California · CE
        </span>
      </div>

      {/* Hover Lens Callout */}
      {hoveredLens && (
        <div
          className="absolute top-42 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-mono text-white shadow-2xl z-30 whitespace-nowrap animate-in fade-in"
          style={{ transform: 'translateZ(18px)' }}
        >
          {hoveredLens === 'main' && '48MP 메인 가변 조리개 (ƒ/1.48~ƒ/4.8) · 6엽 물리 셔터'}
          {hoveredLens === 'ultrawide' && '48MP 초광각 (13mm, 120° FOV) · 접사 AF'}
          {hoveredLens === 'telephoto' && '48MP 잠망경 망원 (100mm 4x-40x) · OIS'}
          {hoveredLens === 'flash' && '어댑티브 트루톤 쿼드 LED 플래시'}
          {hoveredLens === 'lidar' && 'LiDAR 스캐너 & 공간 비디오 마이크'}
        </div>
      )}
    </div>
  );

  // Reusable 3D Front OLED Glass Face with Ultra-Slim Bezel, Earpiece Slit & Interactive Dynamic Island
  const renderFrontFace = (faceTransform: string, hideBackface = false) => (
    <div
      className="absolute inset-0 rounded-[52px] p-2.5 bg-black"
      style={{
        transform: faceTransform,
        transformStyle: 'preserve-3d',
        backfaceVisibility: hideBackface ? 'hidden' : 'visible',
        border: `2.5px solid ${colorMap.frameRim}`,
        boxShadow: `
          inset 0 1px 2px rgba(255,255,255,0.35),
          inset 0 -1px 2px rgba(0,0,0,0.6)
        `,
      }}
    >
      {/* Top Bezel Micro Earpiece Speaker Slit */}
      <div
        className="absolute top-[5px] left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full bg-neutral-900 border border-white/15 z-20"
        style={{ transform: 'translateZ(0.5px)' }}
      />

      {/* Ultra-Slim 1.15mm Uniform OLED Display */}
      <div className="w-full h-full rounded-[45px] relative overflow-hidden flex flex-col justify-between p-3.5 bg-black border border-white/[0.08]">
        {/* 3D Curved Metallic Ribbon Wallpaper */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 680" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`ribbonGrad-${currentColor.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorMap.ribbonStroke1} stopOpacity="0.9" />
              <stop offset="50%" stopColor={colorMap.ribbonGlow} stopOpacity="0.95" />
              <stop offset="100%" stopColor={colorMap.ribbonStroke2} stopOpacity="0.65" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect width="300" height="680" fill="#060608" />

          <path
            d="M-20,130 C120,90 220,230 180,360 C140,500 280,570 320,620"
            fill="none"
            stroke={colorMap.ribbonStroke2}
            strokeWidth="50"
            strokeLinecap="round"
            opacity="0.4"
            filter="url(#softGlow)"
          />
          <path
            d="M40,170 C180,130 260,250 220,380 C180,510 120,560 260,630"
            fill="none"
            stroke={`url(#ribbonGrad-${currentColor.key})`}
            strokeWidth="40"
            strokeLinecap="round"
            opacity="0.92"
          />
          <path
            d="M45,165 C185,125 265,245 225,375 C185,505 125,555 265,625"
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M280,270 C160,320 80,430 120,540"
            fill="none"
            stroke={`url(#ribbonGrad-${currentColor.key})`}
            strokeWidth="34"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>

        {/* Glass Specular Sweep Overlay across OLED Screen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
          style={{
            background: `radial-gradient(circle 360px at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.4) 0%, transparent 68%)`,
          }}
        />

        {/* Status Bar & Clickable Interactive Dynamic Island */}
        <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-white px-2 pt-1">
          <span className="font-bold">9:41</span>

          <div
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              const states: ('compact' | 'music' | 'timer' | 'call')[] = ['compact', 'music', 'timer', 'call'];
              const next = states[(states.indexOf(islandState) + 1) % states.length];
              setIslandState(next);
            }}
            className={`bg-black rounded-full border border-white/20 flex items-center justify-between shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              islandState === 'compact'
                ? 'w-22 h-6 px-2.5'
                : islandState === 'music'
                ? 'w-44 h-7 px-3 bg-neutral-950/95'
                : islandState === 'timer'
                ? 'w-40 h-7 px-3 bg-neutral-950/95'
                : 'w-48 h-8 px-3 bg-neutral-950/95'
            }`}
            title="클릭하여 Dynamic Island 확장 모드 전환"
          >
            {islandState === 'compact' && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] text-neutral-300 font-mono">35% UDIR</span>
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </>
            )}
            {islandState === 'music' && (
              <div className="flex items-center justify-between w-full text-[9px] font-mono">
                <div className="flex items-center gap-1.5">
                  <Music className="w-3 h-3 text-pink-400" />
                  <span className="text-white truncate max-w-[80px]">NewJeans</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-2.5 bg-emerald-400 animate-pulse" />
                  <span className="w-0.5 h-4 bg-emerald-400" />
                  <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
                </div>
              </div>
            )}
            {islandState === 'timer' && (
              <div className="flex items-center justify-between w-full text-[9px] font-mono">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300">타이머</span>
                </div>
                <span className="text-white font-bold">14:59</span>
              </div>
            )}
            {islandState === 'call' && (
              <div className="flex items-center justify-between w-full text-[9px] font-mono">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  <span className="text-white">Tim Cook</span>
                </div>
                <span className="text-emerald-400 text-[8px]">00:42</span>
              </div>
            )}
          </div>

          <span className="tracking-tighter">5G ■</span>
        </div>

        {/* Center Lockscreen Display */}
        <div className="relative z-10 my-auto text-center space-y-1.5 drop-shadow-md pointer-events-none">
          <div className="text-[11px] font-mono text-white/60 tracking-wide">11월 16일 월요일</div>
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-white/95 font-mono">
            18 PRO
          </div>
          <div className="text-xs font-mono text-white/75">
            {currentColor.nameKo} · 3,000 nits
          </div>
          <div className="text-[10px] text-white/45 font-mono">1-120Hz LTPO2 ProMotion</div>
        </div>

        {/* Bottom Lockscreen Quick Actions & Home Indicator */}
        <div className="relative z-10 space-y-3 pointer-events-none">
          <div className="flex items-center justify-between px-3">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80">
              <Flashlight className="w-3.5 h-3.5" />
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80">
              <Camera className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="w-32 h-1 bg-white/85 rounded-full mx-auto mb-0.5" />
        </div>
      </div>
    </div>
  );

  const activeRotateX = orbit.x + (isDragging ? 0 : hoverTilt.x);
  const activeRotateY = orbit.y + (isDragging ? 0 : hoverTilt.y);

  return (
    <div className="relative flex flex-col items-center justify-center p-2 w-full select-none">
      {/* Top Detail Quick Switcher & 3D Motion Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 z-20">
        <button
          onClick={() => setIsMacroZoom(false)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
            !isMacroZoom
              ? 'bg-white text-black font-bold shadow-md'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>{viewSide === 'unified-3d' ? '360° 풀 3D 모형' : '3D 시그니처 페어'}</span>
        </button>

        <button
          onClick={() => setIsMacroZoom(true)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
            isMacroZoom
              ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-950/60'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>카메라 아일랜드 300% 정밀 매크로</span>
        </button>

        {/* True 3D Interactive Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-950/90 border border-white/15">
          {!isMacroZoom && (
            <button
              onClick={handleFlipDevices}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-200 hover:bg-white/15 transition-all"
              title="기기 앞·뒷면 180도 뒤집기"
            >
              <FlipHorizontal className="w-3 h-3 text-rose-400" />
              <span className="hidden sm:inline">앞·뒤 뒤집기</span>
            </button>
          )}

          <button
            onClick={() => setIsFloating(!isFloating)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              isFloating ? 'bg-white/20 text-white font-medium' : 'text-neutral-400 hover:text-white'
            }`}
            title="부드러운 3D 공중 부유 모션"
          >
            {isFloating ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-neutral-400" />}
            <span className="hidden sm:inline">플로팅</span>
          </button>

          <button
            onClick={() => setAutoSpin(!autoSpin)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              autoSpin ? 'bg-white/20 text-white font-medium' : 'text-neutral-400 hover:text-white'
            }`}
            title="360° 연속 턴어라운드 회전"
          >
            <Compass className={`w-3 h-3 ${autoSpin ? 'animate-spin text-sky-400' : 'text-neutral-400'}`} />
            <span className="hidden sm:inline">360° 회전</span>
          </button>

          <button
            onClick={() => setApertureClosed(!apertureClosed)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              apertureClosed ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40' : 'text-neutral-400 hover:text-white'
            }`}
            title="메인 렌즈 6엽 가변 조리개 전환"
          >
            <Aperture className="w-3 h-3 text-amber-400" />
            <span>{apertureClosed ? 'ƒ/4.8' : 'ƒ/1.48'}</span>
          </button>

          <button
            onClick={handleResetAngle}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
            title="기본 3/4 입체 각도로 리셋"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Ground Floor Shadow reacting to Levitation */}
      <div
        className={`absolute bottom-2 w-[420px] h-14 rounded-full blur-3xl opacity-50 transition-all duration-700 pointer-events-none ${
          isFloating && !isDragging ? 'animate-shadow-levitate' : ''
        }`}
        style={{ backgroundColor: colorMap.ambientGlow }}
      />

      {/* ========================================================================= */}
      {/* MACRO CAMERA ZOOM VIEW                                                    */}
      {/* ========================================================================= */}
      {isMacroZoom ? (
        <div className="w-full max-w-xl rounded-3xl p-6 border border-white/20 bg-neutral-950/90 shadow-2xl space-y-4 animate-in fade-in duration-300">
          <div className="flex justify-between items-center border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentColor.hex }} />
              <span className="font-mono text-white font-bold">호라이즌 카메라 아일랜드 초정밀 매크로</span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px]">8P Sapphire Optical Assembly</span>
          </div>

          <div
            className="w-full h-72 rounded-3xl p-5 border-2 relative overflow-hidden flex items-center justify-between"
            style={{
              background: colorMap.islandTop,
              borderColor: colorMap.islandBorder,
              boxShadow: `inset 0 4px 12px rgba(255,255,255,0.4), inset 0 -4px 10px rgba(0,0,0,0.8), 0 20px 50px ${colorMap.ambientGlow}`,
            }}
          >
            <div
              className="absolute inset-0 rounded-[30px] pointer-events-none opacity-20"
              style={{
                background: 'repeating-linear-gradient(90deg, #fff 0px, transparent 1px, transparent 2px)',
              }}
            />

            <div className="relative w-68 h-56 flex-shrink-0">
              {/* Main 48MP Variable Aperture Lens */}
              <div
                onClick={() => setApertureClosed(!apertureClosed)}
                className="absolute top-1 left-2 w-24 h-24 rounded-full border-3 shadow-2xl bg-black cursor-pointer transition-transform hover:scale-105"
                style={{
                  borderColor: colorMap.lensBezel,
                  background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #0d0d12 70%, #000 100%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.95), inset 0 0 12px rgba(255,255,255,0.45)',
                }}
                title="클릭하여 6엽 가변 조리개 개폐 테스트"
              >
                <div className="absolute inset-1 rounded-full border border-cyan-400/40 flex items-center justify-center bg-gradient-to-tr from-cyan-950/70 via-purple-950/50 to-rose-950/60">
                  <svg className="w-16 h-16 transition-all duration-300" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <circle
                      cx="50"
                      cy="50"
                      r={apertureClosed ? 12 : 28}
                      fill="#000"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                    />
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="6"
                        x2={50 + (apertureClosed ? 12 : 28) * Math.cos((deg * Math.PI) / 180)}
                        y2={50 + (apertureClosed ? 12 : 28) * Math.sin((deg * Math.PI) / 180)}
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth="1.8"
                      />
                    ))}
                  </svg>
                  <div className="absolute bottom-1 text-[8px] font-mono text-cyan-300">
                    {apertureClosed ? 'ƒ/4.8 닫힘' : 'ƒ/1.48 개방'}
                  </div>
                </div>
              </div>

              {/* Ultra Wide 48MP Lens */}
              <div
                className="absolute bottom-1 left-2 w-22 h-22 rounded-full border-3 shadow-2xl bg-black cursor-pointer transition-transform hover:scale-105"
                style={{
                  borderColor: colorMap.lensBezel,
                  background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #0d0d12 70%, #000 100%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.95), inset 0 0 12px rgba(255,255,255,0.45)',
                }}
              >
                <div className="absolute inset-1 rounded-full border border-purple-400/50 bg-gradient-to-tr from-purple-950/70 via-indigo-950/50 to-neutral-950 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black border border-purple-500/60 shadow-inner flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-purple-400/90" />
                  </div>
                </div>
              </div>

              {/* Periscope Telephoto 48MP Lens */}
              <div
                className="absolute top-14 left-32 w-22 h-22 rounded-full border-3 shadow-2xl bg-black cursor-pointer transition-transform hover:scale-105"
                style={{
                  borderColor: colorMap.lensBezel,
                  background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #0d0d12 70%, #000 100%)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.95), inset 0 0 12px rgba(255,255,255,0.45)',
                }}
              >
                <div className="absolute inset-1 rounded-full border border-emerald-400/50 bg-gradient-to-tr from-emerald-950/70 via-teal-950/50 to-black flex items-center justify-center">
                  <div className="w-10 h-10 rounded-xs bg-black border border-emerald-500/60 shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 rounded-xs bg-indigo-500/90 shadow-[0_0_8px_#6366f1]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between h-52 pr-4 pl-2">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 border-3 border-white shadow-xl flex items-center justify-center mx-auto">
                  <div className="grid grid-cols-2 gap-1 p-1">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-200" />
                    <div className="w-3 h-3 rounded-full bg-amber-300" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                  </div>
                </div>
                <span className="text-[9px] font-mono text-neutral-300 block mt-1">TRUETONE FLASH</span>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-black border-2 border-white/40 shadow-inner flex items-center justify-center mx-auto">
                  <div className="w-4 h-4 rounded-full bg-neutral-800 border border-purple-500/60 shadow-[0_0_6px_#a855f7]" />
                </div>
                <span className="text-[9px] font-mono text-neutral-300 block mt-1">LiDAR SCANNER</span>
              </div>

              <div className="w-3.5 h-3.5 rounded-full bg-black/90 border border-white/30 shadow-inner" title="스튜디오 어쿠스틱 마이크" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="font-mono text-rose-400 font-bold block text-[11px]">메인 48MP 가변</span>
              <p className="text-[10px] text-neutral-300">ƒ/1.48~ƒ/4.8 기계식 셔터</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="font-mono text-purple-400 font-bold block text-[11px]">초광각 48MP</span>
              <p className="text-[10px] text-neutral-300">13mm, 120° FOV 접사</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
              <span className="font-mono text-emerald-400 font-bold block text-[11px]">망원 48MP 잠망경</span>
              <p className="text-[10px] text-neutral-300">100mm 4x-40x 광학 줌</p>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* TRUE 3D PRESERVE-3D EXTRUDED HARDWARE STAGE (DRAG TO ROTATE 360)           */
        /* ========================================================================= */
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseLeave={handleMouseLeave}
          className={`relative py-6 px-6 w-full flex items-center justify-center touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ perspective: '1650px' }}
        >
          {/* Outer Levitation Y-Bob Wrapper (isolated so it never conflicts with preserve-3d rotation!) */}
          <div
            className={`${
              isFloating && !isDragging ? 'animate-phone-levitate' : ''
            } flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-14`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {viewSide === 'unified-3d' ? (
              /* SINGLE COMPLETE DOUBLE-SIDED 3D UNIBODY MODEL */
              <div
                className="relative w-[268px] sm:w-[294px] h-[585px] sm:h-[625px]"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: isDragging || autoSpin ? 'none' : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: `rotateX(${activeRotateX}deg) rotateY(${activeRotateY}deg)`,
                }}
              >
                {renderChassis3DCasing()}
                {renderFrontFace('translateZ(13px)', true)}
                {renderRearFace('translateZ(-13px) rotateY(180deg)', true)}
              </div>
            ) : (
              /* SIGNATURE 3D PAIR VIEW (BOTH PHONES ARE COMPLETE DOUBLE-SIDED REAL IPHONES) */
              <>
                {(viewSide === 'back' || viewSide === 'side-by-side') && (
                  <div
                    className="relative w-[268px] sm:w-[294px] h-[585px] sm:h-[625px]"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: isDragging || autoSpin ? 'none' : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                      transform: `rotateX(${activeRotateX}deg) rotateY(${
                        viewSide === 'side-by-side' ? activeRotateY + 166 : activeRotateY
                      }deg)`,
                    }}
                  >
                    {renderChassis3DCasing()}
                    {renderFrontFace('translateZ(13px)', true)}
                    {renderRearFace('translateZ(-13px) rotateY(180deg)', true)}
                  </div>
                )}

                {(viewSide === 'front' || viewSide === 'side-by-side') && (
                  <div
                    className="relative w-[268px] sm:w-[294px] h-[585px] sm:h-[625px]"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: isDragging || autoSpin ? 'none' : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                      transform: `rotateX(${activeRotateX}deg) rotateY(${activeRotateY - 16}deg)`,
                    }}
                  >
                    {renderChassis3DCasing()}
                    {renderFrontFace('translateZ(13px)', true)}
                    {renderRearFace('translateZ(-13px) rotateY(180deg)', true)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {showAnnotations && !isMacroZoom && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentColor.hex }} />
            {colorMap.name} · 8.1mm 리얼 3D 유니바디
          </span>
          <span className="text-neutral-600">·</span>
          <span>마우스로 잡고 드래그하여 360° 자유 회전</span>
          <span className="text-neutral-600">·</span>
          <span className="text-rose-400">USB-C 포트 · 측면 버튼 · 돌출 렌즈 3단 입체 구현</span>
        </div>
      )}
    </div>
  );
};
