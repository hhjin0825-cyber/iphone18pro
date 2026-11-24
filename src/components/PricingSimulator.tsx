import React, { useState } from 'react';
import { DeviceColor, DeviceColorKey, DeviceModelKey, SimTypeKey, StorageKey } from '../types/iphone';
import { DEVICE_COLORS, DEVICE_MODELS, SIM_OPTIONS, STORAGE_OPTIONS, TRADE_IN_DEVICES } from '../data/specsData';
import { Calculator, Check, Shield, Truck, CreditCard, Sparkles } from 'lucide-react';

interface PricingSimulatorProps {
  currentColor: DeviceColor;
  onColorChange: (colorKey: DeviceColorKey) => void;
  onOpenReservationModal: (orderDetails: {
    model: string;
    sim: string;
    storage: string;
    color: string;
    totalPrice: number;
    monthlyPrice: number;
    hasAppleCare: boolean;
    tradeInDevice: string;
    tradeInDiscount: number;
  }) => void;
}

export const PricingSimulator: React.FC<PricingSimulatorProps> = ({
  currentColor,
  onColorChange,
  onOpenReservationModal,
}) => {
  const [selectedModel, setSelectedModel] = useState<DeviceModelKey>('pro');
  const [selectedSim, setSelectedSim] = useState<SimTypeKey>('esim');
  const [selectedStorage, setSelectedStorage] = useState<StorageKey>('256');
  const [hasAppleCare, setHasAppleCare] = useState<boolean>(false);
  const [selectedTradeIn, setSelectedTradeIn] = useState<string>('none');

  const modelData = DEVICE_MODELS.find((m) => m.key === selectedModel)!;
  const storageData = STORAGE_OPTIONS.find((s) => s.key === selectedStorage)!;
  const simData = SIM_OPTIONS.find((s) => s.key === selectedSim)!;
  const tradeInData = TRADE_IN_DEVICES.find((t) => t.id === selectedTradeIn) || TRADE_IN_DEVICES[0];

  const appleCarePrice = hasAppleCare ? 329000 : 0;
  const rawTotal = modelData.basePrice + storageData.priceDelta + appleCarePrice;
  const finalTotal = Math.max(0, rawTotal - tradeInData.discount);
  const monthlyInstallment = Math.round(finalTotal / 24);

  const handleLaunchReservation = () => {
    onOpenReservationModal({
      model: modelData.name,
      sim: simData.title,
      storage: storageData.label,
      color: `${currentColor.nameKo} (${currentColor.nameEn})`,
      totalPrice: finalTotal,
      monthlyPrice: monthlyInstallment,
      hasAppleCare,
      tradeInDevice: tradeInData.name,
      tradeInDiscount: tradeInData.discount,
    });
  };

  return (
    <section id="estimate" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span className="font-bold text-white">07. BUILD &amp; ESTIMATE</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>Real-time Configuration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            실시간 견적 &amp; 옵션 조합 시뮬레이터
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            디스플레이 크기, SIM 규격에 따른 배터리 타임, 4종 컬러 및 저장 용량, 보상 판매 혜택까지 한눈에 계산하고 맞춤 사전 예약서를 발급받으세요.
          </p>
        </div>

        {/* Simulator Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Configuration Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: Model Selection */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span className="font-bold text-white">STEP 1. 모델 크기 선택</span>
                <span>Display Dimension</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEVICE_MODELS.map((model) => {
                  const isSelected = selectedModel === model.key;
                  return (
                    <button
                      key={model.key}
                      onClick={() => setSelectedModel(model.key)}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-white/50 bg-neutral-800/90 shadow-xl'
                          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-lg text-white">{model.name}</span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white font-mono">
                          {model.displaySize}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">₩{model.basePrice.toLocaleString()} 부터</p>
                      <p className="text-[11px] text-neutral-500 font-mono mt-2">{model.resolution}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Color Selection */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span className="font-bold text-white">STEP 2. 시그니처 컬러 선택</span>
                <span style={{ color: currentColor.accentText }}>{currentColor.nameKo}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(DEVICE_COLORS) as DeviceColorKey[]).map((key) => {
                  const c = DEVICE_COLORS[key];
                  const isSelected = currentColor.key === key;
                  return (
                    <button
                      key={key}
                      onClick={() => onColorChange(key)}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                        isSelected
                          ? 'border-white/50 bg-neutral-800/90 shadow-xl'
                          : 'border-white/10 bg-white/5 hover:border-white/25'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full border border-white/30 shadow-md"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-semibold text-white">{c.nameKo}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{c.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: SIM Architecture & Battery */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span className="font-bold text-white">STEP 3. SIM 방식 &amp; 배터리 용량</span>
                <span>Battery &amp; SIM Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SIM_OPTIONS.map((sim) => {
                  const isSelected = selectedSim === sim.key;
                  return (
                    <button
                      key={sim.key}
                      onClick={() => setSelectedSim(sim.key)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-white/50 bg-neutral-800/90 shadow-xl'
                          : 'border-white/10 bg-white/5 hover:border-white/25'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-sm">{sim.title}</span>
                        {sim.key === 'esim' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                            권장
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-emerald-400 font-mono font-semibold">
                        {sim.capacity} · {sim.videoPlayback}
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                        {sim.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Storage Selection */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span className="font-bold text-white">STEP 4. 저장 용량 선택</span>
                <span>Storage Tier</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STORAGE_OPTIONS.map((st) => {
                  const isSelected = selectedStorage === st.key;
                  return (
                    <button
                      key={st.key}
                      onClick={() => setSelectedStorage(st.key)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-white/50 bg-neutral-800/90 shadow-xl'
                          : 'border-white/10 bg-white/5 hover:border-white/25'
                      }`}
                    >
                      <div className="font-bold text-base text-white font-mono">{st.label}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                        {st.priceDelta === 0 ? '기본 포함' : `+ ₩${st.priceDelta.toLocaleString()}`}
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1">{st.recommendedFor}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: Trade-In (보상 판매) */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span className="font-bold text-white">STEP 5. Apple Trade In (기기 보상 판매)</span>
                <span className="text-emerald-400 font-mono">
                  {tradeInData.discount > 0 ? `-₩${tradeInData.discount.toLocaleString()}` : '미적용'}
                </span>
              </div>

              <select
                value={selectedTradeIn}
                onChange={(e) => setSelectedTradeIn(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-neutral-950 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-white/50"
              >
                {TRADE_IN_DEVICES.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name} {dev.discount > 0 ? `(최대 ₩${dev.discount.toLocaleString()} 할인)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* AppleCare+ Option */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/60 backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">AppleCare+ 보증 플랜 (2년)</h4>
                  <p className="text-xs text-neutral-400">우발적인 손상 무제한 수리 및 배터리 서비스 보증</p>
                </div>
              </div>

              <button
                onClick={() => setHasAppleCare(!hasAppleCare)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  hasAppleCare
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/10 text-neutral-300 hover:text-white'
                }`}
              >
                {hasAppleCare ? '포함됨 (+₩329,000)' : '+ ₩329,000 추가'}
              </button>
            </div>

          </div>

          {/* Right Column: Sticky Live Summary & Apple Wallet Pass Launcher */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-8 sticky top-24 border border-white/20 bg-neutral-900/90 backdrop-blur-2xl shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-white" />
                  <h3 className="font-extrabold text-xl text-white">견적 내역 요약</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300">
                  실시간 계산
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">{modelData.name} ({modelData.displaySize})</span>
                  <span className="font-mono text-white font-semibold">₩{modelData.basePrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">색상: {currentColor.nameKo}</span>
                  <div className="flex items-center gap-1.5 font-mono text-white">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentColor.hex }} />
                    <span>포함</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">SIM 구성: {simData.title}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{simData.capacity}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">저장 용량 ({storageData.label})</span>
                  <span className="font-mono text-white font-semibold">
                    {storageData.priceDelta === 0 ? '기본' : `+ ₩${storageData.priceDelta.toLocaleString()}`}
                  </span>
                </div>

                {hasAppleCare && (
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">AppleCare+ 플랜</span>
                    <span className="font-mono text-white font-semibold">+ ₩329,000</span>
                  </div>
                )}

                {tradeInData.discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>Trade In 보상 할인 ({tradeInData.name})</span>
                    <span className="font-mono font-semibold">- ₩{tradeInData.discount.toLocaleString()}</span>
                  </div>
                )}

                {/* Final Total Display */}
                <div className="pt-4 border-t border-white/10 space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-mono">총 예상 일시불 금액</span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                    ₩{finalTotal.toLocaleString()}
                  </div>
                </div>

                {/* Monthly Installment Promo Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-center">
                  <span className="text-[11px] text-neutral-400 block">
                    Apple Card 또는 제휴 카드 24개월 무이자 할부 시
                  </span>
                  <div className="text-lg font-bold font-mono text-emerald-400">
                    월 ₩{monthlyInstallment.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Service Badges */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  <span>전국 무료 특급 배송 (사전 예약자 우선 출고)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-white" />
                  <span>Apple Pay 티머니 대중교통 즉시 호환</span>
                </div>
              </div>

              {/* Reservation CTA Button */}
              <button
                onClick={handleLaunchReservation}
                style={{ backgroundColor: currentColor.hex }}
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>맞춤 사전 예약서 생성 및 패스 발급</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
