import React, { useState } from 'react';
import { DeviceColor } from '../types/iphone';
import { Sun, Sparkles, Music, Timer, Plane, Maximize2, Minimize2, Eye } from 'lucide-react';

interface UdirDynamicIslandProps {
  currentColor: DeviceColor;
}

export const UdirDynamicIsland: React.FC<UdirDynamicIslandProps> = ({ currentColor }) => {
  const [islandState, setIslandState] = useState<'compact' | 'expanded-timer' | 'expanded-music' | 'expanded-flight' | 'three-way'>('three-way');
  const [brightnessNits, setBrightnessNits] = useState<number>(3000); // 1 to 3000
  const [refreshRate, setRefreshRate] = useState<1 | 60 | 120>(120);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  return (
    <section id="display" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span className="font-bold text-white">04. DISPLAY &amp; UDIR SENSOR</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>35% Smaller Island</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            UDIR 센서 기술 &amp; 진화한 Dynamic Island
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            Under-Display IR(디스플레이 하단 적외선) 기술을 적용해 Face ID 모듈을 화면 밑으로 숨겼습니다. 35% 작아진 면적 안에 최대 3개의 실시간 라이브 액티비티를 동시에 띄워 직관적인 멀티태스킹을 지원합니다.
          </p>
        </div>

        {/* Dynamic Island Screen Simulation & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Phone Top Viewport Simulation */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 border border-white/10 bg-neutral-900/60 backdrop-blur-xl flex flex-col items-center">
            
            <div className="w-full flex justify-between items-center mb-6 text-xs text-neutral-400">
              <span className="font-mono">실시간 디스플레이 프론트 뷰</span>
              <span className="font-mono text-emerald-400">LTPO2 {refreshRate}Hz ProMotion</span>
            </div>

            {/* Virtual iPhone 18 Pro Screen Top Frame */}
            <div 
              className="w-full max-w-md h-80 rounded-3xl p-4 relative overflow-hidden flex flex-col justify-between transition-all duration-300 border-2"
              style={{
                backgroundColor: '#0a0a0f',
                borderColor: currentColor.accentBorder,
                boxShadow: `0 0 50px -10px ${currentColor.accentGlow}`,
                filter: `brightness(${0.7 + (brightnessNits / 3000) * 0.4})`
              }}
            >
              {/* Status Bar */}
              <div className="flex justify-between items-center text-xs font-semibold text-white px-2 relative z-20">
                <span className="font-mono">9:41</span>
                
                {/* Dynamic Island Container */}
                <div 
                  className={`mx-auto bg-black text-white rounded-full transition-all duration-300 ease-out flex items-center justify-between px-3.5 py-1.5 shadow-2xl cursor-pointer border border-white/10 ${
                    islandState === 'compact'
                      ? 'w-24 h-7'
                      : islandState === 'three-way'
                      ? 'w-72 h-8'
                      : 'w-80 h-20 rounded-3xl p-3'
                  }`}
                  onClick={() => {
                    if (islandState === 'compact') setIslandState('three-way');
                    else if (islandState === 'three-way') setIslandState('expanded-music');
                    else setIslandState('compact');
                  }}
                  title="클릭하여 Dynamic Island 확장/축소"
                >
                  {/* Compact State */}
                  {islandState === 'compact' && (
                    <div className="w-full flex justify-between items-center text-[10px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-neutral-400 font-mono text-[9px]">UDIR -35%</span>
                      <Music className="w-3 h-3 text-rose-400" />
                    </div>
                  )}

                  {/* 3 Simultaneous Live Activities State */}
                  {islandState === 'three-way' && (
                    <div className="w-full flex items-center justify-between text-[11px] font-mono">
                      {/* App 1: Delivery/Timer */}
                      <div 
                        onClick={(e) => { e.stopPropagation(); setIslandState('expanded-timer'); }}
                        className="flex items-center gap-1 text-amber-400 hover:text-white"
                      >
                        <Timer className="w-3.5 h-3.5" />
                        <span>12분</span>
                      </div>

                      <span className="text-neutral-600">|</span>

                      {/* App 2: Music */}
                      <div 
                        onClick={(e) => { e.stopPropagation(); setIslandState('expanded-music'); }}
                        className="flex items-center gap-1.5 text-rose-400 hover:text-white"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        <span className="truncate max-w-[70px]">Ditto</span>
                        <div className="flex gap-0.5 items-end h-3">
                          <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
                          <span className="w-0.5 h-3 bg-rose-400 animate-pulse" />
                          <span className="w-0.5 h-1.5 bg-rose-400 animate-pulse" />
                        </div>
                      </div>

                      <span className="text-neutral-600">|</span>

                      {/* App 3: Flight Gate */}
                      <div 
                        onClick={(e) => { e.stopPropagation(); setIslandState('expanded-flight'); }}
                        className="flex items-center gap-1 text-sky-400 hover:text-white"
                      >
                        <Plane className="w-3.5 h-3.5" />
                        <span>32B</span>
                      </div>
                    </div>
                  )}

                  {/* Expanded Music State */}
                  {islandState === 'expanded-music' && (
                    <div className="w-full flex items-center justify-between p-1">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg">
                          <Music className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Ditto (Remastered)</span>
                          <span className="text-[10px] text-neutral-400 font-mono">NewJeans · Apple Lossless</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pr-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setIsPlayingMusic(!isPlayingMusic); }}
                          className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white"
                        >
                          {isPlayingMusic ? '❚❚' : '▶'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Expanded Timer State */}
                  {islandState === 'expanded-timer' && (
                    <div className="w-full flex items-center justify-between p-1 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                          <Timer className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">배달 라이더 접근 중</span>
                          <span className="text-[10px] text-neutral-400">약 12분 후 현관 도착 예정</span>
                        </div>
                      </div>
                      <span className="font-mono text-base font-bold text-amber-400 pr-2">11:42</span>
                    </div>
                  )}

                  {/* Expanded Flight State */}
                  {islandState === 'expanded-flight' && (
                    <div className="w-full flex items-center justify-between p-1 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                          <Plane className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">대한항공 KE081 (ICN → JFK)</span>
                          <span className="text-[10px] text-neutral-400">탑승구 32B · 탑승 수속 시작</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs px-2 py-1 rounded bg-sky-500/30 text-sky-300 font-bold">ON TIME</span>
                    </div>
                  )}

                </div>

                <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-300">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-white rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-400 rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Wallpaper / Content Preview */}
              <div className="relative z-10 text-center my-auto space-y-1">
                <span className="text-[11px] font-mono text-neutral-400 block">
                  3,000 nits Ultra XDR OLED
                </span>
                <p className="text-xs text-neutral-300">
                  야외 직사광선 아래에서도 압도적인 시인성을 보장하는 양자점 나노 패널
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                <span>클릭하여 아일랜드 확장</span>
                <span>하단 홈 인디케이터 ━</span>
              </div>
            </div>

            {/* Quick Island Preset Buttons */}
            <div className="flex flex-wrap gap-2 mt-6">
              <button
                onClick={() => setIslandState('three-way')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  islandState === 'three-way' ? 'bg-white text-black font-bold' : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                3개 앱 동시 표시 모드
              </button>
              <button
                onClick={() => setIslandState('compact')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  islandState === 'compact' ? 'bg-white text-black font-bold' : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                35% 축소 컴팩트 모드
              </button>
              <button
                onClick={() => setIslandState('expanded-music')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  islandState === 'expanded-music' ? 'bg-white text-black font-bold' : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                음악 플레이어 확장
              </button>
            </div>

          </div>

          {/* Right Column: Display Specs & Brightness Slider */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Brightness Simulator Card */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  야외 직사광선 피크 밝기:
                </span>
                <span className="font-mono text-base font-extrabold text-amber-400">
                  {brightnessNits.toLocaleString()} nits
                </span>
              </div>

              <input
                type="range"
                min="500"
                max="3000"
                step="50"
                value={brightnessNits}
                onChange={(e) => setBrightnessNits(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                <span>실내 (500 nits)</span>
                <span>일반 야외 (1500 nits)</span>
                <span className="text-amber-400 font-bold">직사광선 (3000 nits)</span>
              </div>
            </div>

            {/* ProMotion Refresh Rate Toggle Card */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">가변 주사율 LTPO2 기술</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{refreshRate}Hz 활성</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRefreshRate(1)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    refreshRate === 1 ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold' : 'border-white/10 text-neutral-400'
                  }`}
                >
                  <span className="text-xs block font-mono">1Hz</span>
                  <span className="text-[10px] text-neutral-500">AOD 상시표시</span>
                </button>
                <button
                  onClick={() => setRefreshRate(60)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    refreshRate === 60 ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold' : 'border-white/10 text-neutral-400'
                  }`}
                >
                  <span className="text-xs block font-mono">60Hz</span>
                  <span className="text-[10px] text-neutral-500">영상 시청</span>
                </button>
                <button
                  onClick={() => setRefreshRate(120)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    refreshRate === 120 ? 'border-emerald-500 bg-emerald-950/30 text-white font-bold' : 'border-white/10 text-neutral-400'
                  }`}
                >
                  <span className="text-xs block font-mono">120Hz</span>
                  <span className="text-[10px] text-emerald-400">초부드러운 스크롤</span>
                </button>
              </div>
            </div>

            {/* UDIR Technical Explanation */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-3 text-xs text-neutral-300">
              <h4 className="font-bold text-white text-sm">Under-Display IR (UDIR) 원리</h4>
              <p className="text-neutral-400 leading-relaxed text-[12px]">
                Face ID 도트 프로젝터와 플러드 일루미네이터를 OLED 서브 픽셀 배열 사이의 나노 투과 슬롯 아래로 재배치했습니다. 광학 카메라는 여전히 최고 품질의 셀피와 페이스타임을 위해 유지하되, 물리 아일랜드 면적은 35% 줄였습니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
