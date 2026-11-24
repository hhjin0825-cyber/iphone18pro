import React from 'react';
import { DeviceColor } from '../types/iphone';
import { ApplePhotoLogo } from './ApplePhotoLogo';

interface NavbarProps {
  currentColor: DeviceColor;
  activeTab: 'showcase' | 'whitepaper';
  setActiveTab: (tab: 'showcase' | 'whitepaper') => void;
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentColor,
  activeTab,
  setActiveTab,
  onOpenOrder,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-white/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a href="#" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white whitespace-nowrap hover:opacity-90 transition-opacity">
            <ApplePhotoLogo variant="flat" className="w-4 h-5 text-white shrink-0" />
            <span>iPhone 18 Pro</span>
          </a>
          <span 
            className="text-[11px] font-mono px-2 py-0.5 rounded-full border transition-colors hidden sm:inline-block"
            style={{ 
              borderColor: currentColor.accentBorder, 
              color: currentColor.accentText,
              backgroundColor: currentColor.accentBg 
            }}
          >
            {currentColor.nameKo}
          </span>
        </div>

        {/* Zone 2: 4-5 nav links, single-line */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <a href="#colors" className="hover:text-white transition-colors whitespace-nowrap">외장 마감</a>
          <a href="#chipset" className="hover:text-white transition-colors whitespace-nowrap">A20 Pro</a>
          <a href="#camera" className="hover:text-white transition-colors whitespace-nowrap">가변 조리개</a>
          <a href="#display" className="hover:text-white transition-colors whitespace-nowrap">Dynamic Island</a>
          <a href="#tmoney" className="hover:text-white transition-colors whitespace-nowrap">티머니</a>
          <a href="#estimate" className="hover:text-white transition-colors whitespace-nowrap">견적 시뮬레이터</a>
        </nav>

        {/* Zone 3: Primary action + Mode Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Dual Perspective Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                activeTab === 'showcase'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              쇼케이스
            </button>
            <button
              onClick={() => setActiveTab('whitepaper')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium whitespace-nowrap ${
                activeTab === 'whitepaper'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              기획 명세서
            </button>
          </div>

          <button
            onClick={onOpenOrder}
            style={{ backgroundColor: currentColor.hex }}
            className="px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all whitespace-nowrap border border-white/20"
          >
            사전 예약하기
          </button>
        </div>
      </div>
    </header>
  );
};
