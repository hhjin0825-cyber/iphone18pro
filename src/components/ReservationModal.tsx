import React, { useState } from 'react';
import { DeviceColor } from '../types/iphone';
import { X, CheckCircle2, ShieldCheck, Ticket, Download, Share2 } from 'lucide-react';

interface OrderDetails {
  model: string;
  sim: string;
  storage: string;
  color: string;
  totalPrice: number;
  monthlyPrice: number;
  hasAppleCare: boolean;
  tradeInDevice: string;
  tradeInDiscount: number;
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
  currentColor: DeviceColor;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
  currentColor,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen || !orderDetails) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    const code = `IP18PRO-${Math.floor(100000 + Math.random() * 900000)}`;
    setReservationCode(code);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-neutral-900/95 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 block">
                Official Priority Reservation
              </span>
              <h3 className="text-2xl font-bold text-white">iPhone 18 Pro 사전 예약</h3>
              <p className="text-xs text-neutral-400">
                선택하신 맞춤 사양으로 우선 배정 순번표와 Apple Wallet 디지털 패스가 생성됩니다.
              </p>
            </div>

            {/* Selected Spec Card */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono">기기 모델:</span>
                <span className="font-bold text-white">{orderDetails.model}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono">선택 색상:</span>
                <span className="font-semibold text-white">{orderDetails.color}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono">SIM &amp; 배터리:</span>
                <span className="font-semibold text-emerald-400">{orderDetails.sim}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono">저장 용량:</span>
                <span className="font-semibold text-white">{orderDetails.storage}</span>
              </div>
              {orderDetails.hasAppleCare && (
                <div className="flex justify-between items-center text-rose-400">
                  <span className="font-mono">보증 서비스:</span>
                  <span>AppleCare+ (2년)</span>
                </div>
              )}
              {orderDetails.tradeInDiscount > 0 && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span className="font-mono">보상 할인:</span>
                  <span>- ₩{orderDetails.tradeInDiscount.toLocaleString()} ({orderDetails.tradeInDevice})</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-neutral-300">최종 예약 금액:</span>
                <span className="text-xl font-extrabold font-mono text-white">
                  ₩{orderDetails.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">예약자 성함</label>
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">연락처 (휴대폰 번호)</label>
                <input
                  type="tel"
                  required
                  placeholder="010-1234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">이메일 주소 (선택)</label>
                <input
                  type="email"
                  placeholder="customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white/50"
                />
              </div>

              <div className="text-[11px] text-neutral-500 space-y-1 pt-1">
                <p>• 사전 예약 취소는 정식 출시일 3일 전까지 전액 위약금 없이 가능합니다.</p>
                <p>• 예약 순번에 따라 1차 물량이 선착순 우선 배정됩니다.</p>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: currentColor.hex }}
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white shadow-xl hover:brightness-110 active:scale-95 transition-all border border-white/20"
              >
                사전 예약 신청 및 전자 순번표 발급
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Ticket / Apple Wallet Pass */
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">사전 예약이 정상 접수되었습니다</h3>
              <p className="text-xs text-neutral-400">
                {name} 고객님, 1차 출시 당일 우선 수령 배정되었습니다.
              </p>
            </div>

            {/* Apple Wallet Style Ticket */}
            <div className="rounded-3xl p-6 bg-gradient-to-b from-neutral-800 to-neutral-950 border border-white/20 text-left space-y-4 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-rose-400" />
                  <span className="font-bold text-white text-sm">Apple Priority Pass</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  CONFIRMED
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">예약 번호:</span>
                  <span className="font-mono font-bold text-white">{reservationCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">기기 모델:</span>
                  <span className="font-bold text-white">{orderDetails.model} ({orderDetails.storage})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">색상 및 배터리:</span>
                  <span className="font-medium text-white">{orderDetails.color} · {orderDetails.sim}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">배송 예정일:</span>
                  <span className="font-mono text-emerald-400 font-semibold">2026년 9월 18일 (금) 순차 발송</span>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="pt-4 border-t border-dashed border-white/20 text-center space-y-1">
                <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,#000_2px,#000_6px)] rounded opacity-80" />
                <span className="text-[10px] font-mono text-neutral-500">{reservationCode}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  alert('Apple Wallet 패스가 저장되었습니다.');
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Wallet에 추가</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold bg-white text-black hover:bg-neutral-200"
              >
                확인 완료
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
