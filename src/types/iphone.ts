export type DeviceColorKey = 'burgundy' | 'glacier' | 'black' | 'silver';

export interface DeviceColor {
  key: DeviceColorKey;
  nameKo: string;
  nameEn: string;
  hex: string;
  accentGlow: string;
  accentBorder: string;
  accentText: string;
  accentBg: string;
  description: string;
  finishDetail: string;
  bgGradient: string;
}

export type DeviceModelKey = 'pro' | 'promax';

export interface DeviceModel {
  key: DeviceModelKey;
  name: string;
  displaySize: string;
  basePrice: number;
  dimensions: string;
  weight: string;
  resolution: string;
}

export type SimTypeKey = 'esim' | 'dual';

export interface SimTypeOption {
  key: SimTypeKey;
  title: string;
  capacity: string;
  videoPlayback: string;
  description: string;
}

export type StorageKey = '256' | '512' | '1TB' | '2TB';

export interface StorageOption {
  key: StorageKey;
  label: string;
  priceDelta: number;
  recommendedFor: string;
}

export interface TradeInDevice {
  id: string;
  name: string;
  discount: number;
}
