import React, { useState, useEffect } from 'react';
import { DeviceColor } from '../types/iphone';
import { BatteryCharging, Zap, Battery, Clock, Check, Play, Pause, RotateCcw } from 'lucide-react';

interface BatteryAndFastChargingProps {
  currentColor: DeviceColor;
}

export const BatteryAndFastCharging: React.FC<BatteryAndFastChargingProps> = ({ currentColor }) => {
  const [selectedSimType, setSelectedSimType] = useState<'esim' | 'dual'>('esim');
  const [chargingMinutes, setChargingMinutes] = useState<number>(15);
  const [isAutoCharging, setIsAutoCharging] = useState(false);

  // Compute percentage charged from chargingMinutes (0 to 45 mins)
  // 0m = 0%, 15m = 50%, 30m = 85%, 45m = 100%
  const calculatePercent = (min: number) => {
    if (min <= 15) return Math.round((min / 15) * 50);
    if (min <= 30) return Math.round(50 + ((min - 15) / 15) * 35);
    return Math.min(100, Math.round(85 + ((min - 30) / 15) * 15));
  };

  const currentPercent = calculatePercent(chargingMinutes);
  const currentWattage = chargingMinutes <= 15 ? 58.4 : chargingMinutes <= 30 ? 38.2 : 14.5;

  // Auto charging timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoCharging) {
      timer = setInterval(() => {
        setChargingMinutes((prev) => {
          if (prev >= 45) {
            setIsAutoCharging(false);
            return 45;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isAutoCharging]);

  return (
    <section id="battery" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span className="font-bold text-white">05. POWER &amp; CHARGING</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>AVS 60W Ultra-Fast</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            eSIM 대용량 배터리 &amp; AVS 60W 초고속 충전
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            물리 SIM 슬롯의 유휴 공간을 고밀도 배터리로 전환한 혁신. AVS 60W 고전압-가변전류 프로토콜로 단 15분 만에 배터리 50%를 충전합니다.
          </p>
        </div>

        {/* 2 Grid Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: eSIM vs Dual SIM Comparison */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-white" />
                <h3 className="font-bold text-base text-white">SIM 아키텍처별 배터리 용량 비교</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">Battery Capacity</span>
            </div>

            {/* SIM Switcher buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedSimType('esim')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedSimType === 'esim'
                    ? 'border-emerald-500/50 bg-emerald-950/20 shadow-xl'
                    : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-white">eSIM 전용 모델</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                    최장 수명
                  </span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white mt-2">
                  4,288 mAh
                </div>
                <div className="text-xs text-emerald-400 font-mono mt-1">
                  동영상 최대 36시간
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">
                  SIM 소켓 및 핀 모듈 전량을 배터리 셀로 확장
                </p>
              </button>

              <button
                onClick={() => setSelectedSimType('dual')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedSimType === 'dual'
                    ? 'border-sky-500/50 bg-sky-950/20 shadow-xl'
                    : 'border-white/10 bg-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-white">eSIM + 나노 SIM 겸용</span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-mono">
                    물리 슬롯
                  </span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white mt-2">
                  4,058 mAh
                </div>
                <div className="text-xs text-sky-400 font-mono mt-1">
                  동영상 최대 34시간
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">
                  물리 나노 SIM 트레이 유지 모델
                </p>
              </button>
            </div>

            {/* Detailed Metric comparison bars */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">연속 동영상 재생</span>
                  <span className="font-mono text-white font-bold">
                    {selectedSimType === 'esim' ? '36시간 (역대 최장)' : '34시간'}
                  </span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: selectedSimType === 'esim' ? '100%' : '94%' }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">오디오 스트리밍 재생</span>
                  <span className="font-mono text-white font-bold">
                    {selectedSimType === 'esim' ? '110시간' : '98시간'}
                  </span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 transition-all duration-500"
                    style={{ width: selectedSimType === 'esim' ? '100%' : '89%' }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">5G 연속 웹 브라우징</span>
                  <span className="font-mono text-white font-bold">
                    {selectedSimType === 'esim' ? '26시간' : '24시간'}
                  </span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 transition-all duration-500"
                    style={{ width: selectedSimType === 'esim' ? '100%' : '92%' }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: AVS 60W Rapid Charging Simulator */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">AVS 60W 초고속 충전 시뮬레이터</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">15분 50%</span>
            </div>

            {/* Battery Visualization Graphic */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-4">
                {/* Battery Container */}
                <div className="w-48 h-20 border-2 border-white/40 rounded-2xl p-1.5 relative flex items-center bg-neutral-950">
                  <div
                    className="h-full rounded-xl transition-all duration-300 relative overflow-hidden flex items-center justify-center font-mono font-black text-sm text-black"
                    style={{
                      width: `${currentPercent}%`,
                      backgroundColor: currentPercent > 80 ? '#10b981' : currentPercent > 20 ? '#f59e0b' : '#ef4444'
                    }}
                  >
                    {currentPercent >= 20 && `${currentPercent}%`}
                  </div>
                </div>
                {/* Battery Nipple */}
                <div className="w-2.5 h-7 bg-white/40 rounded-r-md -ml-3" />
              </div>

              {/* Status info below battery */}
              <div className="mt-4 flex items-center gap-6 text-xs font-mono">
                <div className="text-center">
                  <span className="text-neutral-400 block text-[10px]">충전 시간</span>
                  <span className="text-white text-base font-bold">{chargingMinutes}분 경과</span>
                </div>
                <div className="text-center">
                  <span className="text-neutral-400 block text-[10px]">실시간 충전 전력</span>
                  <span className="text-amber-400 text-base font-bold">{currentWattage}W AVS</span>
                </div>
                <div className="text-center">
                  <span className="text-neutral-400 block text-[10px]">충전 잔여량</span>
                  <span className="text-emerald-400 text-base font-bold">{currentPercent}%</span>
                </div>
              </div>
            </div>

            {/* Time Scrubber Control */}
            <div className="space-y-3 bg-neutral-950/70 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  충전 시간 스크러버 (0분 ~ 45분):
                </span>
                <span className="font-mono text-white font-bold">{chargingMinutes}분</span>
              </div>

              <input
                type="range"
                min="0"
                max="45"
                value={chargingMinutes}
                onChange={(e) => {
                  setChargingMinutes(Number(e.target.value));
                  setIsAutoCharging(false);
                }}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                <span>0분 (0%)</span>
                <span className="text-amber-400 font-bold">15분 (50% 도달)</span>
                <span>30분 (85%)</span>
                <span className="text-emerald-400 font-bold">45분 (완충)</span>
              </div>
            </div>

            {/* Action Buttons for Auto Simulation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoCharging(!isAutoCharging)}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/20 flex items-center justify-center gap-2"
              >
                {isAutoCharging ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>시뮬레이션 일시 정지</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>실시간 급속 충전 시뮬레이션 시작</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setChargingMinutes(0);
                  setIsAutoCharging(false);
                }}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10"
                title="처음으로 리셋"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
