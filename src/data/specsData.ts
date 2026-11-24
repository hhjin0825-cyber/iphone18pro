import { DeviceColor, DeviceModel, SimTypeOption, StorageOption, TradeInDevice } from '../types/iphone';

export const DEVICE_COLORS: Record<string, DeviceColor> = {
  burgundy: {
    key: 'burgundy',
    nameKo: '버건디',
    nameEn: 'Deep Burgundy',
    hex: '#6B1124',
    accentGlow: 'rgba(186, 24, 67, 0.45)',
    accentBorder: 'rgba(225, 29, 72, 0.5)',
    accentText: '#f43f5e',
    accentBg: 'rgba(159, 18, 57, 0.2)',
    description: '풍부하고 깊이 있는 와인 톤의 프리미엄 마감. 후면 세라믹 쉴드와 아노다이징 알루미늄 유니바디 톤이 일치하는 시그니처 대표 컬러.',
    finishDetail: 'Ceramic Shield + Anodized Aluminum 100% Monolithic Match',
    bgGradient: 'from-rose-950/40 via-neutral-950 to-neutral-950'
  },
  glacier: {
    key: 'glacier',
    nameKo: '글레이셔',
    nameEn: 'Glacier Blue',
    hex: '#89B3CA',
    accentGlow: 'rgba(56, 189, 248, 0.45)',
    accentBorder: 'rgba(56, 189, 248, 0.5)',
    accentText: '#38bdf8',
    accentBg: 'rgba(14, 165, 233, 0.2)',
    description: '빙하의 차가운 미스티 블루-실버 감성. 빛의 각도에 따라 오묘하게 빛나는 수려한 일체형 아노다이징 유니바디 마감.',
    finishDetail: 'Matte Frosted Glass + Glacier Cyan Alloy Finish',
    bgGradient: 'from-sky-950/40 via-neutral-950 to-neutral-950'
  },
  black: {
    key: 'black',
    nameKo: '블랙',
    nameEn: 'Black',
    hex: '#1E1E24',
    accentGlow: 'rgba(147, 51, 234, 0.35)',
    accentBorder: 'rgba(168, 85, 247, 0.4)',
    accentText: '#c084fc',
    accentBg: 'rgba(126, 34, 206, 0.2)',
    description: '깊고 묵직한 옵시디언 다크 매트 텍스처. 흑연 및 차세대 베이퍼 챔버 방열 테마와 부합하는 클래식 프로 바디.',
    finishDetail: 'Obsidian PVD Micro-coating + High Durability Matte',
    bgGradient: 'from-purple-950/30 via-neutral-950 to-neutral-950'
  },
  silver: {
    key: 'silver',
    nameKo: '실버',
    nameEn: 'Silver',
    hex: '#E2E8F0',
    accentGlow: 'rgba(226, 232, 240, 0.35)',
    accentBorder: 'rgba(241, 245, 249, 0.5)',
    accentText: '#f8fafc',
    accentBg: 'rgba(203, 213, 225, 0.15)',
    description: '정갈하고 깨끗한 아노다이징 실버 톤. 2차 반사 광택을 억제한 무결점 세라믹 쉴드 일체형 외장.',
    finishDetail: 'Anti-Glare Pure Ceramic Shield + Bead-blasted Frame',
    bgGradient: 'from-slate-800/40 via-neutral-950 to-neutral-950'
  }
};

export const DEVICE_MODELS: DeviceModel[] = [
  {
    key: 'pro',
    name: 'iPhone 18 Pro',
    displaySize: '6.3형',
    basePrice: 1990000,
    dimensions: '149.6 x 71.5 x 8.1 mm',
    weight: '189g',
    resolution: '2622 x 1206 (460 ppi)'
  },
  {
    key: 'promax',
    name: 'iPhone 18 Pro Max',
    displaySize: '6.9형',
    basePrice: 2190000,
    dimensions: '163.0 x 77.6 x 8.1 mm',
    weight: '221g',
    resolution: '2868 x 1320 (460 ppi)'
  }
];

export const SIM_OPTIONS: SimTypeOption[] = [
  {
    key: 'esim',
    title: 'eSIM 전용 모델',
    capacity: '4,288 mAh',
    videoPlayback: '최대 36시간',
    description: '물리 SIM 트레이 공간을 배터리로 전량 전환하여 역대 최장 배터리 타임을 제공합니다.'
  },
  {
    key: 'dual',
    title: 'eSIM + 물리 나노 SIM 겸용',
    capacity: '4,058 mAh',
    videoPlayback: '최대 34시간',
    description: '기존 나노 SIM 카드를 자유롭게 탈착하면서 글로벌 로밍을 간편하게 운용할 수 있습니다.'
  }
];

export const STORAGE_OPTIONS: StorageOption[] = [
  { key: '256', label: '256GB', priceDelta: 0, recommendedFor: '일상적 사용 및 4K 비디오 촬영' },
  { key: '512', label: '512GB', priceDelta: 300000, recommendedFor: 'ProRes 및 대용량 게임 라이브러리' },
  { key: '1TB', label: '1TB', priceDelta: 600000, recommendedFor: '전문가용 로그 비디오 & AI 로컬 모델' },
  { key: '2TB', label: '2TB', priceDelta: 950000, recommendedFor: '무압축 영화 촬영 및 프로페셔널 아카이빙' }
];

export const TRADE_IN_DEVICES: TradeInDevice[] = [
  { id: 'none', name: '선택 안 함 (보상 판매 없음)', discount: 0 },
  { id: '17pro', name: 'iPhone 17 Pro', discount: 850000 },
  { id: '17promax', name: 'iPhone 17 Pro Max', discount: 1050000 },
  { id: '16pro', name: 'iPhone 16 Pro', discount: 620000 },
  { id: '16promax', name: 'iPhone 16 Pro Max', discount: 780000 },
  { id: '15pro', name: 'iPhone 15 Pro', discount: 450000 }
];

export const WIREFRAME_SPECS = [
  {
    id: '01. HERO',
    title: '메인 비주얼 & 컬러 스위처',
    content: '신규 와이드 호라이즌 카메라 아일랜드, 실시간 4종 컬러 스위칭, 세라믹 쉴드와 유니바디 일체형 마감',
    tech: '인터랙티브 디바이스 뷰어 + Tailwind 다크 앰비언트 모피즘',
    copy: '“한계를 뛰어넘은 프로의 완벽함.”'
  },
  {
    id: '02. DESIGN',
    title: '일체형 유니바디 & 호라이즌 아일랜드',
    content: '상단 와이드 수평 카메라 아일랜드 설계로 바닥 덜컹거림(Desk-wobble) 0% 달성, 후면 Ceramic Shield 일체형',
    tech: '반사광 억제 PVD 아노다이징 코팅 기법 조감 인터랙션',
    copy: '“완벽히 일치하는 오프셋 없는 일체감.”'
  },
  {
    id: '03. CHIPSET',
    title: 'A20 Pro & 3배 베이퍼 챔버',
    content: 'TSMC N2 (2나노미터) 공정, 6코어 CPU, 7코어 GPU, 듀얼 16코어 Neural Engine',
    tech: '나노트윈 구리 히트파이프 및 +40% 지속 성능 인터랙티브 벤치마크',
    copy: '“40% 더 높은 지속 퍼포먼스.”'
  },
  {
    id: '04. DISPLAY',
    title: 'UDIR 센서 & 축소된 Dynamic Island',
    content: '언더 디스플레이 적외선 센서(UDIR)로 아일랜드 면적 35% 축소, 3개 앱 동시 라이브',
    tech: '1-120Hz LTPO2 ProMotion 및 3000nits 가변 조도 시뮬레이터',
    copy: '“더 작아진 아일랜드, 3배 더 넓은 자유.”'
  },
  {
    id: '05. CAMERA',
    title: '호라이즌 가변 조리개 카메라 아일랜드',
    content: 'iPhone 최초 메인 48MP 가변 조리개(ƒ/1.48~ƒ/4.8) 메커니즘, 와이드 아일랜드 좌측 트리플 렌즈 + 우측 플래시/LiDAR 분리 배치',
    tech: '가변 조리개 실시간 셔터 블레이드 조절 및 심도 피사계 심도 제어기',
    copy: '“iPhone 최초의 물리 가변 조리개.”'
  },
  {
    id: '06. POWER',
    title: '배터리 & AVS 60W 초고속 충전',
    content: 'eSIM 전용(4,288mAh/36h) vs 겸용(4,058mAh/34h) 및 15분 50% 급속 충전',
    tech: 'AVS 60W 충전 타임라인 시뮬레이션 및 전력 곡선 그래프',
    copy: '“15분 충전으로 하루를 채우다.”'
  },
  {
    id: '07. SERVICE',
    title: 'Apple Pay 티머니 대중교통',
    content: '대한민국 수도권 및 전국 대중교통 NFC 익스프레스 태깅 및 MIE 보안 메모리',
    tech: '실시간 가상 지하철 게이트 탭 인터랙션 및 잔액 차감 시뮬레이션',
    copy: '“대한민국 대중교통도 터치 한 번으로.”'
  }
];

export const TECHNICAL_COMPARISON = [
  {
    category: '프로세서',
    feature: 'AP 공정 및 코어',
    iphone18Pro: 'A20 Pro (TSMC 2nm N2), 6-core CPU / 7-core GPU',
    iphone17Pro: 'A19 Pro (TSMC 3nm N3P), 6-core CPU / 6-core GPU',
    iphone16Pro: 'A18 Pro (TSMC 3nm N3E), 6-core CPU / 6-core GPU'
  },
  {
    category: '메모리',
    feature: 'RAM 규격 & 대역폭',
    iphone18Pro: '12GB LPDDR5X (96-Bit 3채널, +50% 대역폭)',
    iphone17Pro: '12GB LPDDR5X (64-Bit 듀얼채널)',
    iphone16Pro: '8GB LPDDR5X (64-Bit 듀얼채널)'
  },
  {
    category: '방열 설계',
    feature: '열 관리 솔루션',
    iphone18Pro: '3배 확장 베이퍼 챔버 + 나노트윈 구리',
    iphone17Pro: '알루미늄 서브스트레이트 + 흑연 시트',
    iphone16Pro: '흑연 시트 일체형'
  },
  {
    category: '메인 카메라',
    feature: '조리개 사양',
    iphone18Pro: '48MP 물리 가변 조리개 (ƒ/1.48 ~ ƒ/4.8)',
    iphone17Pro: '48MP 고정 조리개 (ƒ/1.78)',
    iphone16Pro: '48MP 고정 조리개 (ƒ/1.78)'
  },
  {
    category: '디스플레이',
    feature: 'Dynamic Island & 밝기',
    iphone18Pro: 'UDIR 적용 (35% 축소, 3앱 동시표시), 3,000 nits',
    iphone17Pro: '기존 Dynamic Island (2앱 동시표시), 2,000 nits',
    iphone16Pro: '기존 Dynamic Island (2앱 동시표시), 2,000 nits'
  },
  {
    category: '충전',
    feature: '유선 충전 규격',
    iphone18Pro: 'AVS 60W 초고속 (15분 50%)',
    iphone17Pro: 'PD 30W 고속 (30분 50%)',
    iphone16Pro: 'PD 27W 고속 (30분 50%)'
  },
  {
    category: '로컬 페이',
    feature: '대중교통 지원',
    iphone18Pro: 'Apple Pay 티머니 공식 지원 (MIE 하드웨어 보안)',
    iphone17Pro: 'EMV 컨택리스 결제만 지원',
    iphone16Pro: 'EMV 컨택리스 결제만 지원'
  }
];
