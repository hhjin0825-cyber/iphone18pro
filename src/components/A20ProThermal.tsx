import React, { useState } from 'react';
import { DeviceColor } from '../types/iphone';
import { Cpu, Flame, Gauge, Activity, ShieldAlert, Zap } from 'lucide-react';

interface A20ProThermalProps {
  currentColor: DeviceColor;
}

export const A20ProThermal: React.FC<A20ProThermalProps> = ({ currentColor }) => {
  const [workloadLevel, setWorkloadLevel] = useState<number>(85); // 0 to 100%
  const [coolingMode, setCoolingMode] = useState<'vapor' | 'conventional'>('vapor');

  const chipImage = '/src/assets/images/a20_pro_chipset_thermal_1793686859859.jpg';

  // Calculate dynamic temperatures and sustained performance based on workload
  const a20Temp = coolingMode === 'vapor' 
    ? (30 + (workloadLevel * 0.09)).toFixed(1) // 30.0 ~ 39.0°C
    : (32 + (workloadLevel * 0.16)).toFixed(1); // 32.0 ~ 48.0°C

  const conventionalTemp = (32 + (workloadLevel * 0.16)).toFixed(1);

  const sustainedFps = coolingMode === 'vapor'
    ? Math.round(60 - (workloadLevel > 80 ? (workloadLevel - 80) * 0.05 : 0)) // 60 ~ 59 FPS
    : Math.round(60 - (workloadLevel * 0.28)); // 60 ~ 32 FPS (Throttled)

  return (
    <section id="chipset" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span className="font-bold text-white">02. PERFORMANCE &amp; THERMAL</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>TSMC 2nm Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apple A20 Pro &amp; 3배 확장 베이퍼 챔버
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            TSMC 차세대 2나노미터(N2) 공정과 나노트윈 구리 베이퍼 챔버의 결합. 장시간 고사양 AAA 게임과 온디바이스 멀티모달 AI 연산에서도 스로틀링 없는 압도적인 40% 지속 성능 향상.
          </p>
        </div>

        {/* Visual Showcase + Interactive Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Chip Graphic & Architecture Breakdown */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-6 p-6 sm:p-8">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src={chipImage}
                alt="Apple A20 Pro Chip with Vapor Chamber Architecture"
                className="w-full h-64 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold">TSMC N2 (2nm) APL1W20</span>
                <span className="text-emerald-400 font-bold">+50% Memory Bandwidth</span>
              </div>
            </div>

            {/* Architecture Spec Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">CPU 아키텍처</span>
                <span className="text-lg font-bold text-white font-mono">6-Core</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">2P + 4E 차세대 코어</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">GPU 그래픽스</span>
                <span className="text-lg font-bold text-white font-mono">7-Core</span>
                <span className="text-[10px] text-sky-400 block mt-0.5">하드웨어 레이트레이싱 2x</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">Neural Engine</span>
                <span className="text-lg font-bold text-white font-mono">32-Core</span>
                <span className="text-[10px] text-rose-400 block mt-0.5">듀얼 16코어 68 TOPS</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">통합 메모리</span>
                <span className="text-lg font-bold text-white font-mono">12GB</span>
                <span className="text-[10px] text-purple-400 block mt-0.5">96-Bit LPDDR5X</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time Thermal & Sustained FPS Simulator */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-white" />
                <h3 className="font-bold text-lg text-white">실시간 열 방열 &amp; 프레임 유지력 시뮬레이터</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">Interactive Lab</span>
            </div>

            {/* Workload Control */}
            <div className="space-y-3 bg-neutral-950/70 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-rose-400" />
                  연산 부하 수준 (AAA 레이트레이싱 게임 / 로컬 AI):
                </span>
                <span className="font-mono text-white font-bold">{workloadLevel}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={workloadLevel}
                onChange={(e) => setWorkloadLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>일상 UI / 웹 브라우징</span>
                <span>4K 60fps 비디오 렌더링</span>
                <span>60분 풀로드 레이트레이싱</span>
              </div>
            </div>

            {/* Architecture Comparison Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCoolingMode('vapor')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  coolingMode === 'vapor'
                    ? 'border-emerald-500/50 bg-emerald-950/20 shadow-lg'
                    : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">iPhone 18 Pro 솔루션</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] text-emerald-300 font-mono">
                  3배 확장 베이퍼 챔버 + 나노트윈 구리
                </div>
              </button>

              <button
                onClick={() => setCoolingMode('conventional')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  coolingMode === 'conventional'
                    ? 'border-amber-500/50 bg-amber-950/20 shadow-lg'
                    : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">기존 일반 방열 방식</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <div className="text-[11px] text-amber-300 font-mono">
                  흑연 단일 시트 (스로틀링 발생)
                </div>
              </button>
            </div>

            {/* Simulated Live Gauges */}
            <div className="grid grid-cols-2 gap-4">
              {/* Temperature */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>표면 최고 온도</span>
                  <Flame className={`w-4 h-4 ${coolingMode === 'vapor' ? 'text-emerald-400' : 'text-amber-500 animate-pulse'}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {a20Temp}°C
                  </span>
                  <span className={`text-[11px] font-mono ${coolingMode === 'vapor' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {coolingMode === 'vapor' ? '쾌적 유지' : '발열 주의'}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  {coolingMode === 'vapor'
                    ? '베이퍼 챔버 냉매 순환으로 핫스팟 제거'
                    : '열 집중 현상으로 프레임 드랍 시작'}
                </p>
              </div>

              {/* Sustained FPS */}
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>60분 후 프레임 유지율</span>
                  <Zap className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {sustainedFps} FPS
                  </span>
                  <span className="text-[11px] font-mono text-sky-400">
                    {coolingMode === 'vapor' ? '99.7% 유지' : '53% 스로틀링'}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  {coolingMode === 'vapor'
                    ? '+40% 높은 지속 퍼포먼스 입증'
                    : '온도 상승으로 CPU/GPU 강제 클럭 다운'}
                </p>
              </div>
            </div>

            {/* Narrative summary box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-neutral-300 flex items-start gap-3">
              <Zap className="w-4 h-4 shrink-0 text-white mt-0.5" />
              <p className="leading-relaxed text-[11px]">
                <strong className="text-white">96-Bit LPDDR5X 메모리 버스:</strong> 대역폭이 50% 확장되어 16-Core Neural Engine이 70B급 경량화 언어 모델(LLM)을 디바이스 내에서 초당 38토큰 속도로 클라우드 지연 없이 실시간 구동합니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
