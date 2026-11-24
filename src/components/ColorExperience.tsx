import React, { useState } from 'react';
import { DeviceColor, DeviceColorKey } from '../types/iphone';
import { DEVICE_COLORS } from '../data/specsData';
import { Check, Sparkles, SlidersHorizontal, SunMedium } from 'lucide-react';

interface ColorExperienceProps {
  currentColor: DeviceColor;
  onColorChange: (key: DeviceColorKey) => void;
}

export const ColorExperience: React.FC<ColorExperienceProps> = ({
  currentColor,
  onColorChange,
}) => {
  const [ambientLighting, setAmbientLighting] = useState<number>(75); // 0 to 100%

  return (
    <section id="colors" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
              <span className="font-bold text-white">01. FINISH &amp; COLORS</span>
              <span aria-hidden="true">·</span>
              <span>4 Monolithic Finishes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              시그니처 컬러 갤러리 &amp; 일체형 유니바디
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              전작의 투톤 분할 디자인을 탈피하고, 후면 Ceramic Shield와 아노다이징 알루미늄 유니바디 톤을 100% 일치시킨 사상 최초의 무결점 일체형 실루엣.
            </p>
          </div>

          {/* Interactive Lighting Simulator Control */}
          <div className="flex items-center gap-3 bg-neutral-900/80 p-3 rounded-2xl border border-white/10">
            <SunMedium className="w-4 h-4 text-neutral-400" />
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                <span>환경 조도 반사율</span>
                <span className="text-white">{ambientLighting}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={ambientLighting}
                onChange={(e) => setAmbientLighting(Number(e.target.value))}
                className="w-36 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>

        {/* 4 Interactive Color Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(DEVICE_COLORS) as DeviceColorKey[]).map((key) => {
            const item = DEVICE_COLORS[key];
            const isSelected = currentColor.key === key;

            return (
              <div
                key={key}
                onClick={() => onColorChange(key)}
                className={`relative rounded-3xl p-6 cursor-pointer transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? 'border-white/40 bg-neutral-900/90 shadow-2xl scale-[1.02]'
                    : 'border-white/10 bg-neutral-900/40 hover:border-white/25 hover:bg-neutral-900/60'
                }`}
              >
                {/* Visual Glow Header */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-75"
                  style={{ backgroundColor: item.hex }}
                />

                <div className="space-y-4 relative z-10">
                  {/* Swatch & Status */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl shadow-lg border-2 flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: item.hex,
                        borderColor: isSelected ? '#ffffff' : 'rgba(255,255,255,0.2)',
                        boxShadow: `0 8px 24px -4px ${item.accentGlow}`
                      }}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                        {item.hex}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        반사율: {Math.round(ambientLighting * (key === 'silver' ? 1.2 : key === 'black' ? 0.4 : 0.8))}%
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                      {item.nameKo}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">{item.nameEn}</p>
                    <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Material Spec */}
                <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>마감 구조</span>
                    <span className="text-white text-right truncate max-w-[140px]">
                      {item.finishDetail}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span
                      className="text-[11px] font-semibold"
                      style={{ color: item.accentText }}
                    >
                      {isSelected ? '현재 적용됨' : '클릭하여 적용'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                      {key === 'burgundy' ? '시그니처' : key === 'glacier' ? '신규 색상' : '클래식 프로'}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Color Palette Quick Bar */}
        <div className="rounded-3xl p-6 sm:p-8 bg-neutral-900/60 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">COLOR ARCHITECTURE</span>
              <h3 className="text-lg font-bold text-white">iPhone 18 Pro 4종 시그니처 라인업</h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              버튼 클릭 시 해당 색상으로 즉시 전환됩니다
            </span>
          </div>

          {/* Quick Lineup Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => onColorChange('silver')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                currentColor.key === 'silver' ? 'border-white/50 bg-white/15 text-white' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold block text-white">실버 (Silver)</span>
              <span className="text-[11px] font-mono text-neutral-300">₩1,990,000</span>
            </button>
            <button
              onClick={() => onColorChange('glacier')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                currentColor.key === 'glacier' ? 'border-sky-400/50 bg-sky-950/40 text-white' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold block text-white">글레이셔 (Glacier)</span>
              <span className="text-[11px] font-mono text-sky-300">₩1,990,000</span>
            </button>
            <button
              onClick={() => onColorChange('black')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                currentColor.key === 'black' ? 'border-purple-400/50 bg-neutral-800 text-white' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold block text-white">블랙 (Black)</span>
              <span className="text-[11px] font-mono text-purple-300">₩1,990,000</span>
            </button>
            <button
              onClick={() => onColorChange('burgundy')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                currentColor.key === 'burgundy' ? 'border-rose-500/50 bg-rose-950/40 text-white' : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold block text-white">버건디 (Burgundy)</span>
              <span className="text-[11px] font-mono text-rose-300">₩2,190,000 (Max)</span>
            </button>
          </div>
        </div>

        {/* Unibody Architecture In-depth Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-neutral-900/40 border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase text-neutral-400 block">01. CERAMIC SHIELD ALIGNMENT</span>
              <h4 className="text-base font-bold text-white">나노 결정질 세라믹 매트릭스</h4>
              <p className="text-neutral-400 leading-relaxed">
                나노 세라믹 결정을 유리에 직접 결정화하여 유리의 투명도와 세라믹의 강도를 결합. 금속 프레임과의 광학 반사 편차를 0.02 delta-E 이내로 제어했습니다.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase text-neutral-400 block">02. AEROSPACE ANODIZATION</span>
              <h4 className="text-base font-bold text-white">항공우주 알루미늄 유니바디</h4>
              <p className="text-neutral-400 leading-relaxed">
                정밀 5축 CNC 밀링 가공 후 마이크로 아크 산화(MAO) 기법으로 내부 결정 구조를 강화하여 열전도율과 내충격성을 동시에 확보했습니다.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase text-neutral-400 block">03. ZERO BEZEL OFFSET</span>
              <h4 className="text-base font-bold text-white">오차 0mm 초정밀 접합</h4>
              <p className="text-neutral-400 leading-relaxed">
                후면 글래스와 메탈 프레임 간의 단차를 0mm 수준으로 압착하여 손에 쥐었을 때 걸림 없이 매끄럽게 흐르는 최상의 그립감을 선사합니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
