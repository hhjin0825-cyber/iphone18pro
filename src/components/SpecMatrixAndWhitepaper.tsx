import React, { useState } from 'react';
import { DeviceColor } from '../types/iphone';
import { WIREFRAME_SPECS, TECHNICAL_COMPARISON } from '../data/specsData';
import { FileText, Layers, CheckCircle2, ArrowRight, Table, Download, Printer } from 'lucide-react';

interface SpecMatrixAndWhitepaperProps {
  currentColor: DeviceColor;
  onJumpToSection: (sectionId: string) => void;
}

export const SpecMatrixAndWhitepaper: React.FC<SpecMatrixAndWhitepaperProps> = ({
  currentColor,
  onJumpToSection,
}) => {
  const [activeTab, setActiveTab] = useState<'wireframe' | 'comparison' | 'ux-spec'>('wireframe');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredSpecs = WIREFRAME_SPECS.filter(
    (item) =>
      item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.tech.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-10 border border-white/10 bg-neutral-900/60 backdrop-blur-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="font-bold text-white">Apple Pro Interactive Web Specification</span>
              <span>·</span>
              <span className="text-emerald-400">iOS 27 &amp; Next-Gen Flagship Spec</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              iPhone 18 Pro 웹사이트 기획안 &amp; 기술 명세서
            </h1>
            <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
              버건디·글레이셔·블랙·실버 4종 일체형 마감, TSMC 2nm A20 Pro 칩셋, 48MP 가변 조리개, UDIR 축소 Dynamic Island 사양을 완벽히 구현한 인터랙티브 프로토타입 설계서입니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>기획서 인쇄 / PDF 저장</span>
            </button>
          </div>
        </div>

        {/* Spec Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('wireframe')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'wireframe'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            01. 섹션별 와이어프레임 설계표 (7개 섹션)
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            02. 3세대 플래그십 기술 사양 비교표
          </button>
          <button
            onClick={() => setActiveTab('ux-spec')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === 'ux-spec'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            03. UX 인터랙션 가이드 &amp; 카피라이팅
          </button>
        </div>
      </div>

      {/* Tab 1: Wireframe Section-by-Section Architecture */}
      {activeTab === 'wireframe' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">랜딩 페이지 섹션별 와이어프레임 상세 명세</h2>
              <p className="text-xs text-neutral-400">각 컴포넌트의 기획 의도, 배치 요소, 개발 기술 스택 및 카피라이팅</p>
            </div>
            <input
              type="text"
              placeholder="섹션 검색..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs w-48 focus:outline-none"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase font-mono text-[11px] bg-white/5">
                  <th className="py-3.5 px-4">섹션 ID</th>
                  <th className="py-3.5 px-4">섹션 명칭</th>
                  <th className="py-3.5 px-4">핵심 콘텐츠 &amp; 레이아웃</th>
                  <th className="py-3.5 px-4">개발 요구사항 &amp; 기술 스택</th>
                  <th className="py-3.5 px-4">대표 카피라이팅</th>
                  <th className="py-3.5 px-4 text-right">체험 이동</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {filteredSpecs.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-rose-400 whitespace-nowrap">
                      {row.id}
                    </td>
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                      {row.title}
                    </td>
                    <td className="py-4 px-4 text-xs text-neutral-300">
                      {row.content}
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-neutral-400">
                      {row.tech}
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-white italic">
                      {row.copy}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          const targetMap: Record<string, string> = {
                            '01. HERO': 'colors',
                            '02. DESIGN': 'colors',
                            '03. CHIPSET': 'chipset',
                            '04. DISPLAY': 'display',
                            '05. CAMERA': 'camera',
                            '06. POWER': 'battery',
                            '07. SERVICE': 'tmoney'
                          };
                          onJumpToSection(targetMap[row.id] || 'colors');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                      >
                        이동 →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: 3-Generation Comparative Specs Matrix */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">iPhone 18 Pro vs 17 Pro vs 16 Pro 세대별 사양 비교</h2>
            <p className="text-xs text-neutral-400">2nm 공정 전환, 물리 조리개, UDIR 센서 및 한국 맞춤 결제 진화표</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase font-mono text-[11px] bg-white/5">
                  <th className="py-3.5 px-4">구분</th>
                  <th className="py-3.5 px-4">비교 항목</th>
                  <th className="py-3.5 px-4 font-bold text-white bg-rose-950/30 border-x border-rose-500/20">
                    iPhone 18 Pro (신규)
                  </th>
                  <th className="py-3.5 px-4">iPhone 17 Pro</th>
                  <th className="py-3.5 px-4">iPhone 16 Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {TECHNICAL_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono font-semibold text-neutral-400">
                      {row.category}
                    </td>
                    <td className="py-4 px-4 font-bold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white bg-rose-950/20 border-x border-rose-500/20">
                      {row.iphone18Pro}
                    </td>
                    <td className="py-4 px-4 text-neutral-400">
                      {row.iphone17Pro}
                    </td>
                    <td className="py-4 px-4 text-neutral-500">
                      {row.iphone16Pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: UX Interaction & Copywriting Spec */}
      {activeTab === 'ux-spec' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-bold text-white">UX 인터랙션 개발 스펙 가이드</h3>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">스프링 물리 엔진 반응성:</strong>
                  Dynamic Island 터치 및 셔터 블레이드 조절 시 `cubic-bezier(0.16, 1, 0.3, 1)` 곡선으로 지연 시간 200ms 이내 안착.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">앰비언트 테마 전역 동기화:</strong>
                  상단 컬러 스와치 클릭 시 헤더 인디케이터, 백그라운드 블러 글로우, 제품 틴트, 견적 버튼 색상이 동시에 자연스럽게 전환.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">WCAG AA 명도 대비 준수:</strong>
                  모든 다크 모드 텍스트는 4.5:1 이상의 명도 대비를 유지하여 직사광선 3000nits 시뮬레이션 환경에서도 최적의 가독성 확보.
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-xl space-y-4">
            <h3 className="text-lg font-bold text-white">공식 카피라이팅 헌장</h3>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">HERO HEADLINE</span>
                <p className="text-sm font-bold text-white mt-1">“한계를 뛰어넘은 프로의 완벽함.”</p>
                <p className="text-[11px] text-neutral-400 mt-1">이유 없는 수식어를 배제하고 유니바디 일체감과 정밀 가공의 품격을 직관적으로 표현.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">CAMERA HEADLINE</span>
                <p className="text-sm font-bold text-white mt-1">“iPhone 최초의 물리 가변 조리개.”</p>
                <p className="text-[11px] text-neutral-400 mt-1">소프트웨어 계산 사진의 한계를 넘어선 진짜 광학 셔터 메커니즘을 강조.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-neutral-400 font-mono block">LOCAL ECOSYSTEM HEADLINE</span>
                <p className="text-sm font-bold text-white mt-1">“대한민국 대중교통도 터치 한 번으로.”</p>
                <p className="text-[11px] text-neutral-400 mt-1">국내 사용자가 가장 염원하던 실질적 Apple Pay 티머니 기능의 탑재를 친근하게 전달.</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
