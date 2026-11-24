import React, { useState } from 'react';
import { DeviceColor } from '../types/iphone';
import { CreditCard, Wifi, CheckCircle2, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

interface TmoneyPaymentDemoProps {
  currentColor: DeviceColor;
}

export const TmoneyPaymentDemo: React.FC<TmoneyPaymentDemoProps> = ({ currentColor }) => {
  const [balance, setBalance] = useState<number>(14800);
  const [isTagging, setIsTagging] = useState<boolean>(false);
  const [lastTaggedMessage, setLastTaggedMessage] = useState<string>('강남역 2호선 개찰구 대기 중');
  const [tagStatus, setTagStatus] = useState<'idle' | 'success'>('idle');

  const transitImage = '/src/assets/images/apple_pay_tmoney_transit_1793686860335.jpg';

  const handleTransitTap = () => {
    if (balance < 1400) {
      alert('잔액이 부족합니다. 잔액을 충전해주세요.');
      return;
    }

    setIsTagging(true);
    setTimeout(() => {
      setBalance((prev) => prev - 1400);
      setTagStatus('success');
      setLastTaggedMessage('1,400원 승차 처리 완료 (2호선 강남역)');
      setIsTagging(false);

      setTimeout(() => {
        setTagStatus('idle');
      }, 2500);
    }, 450);
  };

  const handleRecharge = () => {
    setBalance((prev) => prev + 10000);
    setLastTaggedMessage('Apple Pay로 10,000원 충전 완료');
  };

  return (
    <section id="tmoney" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span className="font-bold text-white">06. LOCALIZED ECOSYSTEM</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>Korea Express Transit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            대한민국 대중교통도 Apple Pay 티머니로
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            화면을 켜거나 Face ID로 잠금을 해제할 필요 없는 익스프레스 대중교통 모드. 배터리가 방전된 후 최대 5시간까지 동작하는 MIE(Memory in Enclave) 전용 하드웨어 보안 칩을 탑재했습니다.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Seoul Metro High-Res Photo & Hardware Spec */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/40 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src={transitImage}
                alt="Apple Pay T-money in Seoul Metro"
                className="w-full h-64 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold">수도권 전철 &amp; 전국 시내버스 100% 호환</span>
                <span className="text-emerald-400 font-bold">MIE Hardware Security</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">익스프레스 대중교통 카드</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">화면을 켜거나 앱을 열 필요 없이 단말기에 가져다 대기만 하면 0.1초 만에 승하차 완료</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">방전 후 5시간 예비 전력 카드</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">아이폰 전원이 꺼진 상태에서도 저전력 NFC 코어가 최대 5시간 동안 안전하게 대중교통 태깅 보장</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive T-money Tagging Simulator */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-6">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base text-white">실시간 지하철 게이트 태깅 시뮬레이터</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">Interactive Gate</span>
            </div>

            {/* Virtual Turnstile NFC Reader */}
            <div className={`p-8 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${
              tagStatus === 'success'
                ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_50px_rgba(16,185,129,0.3)]'
                : 'border-white/10 bg-neutral-950/80'
            }`}>
              {/* Glowing Sensor Ring */}
              <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                tagStatus === 'success'
                  ? 'border-emerald-400 bg-emerald-500/20 scale-105'
                  : isTagging
                  ? 'border-sky-400 animate-ping'
                  : 'border-sky-400/50 bg-sky-500/10'
              }`}>
                <Wifi className={`w-12 h-12 rotate-90 ${tagStatus === 'success' ? 'text-emerald-300' : 'text-sky-400'}`} />
              </div>

              <span className="text-xs font-bold text-white mt-4 font-mono">
                {tagStatus === 'success' ? '승차 처리되었습니다 (삑-!)' : '기기 상단을 터치해 주세요'}
              </span>

              <p className="text-[11px] text-neutral-400 font-mono mt-1">
                {lastTaggedMessage}
              </p>
            </div>

            {/* T-money Card Details and Balance */}
            <div className="p-4 rounded-2xl bg-neutral-950/70 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-mono block">티머니 모바일 잔액</span>
                <span className="text-2xl font-extrabold font-mono text-white">
                  ₩{balance.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleRecharge}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 transition-all font-mono"
              >
                + ₩10,000 충전
              </button>
            </div>

            {/* Tag Action Button */}
            <button
              onClick={handleTransitTap}
              disabled={isTagging}
              style={{ backgroundColor: currentColor.hex }}
              className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white shadow-xl hover:brightness-110 active:scale-[0.98] transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <Wifi className="w-4 h-4 rotate-90" />
              <span>{isTagging ? '단말기 통신 중...' : '아이폰 상단 단말기 태그하기 (승차 1,400원)'}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
