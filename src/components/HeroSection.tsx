import React, { useState } from 'react';
import { DeviceColor, DeviceColorKey } from '../types/iphone';
import { DEVICE_COLORS } from '../data/specsData';
import { DeviceModelView } from './DeviceModelView';
import { Eye, ShieldCheck, Zap, Layers } from 'lucide-react';

interface HeroSectionProps {
  currentColor: DeviceColor;
  onColorChange: (colorKey: DeviceColorKey) => void;
  onJumpToEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentColor,
  onColorChange,
  onJumpToEstimator,
}) => {
  const [stageMode, setStageMode] = useState<'side-by-side' | '3d-rear'>('side-by-side');

  return (
    <section className="relative pt-10 pb-20 overflow-hidden border-b border-white/10">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-35 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: currentColor.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unboxed Metadata & Category Kicker */}
        <div className="text-center space-y-3 mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <span>Next Generation Flagship</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>와이드 호라이즌 카메라 아일랜드</span>
            <span aria-hidden="true">·</span>
            <span>TSMC 2nm A20 Pro</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-balance">
            iPhone 18 Pro
          </h1>
          <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl mx-auto text-balance">
            수평으로 확장된 와이드 카메라 아일랜드. 완벽한 수평 균형과 48MP 가변 조리개의 진화.
          </p>
        </div>

        {/* 4 Signature Colors Interactive Segment Control */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-md shadow-2xl">
            {(Object.keys(DEVICE_COLORS) as DeviceColorKey[]).map((key) => {
              const c = DEVICE_COLORS[key];
              const isSelected = currentColor.key === key;
              return (
                <button
                  key={key}
                  onClick={() => onColorChange(key)}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isSelected ? 'bg-white/15 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/30 shadow-inner group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-medium whitespace-nowrap">{c.nameKo}</span>
                  {isSelected && (
                    <span 
                      className="absolute inset-0 rounded-full border pointer-events-none"
                      style={{ borderColor: c.accentBorder }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-neutral-400 font-mono hidden sm:block">
            {currentColor.finishDetail}
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="relative rounded-3xl p-4 sm:p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          
          {/* Top Stage Angle Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentColor.hex }} />
              <span className="font-semibold text-white">{currentColor.nameEn}</span>
              <span className="text-neutral-500 font-mono">신규 호라이즌 카메라 아키텍처</span>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-950/80 border border-white/10">
              <button
                onClick={() => setStageMode('side-by-side')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  stageMode === 'side-by-side' ? 'bg-white/20 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                시그니처 3D 페어 뷰 (Front &amp; Back)
              </button>
              <button
                onClick={() => setStageMode('3d-rear')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  stageMode === '3d-rear' ? 'bg-white/20 text-white font-medium' : 'text-neutral-400 hover:text-white'
                }`}
              >
                360° 풀 3D 모형
              </button>
            </div>
          </div>

          {/* Central Visual Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Canvas Area */}
            <div className="lg:col-span-8 relative flex items-center justify-center min-h-[660px] sm:min-h-[750px] rounded-2xl overflow-hidden bg-black/60 border border-white/5 p-4 sm:p-6 group">
              
              {/* Dynamic Color Hue Tint Overlay */}
              <div 
                className="absolute inset-0 opacity-15 mix-blend-color pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: currentColor.hex }}
              />

              {/* MODE 1: Unified 360° Double-Sided True 3D Extruded Phone */}
              {stageMode === '3d-rear' && (
                <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <DeviceModelView
                    currentColor={currentColor}
                    viewSide="unified-3d"
                    showAnnotations={true}
                  />
                  <div className="mt-3 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-neutral-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>드래그하여 360° 회전 · 측면 버튼·USB-C·돌출 카메라 아일랜드 입체 감상</span>
                  </div>
                </div>
              )}

              {/* MODE 2: Side by Side (Back & Front 3D Pair) */}
              {stageMode === 'side-by-side' && (
                <div className="w-full flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <DeviceModelView
                    currentColor={currentColor}
                    viewSide="side-by-side"
                    showAnnotations={false}
                  />
                  <div className="mt-3 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-neutral-300 flex items-center gap-3 font-mono">
                    <span>후면: 입체 돌출 와이드 아일랜드</span>
                    <span className="text-neutral-600">|</span>
                    <span>전면: 35% 축소 UDIR Dynamic Island</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right Spec Narrative & Direct Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  CAMERA ISLAND ARCHITECTURE
                </span>
                <h3 className="text-2xl font-bold text-white">
                  수평 와이드 카메라 아일랜드의 혁신
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  기존 모서리 사각형 카툭튀를 탈피한 가로형 호라이즌 아일랜드. 책상 위에 기기를 올려두었을 때 흔들림(Desk-wobble)을 0%로 완벽히 방지하며, 내부 열 분산 면적을 2.8배 확보했습니다.
                </p>
              </div>

              {/* 3 Pillar Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">48MP 기계식 가변 조리개</h4>
                    <p className="text-[11px] text-neutral-400">ƒ/1.48 저조도 심도부터 ƒ/4.8 팬포커스 풍경까지 6엽 셔터 블레이드 실물 탑재</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero-Wobble 수평 밸런스</h4>
                    <p className="text-[11px] text-neutral-400">상단 전체를 감싸는 수평 캡슐 설계로 바닥 필기 및 타이핑 시 단단한 안정감 제공</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Layers className="w-5 h-5 shrink-0 mt-0.5 text-sky-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">센서 분리 배치 쿨링 구조</h4>
                    <p className="text-[11px] text-neutral-400">발열이 높은 플래시와 LiDAR를 우측으로 분리하여 이미지 센서 열노이즈 최소화</p>
                  </div>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onJumpToEstimator}
                  style={{ backgroundColor: currentColor.hex }}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold text-white shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border border-white/20 text-center"
                >
                  내 맞춤 사양 견적 내기 (₩1,990,000부터)
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
