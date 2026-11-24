import React, { useState } from 'react';
import { DeviceColor } from '../types/iphone';
import { Camera, Aperture, CheckCircle2, ShieldCheck, Sparkles, ZoomIn } from 'lucide-react';

interface CameraApertureSimulatorProps {
  currentColor: DeviceColor;
}

export const CameraApertureSimulator: React.FC<CameraApertureSimulatorProps> = ({ currentColor }) => {
  // Aperture value from 1.48 to 4.80
  const [aperture, setAperture] = useState<number>(1.48);
  const [focalLength, setFocalLength] = useState<'13mm' | '24mm' | '100mm' | '200mm'>('24mm');
  const [isVerifyingPixelSignature, setIsVerifyingPixelSignature] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);

  const cameraMacroImg = '/src/assets/images/iphone18_camera_aperture_1793686859667.jpg';

  // Calculate optical properties based on aperture
  // ƒ/1.48 -> max bokeh (blur 12px), max light intake (+340%)
  // ƒ/4.80 -> zero bokeh (blur 0px), deep sharpness
  const blurAmount = Math.max(0, (4.8 - aperture) * 3.8);
  const lightIntakePct = Math.round(100 + ((4.8 - aperture) / (4.8 - 1.48)) * 240);
  const irisOpeningRadius = 14 + ((4.8 - aperture) / (4.8 - 1.48)) * 32; // 14px to 46px radius

  const handleVerifySignature = () => {
    setIsVerifyingPixelSignature(true);
    setTimeout(() => {
      setIsVerifyingPixelSignature(false);
      setHasVerified(true);
    }, 600);
  };

  return (
    <section id="camera" className="py-20 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span className="font-bold text-white">03. OPTICAL REVOLUTION</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: currentColor.accentText }}>Mechanical Variable Aperture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            iPhone 최초의 48MP 물리 가변 조리개
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-3xl">
            소프트웨어 인공 블러가 아닌 6엽 물리 조리개 날개가 직접 개폐되는 진짜 광학 메커니즘. 저조도 인물 사진의 매혹적인 심도부터 광활한 풍경의 극단적인 선명함까지 자유롭게 통제합니다.
          </p>
        </div>

        {/* 2-Column Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Aperture Iris & Optical Preview */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/60 backdrop-blur-xl space-y-6">
            
            {/* Focal Length Selector */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
              <span className="text-neutral-400 font-mono">초점 거리 선택:</span>
              <div className="flex items-center gap-1.5 bg-neutral-950/80 p-1 rounded-xl border border-white/10">
                {(['13mm', '24mm', '100mm', '200mm'] as const).map((len) => (
                  <button
                    key={len}
                    onClick={() => setFocalLength(len)}
                    className={`px-3 py-1.5 rounded-lg transition-all font-mono ${
                      focalLength === len
                        ? 'bg-white/20 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {len}
                    {len === '24mm' && ' (가변)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Aperture Iris & Subject Viewport */}
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 flex items-center justify-center">
              
              {/* Background Landscape with Dynamic Optical Blur */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')`,
                  filter: `blur(${blurAmount}px) brightness(0.75)`,
                  transform: 'scale(1.08)'
                }}
              />

              {/* Crisp In-Focus Portrait Subject in Center */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/80 shadow-2xl overflow-hidden bg-neutral-800/80 flex items-center justify-center backdrop-blur-none">
                  {/* Mechanical Iris Blade Graphic Overlay */}
                  <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    {/* Aperture Hole */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r={irisOpeningRadius} 
                      fill="rgba(0,0,0,0.85)" 
                      stroke="#f43f5e" 
                      strokeWidth="2" 
                      className="transition-all duration-200"
                    />
                    {/* 6 Iris Blades */}
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <line
                        key={deg}
                        x1="50"
                        y1="4"
                        x2={50 + irisOpeningRadius * Math.cos((deg * Math.PI) / 180)}
                        y2={50 + irisOpeningRadius * Math.sin((deg * Math.PI) / 180)}
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="1.2"
                      />
                    ))}
                  </svg>
                </div>
                <span className="mt-2 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/80 text-white border border-white/20">
                  초점 고정 피사체 (In-Focus)
                </span>
              </div>

              {/* Live Optical Values Overlay */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                <Aperture className="w-4 h-4 text-rose-400" />
                <span>ƒ/{aperture.toFixed(2)}</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-neutral-300">
                배경 흐림: {blurAmount.toFixed(1)}px · 광량: +{lightIntakePct}%
              </div>
            </div>

            {/* Interactive Aperture Slider Control */}
            <div className="space-y-3 bg-neutral-950/70 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <Aperture className="w-4 h-4 text-rose-400" />
                  물리 조리개 수치 실시간 조절:
                </span>
                <span className="font-mono text-base font-extrabold text-white">
                  ƒ/{aperture.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="1.48"
                max="4.80"
                step="0.05"
                value={aperture}
                onChange={(e) => setAperture(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                <div className="text-left">
                  <span className="block text-white font-bold">ƒ/1.48 극저조도 / 인물</span>
                  <span className="text-[10px] text-neutral-500">풍부한 광학 아웃포커스</span>
                </div>
                <div className="text-center">
                  <span className="block text-neutral-300">ƒ/2.8 일상 / 스냅</span>
                  <span className="text-[10px] text-neutral-500">자연스러운 심도</span>
                </div>
                <div className="text-right">
                  <span className="block text-white font-bold">ƒ/4.8 풍경 / 건축</span>
                  <span className="text-[10px] text-neutral-500">주변부 팬포커스 선명</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Macro Lens View & Apple Reference Pixel Signature */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* New Wide Horizon Camera Island Architecture Card */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400">CAMERA MODULE ARCHITECTURE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  신규 와이드 아일랜드
                </span>
              </div>

              {/* Graphic Representation of the Wide Visor Island */}
              <div 
                className="w-full h-38 rounded-3xl p-3.5 border-2 relative overflow-hidden flex items-center justify-between shadow-2xl transition-all"
                style={{
                  backgroundColor: currentColor.hex,
                  borderColor: currentColor.accentBorder,
                  boxShadow: `0 12px 36px -8px ${currentColor.accentGlow}`
                }}
              >
                {/* Metallic Plateau Sheen Texture */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: 'repeating-linear-gradient(90deg, #fff 0px, transparent 1px, transparent 3px)'
                  }}
                />

                {/* Left: 3 Precision Pro Optical Lenses */}
                <div className="relative w-44 h-28 z-10">
                  {/* Main Variable Lens */}
                  <div 
                    onClick={() => setFocalLength('24mm')}
                    className={`absolute top-0 left-0 w-13 h-13 rounded-full border-2 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                      focalLength === '24mm' ? 'border-white shadow-[0_0_12px_#fff]' : 'border-white/70'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #0d0d12 70%, #000 100%)',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.85), inset 0 0 6px rgba(255,255,255,0.4)'
                    }}
                    title="48MP 메인 가변 조리개 렌즈 (24mm)"
                  >
                    <div className="w-10 h-10 rounded-full border border-cyan-400/50 bg-gradient-to-tr from-cyan-950/60 via-purple-950/40 to-rose-950/50 flex items-center justify-center shadow-inner">
                      <div className="w-5 h-5 rounded-full bg-black border border-rose-500/80 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#38bdf8]" />
                      </div>
                    </div>
                  </div>

                  {/* Ultra Wide Lens */}
                  <div 
                    onClick={() => setFocalLength('13mm')}
                    className={`absolute bottom-0 left-0 w-13 h-13 rounded-full border-2 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                      focalLength === '13mm' ? 'border-white shadow-[0_0_12px_#fff]' : 'border-white/70'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #0d0d12 70%, #000 100%)',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.85), inset 0 0 6px rgba(255,255,255,0.4)'
                    }}
                    title="48MP 초광각 렌즈 (13mm)"
                  >
                    <div className="w-10 h-10 rounded-full border border-purple-400/50 bg-gradient-to-tr from-purple-950/60 via-indigo-950/40 to-neutral-950 flex items-center justify-center shadow-inner">
                      <div className="w-4.5 h-4.5 rounded-full bg-black border border-purple-500/60 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      </div>
                    </div>
                  </div>

                  {/* Telephoto Periscope Lens */}
                  <div 
                    onClick={() => setFocalLength('100mm')}
                    className={`absolute top-6 left-19 w-13 h-13 rounded-full border-2 cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                      focalLength === '100mm' || focalLength === '200mm' ? 'border-white shadow-[0_0_12px_#fff]' : 'border-white/70'
                    }`}
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #2a2a35 0%, #0d0d12 70%, #000 100%)',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.85), inset 0 0 6px rgba(255,255,255,0.4)'
                    }}
                    title="48MP 잠망경 망원 렌즈 (100mm 4x)"
                  >
                    <div className="w-10 h-10 rounded-full border border-emerald-400/50 bg-gradient-to-tr from-emerald-950/60 via-teal-950/40 to-black flex items-center justify-center shadow-inner">
                      <div className="w-4.5 h-4.5 rounded-xs bg-black border border-emerald-500/60 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-xs bg-indigo-500 shadow-[0_0_4px_#6366f1]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Quad Flash & LiDAR Scanner */}
                <div className="flex flex-col items-center justify-between h-26 pr-4 z-10">
                  <div className="w-8 h-8 rounded-full bg-amber-50 border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-115">
                    <div className="grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>
                  </div>

                  <div className="w-2 h-2 rounded-full bg-black/90 border border-white/30 shadow-inner" title="어쿠스틱 스튜디오 마이크" />

                  <div className="w-7 h-7 rounded-full bg-neutral-950 border border-white/40 shadow-inner flex items-center justify-center cursor-pointer transition-transform hover:scale-115">
                    <div className="w-3 h-3 rounded-full bg-neutral-800 border border-purple-500/50 shadow-[0_0_4px_#a855f7]" />
                  </div>
                </div>
              </div>

              {/* Lens Specification Quick Details */}
              <div className="space-y-2 text-xs text-neutral-300 pt-1">
                <div className="flex justify-between items-center text-[11px] font-mono text-neutral-400">
                  <span>선택된 활성 렌즈:</span>
                  <span className="text-white font-bold">
                    {focalLength === '24mm' && '24mm 메인 가변 렌즈 (ƒ/1.48~ƒ/4.8)'}
                    {focalLength === '13mm' && '13mm 초광각 렌즈 (ƒ/2.2, 120° FOV)'}
                    {focalLength === '100mm' && '100mm 잠망경 망원 렌즈 (4x 광학)'}
                    {focalLength === '200mm' && '200mm 하이브리드 망원 렌즈 (8x 퓨전)'}
                  </span>
                </div>
                <ul className="space-y-1.5 text-neutral-400 font-mono text-[11px]">
                  <li>• 메인 48MP: 24mm, ƒ/1.48~ƒ/4.8 가변, 2세대 센서 시프트 OIS, 8P 사파이어 렌즈</li>
                  <li>• 초광각 48MP: 13mm, ƒ/2.2, 120° FOV, 2cm 초근접 접사 오토포커스</li>
                  <li>• 망원 48MP: 100mm(4x 광학) / 200mm(8x 퓨전) / 40x 디지털 초해상도</li>
                  <li>• 우측 격리 모듈: 쿼드 LED 트루톤 플래시 &amp; 초정밀 LiDAR 스캐너 (발열 차단 분리)</li>
                </ul>
              </div>
            </div>

            {/* Apple Reference Pixel Cryptographic Signature Demo */}
            <div className="rounded-3xl p-6 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-white text-sm">Apple 레퍼런스 픽셀 진위 서명</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  C2PA 인증
                </span>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                딥페이크와 생성형 AI 합성 사진을 원천 차단하는 하드웨어 레벨 암호화. 셔터를 누르는 순간 A20 Pro Secure Enclave가 픽셀 센서 메타데이터를 하드웨어 서명합니다.
              </p>

              <button
                onClick={handleVerifySignature}
                disabled={isVerifyingPixelSignature}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white border border-white/20 flex items-center justify-center gap-2"
              >
                {isVerifyingPixelSignature ? (
                  <span className="animate-pulse">하드웨어 보안 키 서명 검증 중...</span>
                ) : hasVerified ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>서명 검증 완료: 순수 원본 광학 사진 인증됨</span>
                  </>
                ) : (
                  <span>실시간 암호화 서명 검증 테스트</span>
                )}
              </button>

              {hasVerified && (
                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-[11px] font-mono text-neutral-300 space-y-1">
                  <div className="text-emerald-400 font-bold">✓ C2PA Hardware Signed</div>
                  <div>• Sensor: Sony Custom IMX-989 (48MP)</div>
                  <div>• Aperture: ƒ/{aperture.toFixed(2)} [Physical Verified]</div>
                  <div>• SHA-256: 8f4e2b9c0d1a4e7f3a9e1c2b5d8f</div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
