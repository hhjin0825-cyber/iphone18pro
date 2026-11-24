/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DeviceColorKey } from './types/iphone';
import { DEVICE_COLORS } from './data/specsData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ColorExperience } from './components/ColorExperience';
import { A20ProThermal } from './components/A20ProThermal';
import { CameraApertureSimulator } from './components/CameraApertureSimulator';
import { UdirDynamicIsland } from './components/UdirDynamicIsland';
import { BatteryAndFastCharging } from './components/BatteryAndFastCharging';
import { TmoneyPaymentDemo } from './components/TmoneyPaymentDemo';
import { PricingSimulator } from './components/PricingSimulator';
import { SpecMatrixAndWhitepaper } from './components/SpecMatrixAndWhitepaper';
import { ReservationModal } from './components/ReservationModal';

export default function App() {
  const [currentColorKey, setCurrentColorKey] = useState<DeviceColorKey>('burgundy');
  const [activeTab, setActiveTab] = useState<'showcase' | 'whitepaper'>('showcase');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    model: string;
    sim: string;
    storage: string;
    color: string;
    totalPrice: number;
    monthlyPrice: number;
    hasAppleCare: boolean;
    tradeInDevice: string;
    tradeInDiscount: number;
  } | null>(null);

  const currentColor = DEVICE_COLORS[currentColorKey];

  const handleColorChange = (key: DeviceColorKey) => {
    setCurrentColorKey(key);
  };

  const handleJumpToEstimator = () => {
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToSection = (sectionId: string) => {
    setActiveTab('showcase');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenReservation = (details: {
    model: string;
    sim: string;
    storage: string;
    color: string;
    totalPrice: number;
    monthlyPrice: number;
    hasAppleCare: boolean;
    tradeInDevice: string;
    tradeInDiscount: number;
  }) => {
    setOrderDetails(details);
    setIsReservationOpen(true);
  };

  const handleQuickPreOrder = () => {
    setOrderDetails({
      model: 'iPhone 18 Pro (6.3형)',
      sim: 'eSIM 전용 모델 (4,288 mAh)',
      storage: '256GB',
      color: `${currentColor.nameKo} (${currentColor.nameEn})`,
      totalPrice: 1990000,
      monthlyPrice: Math.round(1990000 / 24),
      hasAppleCare: false,
      tradeInDevice: '선택 안 함',
      tradeInDiscount: 0,
    });
    setIsReservationOpen(true);
  };

  return (
    <div 
      className="min-h-screen bg-[#070709] text-neutral-100 selection:bg-rose-600 selection:text-white transition-colors duration-700"
      style={{
        '--accent-glow': currentColor.accentGlow,
        '--accent-border': currentColor.accentBorder,
        '--accent-text': currentColor.accentText,
        '--accent-bg': currentColor.accentBg,
      } as React.CSSProperties}
    >
      {/* Dynamic Background Glow Gradient */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle 800px at 50% 200px, ${currentColor.hex}, transparent 80%)`
        }}
      />

      {/* Navigation Bar */}
      <Navbar
        currentColor={currentColor}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOrder={handleQuickPreOrder}
      />

      <main className="relative z-10">
        {activeTab === 'showcase' ? (
          <>
            {/* 01. Hero Visual & Color Switcher */}
            <HeroSection
              currentColor={currentColor}
              onColorChange={handleColorChange}
              onJumpToEstimator={handleJumpToEstimator}
            />

            {/* 02. Finish & Color Experience */}
            <ColorExperience
              currentColor={currentColor}
              onColorChange={handleColorChange}
            />

            {/* 03. Performance & Thermal A20 Pro */}
            <A20ProThermal currentColor={currentColor} />

            {/* 04. Optical Revolution & Mechanical Variable Aperture */}
            <CameraApertureSimulator currentColor={currentColor} />

            {/* 05. Display & UDIR Dynamic Island */}
            <UdirDynamicIsland currentColor={currentColor} />

            {/* 06. Battery & AVS 60W Ultra-Fast Charging */}
            <BatteryAndFastCharging currentColor={currentColor} />

            {/* 07. Localized Ecosystem: Apple Pay T-money Transit */}
            <TmoneyPaymentDemo currentColor={currentColor} />

            {/* 08. Custom Build & Pricing Simulator */}
            <PricingSimulator
              currentColor={currentColor}
              onColorChange={handleColorChange}
              onOpenReservationModal={handleOpenReservation}
            />
          </>
        ) : (
          <SpecMatrixAndWhitepaper
            currentColor={currentColor}
            onJumpToSection={handleJumpToSection}
          />
        )}
      </main>

      {/* Quiet Apple-Style Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-neutral-950 py-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2 text-[11px] leading-relaxed text-neutral-500 border-b border-white/5 pb-6">
            <p>1. 배터리 사용 시간은 네트워크 구성 및 기타 여러 요인에 따라 달라지며 실제 결과는 다를 수 있습니다. eSIM 전용 모델 기준 최대 36시간 연속 비디오 재생이 측정되었습니다.</p>
            <p>2. AVS(Adjustable Voltage Supply) 60W 초고속 충전은 공인 60W 이상 전원 어댑터 및 전용 USB-C 케이블 사용 시 작동합니다.</p>
            <p>3. Apple Pay 티머니 익스프레스 대중교통 기능은 수도권 지하철 및 전국 시내버스 교통카드 규격을 지원하며, 방전 후 최대 5시간 예비 전력 카드로 동작합니다.</p>
            <p>4. C2PA 기반 Apple 레퍼런스 픽셀 서명은 A20 Pro Secure Enclave 암호화 하드웨어를 통해 생성됩니다.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-300">Apple Inc.</span>
              <span>·</span>
              <span>iPhone 18 Pro Interactive Web Showcase &amp; Spec Document</span>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setActiveTab(activeTab === 'showcase' ? 'whitepaper' : 'showcase')}
                className="hover:text-white transition-colors"
              >
                {activeTab === 'showcase' ? '기획 명세서 모드로 보기' : '쇼케이스 모드로 보기'}
              </button>
              <a href="#estimate" className="hover:text-white transition-colors">견적 시뮬레이터</a>
              <button onClick={handleQuickPreOrder} className="hover:text-white transition-colors">사전 예약</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Reservation Pass & Checkout Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        orderDetails={orderDetails}
        currentColor={currentColor}
      />
    </div>
  );
}
