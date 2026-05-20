import React, { useState } from "react";
import { Sparkles, ArrowRight, User, TrendingUp, Heart, Star, CheckCircle } from "lucide-react";

interface HeroProps {
  onStart: (name: string) => void;
}

export default function Hero({ onStart }: HeroProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("고객님의 소중한 이름(또는 닉네임)을 입력해 주세요.");
      return;
    }
    onStart(name.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-16 smooth-fade-in">
      {/* Premium Badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-lg-pink-pink text-sm font-semibold text-lg-red border border-lg-red/10">
          <Sparkles className="w-4 h-4" />
          AI 기반 맞춤 라이프 라이팅 큐레이션
        </span>
      </div>

      {/* Main Copywriting */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-lg-dark leading-tight md:leading-snug tracking-tight">
          우리 집에 필요한 가전,<br />
          <span className="text-lg-red bg-gradient-to-r from-lg-red to-lg-accent bg-clip-text text-transparent">
            구독으로 가장 스마트하게
          </span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-lg-muted font-medium leading-relaxed max-w-md mx-auto">
          복잡한 사양 비교와 부담스러운 예산 걱정 없이,<br />
          내 라이프스타일에 완성맞춤인 가전을 설계 받으세요.
        </p>
      </div>

      {/* Dynamic Social Banner */}
      <div className="bg-white rounded-2xl p-4 mb-8 lg-shadow-sm border border-gray-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lg-pink-pink flex items-center justify-center text-lg-red">
            <TrendingUp className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-bold text-lg-dark">실시간 인기 급상승 중</p>
            <p className="text-xs text-gray-400">오늘만 <span className="text-lg-red font-bold">1,284명</span>이 추천받았어요</p>
          </div>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden"
            >
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=60&h=60`}
                alt="user avatar"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Input and Start Area */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-black/5 border border-gray-100 mb-10">
        <div className="mb-6">
          <label htmlFor="customer-name" className="block text-sm font-bold text-lg-dark mb-2.5">
            진단 전 고객님의 성함이나 별명을 알려주세요
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
              <User className="w-5 h-5" />
            </span>
            <input
              id="customer-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="예: 채민, 민우, 행운맘 (두 글자 이상)"
              className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-lg-red/40 focus:outline-none transition-all placeholder:text-gray-300 font-semibold"
            />
          </div>
          {error && <p className="mt-2 text-xs font-semibold text-lg-accent">{error}</p>}
        </div>

        {/* Gigantic Premium CTA Button */}
        <button
          type="submit"
          id="btn-start"
          className="w-full py-5 rounded-2xl bg-lg-red hover:bg-lg-red-dark text-white font-extrabold text-lg md:text-xl shadow-lg hover:shadow-lg-red/20 flex items-center justify-center gap-2.5 transition-all text-center cursor-pointer active:scale-[0.98]"
        >
          <span>3초 맞품 추천 설계 시작하기</span>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </form>

      {/* Testimonials section styled like Toss/Apple */}
      <div className="mt-6">
        <div className="flex items-center gap-1.5 justify-center mb-5">
          <Heart className="w-4 h-4 text-lg-red fill-lg-red" />
          <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">고객 리얼 구독 체험 후기</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FAF8F8] p-5 rounded-2xl border border-gray-50">
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-lg-accent text-lg-accent" />
              ))}
            </div>
            <p className="text-sm font-medium text-lg-dark leading-relaxed">
              &quot;목돈 부담 때문에 워시타워 구매를 몇 달간 미뤘는데, <strong>월 5만 원대 구독</strong>에 정기 관리 케어까지 받으니 진작에 바꿀 걸 그랬어요! 너무 대만족합니다.&quot;
            </p>
            <span className="inline-block mt-3 text-xs font-semibold text-gray-400">30대 신혼부부 · 워시타워 구독 중</span>
          </div>

          <div className="bg-[#FAF8F8] p-5 rounded-2xl border border-gray-50">
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-lg-accent text-lg-accent" />
              ))}
            </div>
            <p className="text-sm font-medium text-lg-dark leading-relaxed">
              &quot;아이 건강을 위해서 위생 가전이 꼭 필요했는데, 식기세척기 추천 결과가 제 고민이랑 딱 들어맞아서 정말 신뢰가 갔습니다. 공식 혜택까지 편리해요!&quot;
            </p>
            <span className="inline-block mt-3 text-xs font-semibold text-gray-400">40대 직장인 워킹맘 · 식기세척기 구독 중</span>
          </div>
        </div>
      </div>
    </div>
  );
}
