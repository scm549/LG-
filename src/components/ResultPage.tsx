import { Sparkles, Star, Check, RotateCcw, ShoppingBag, Coins, MessageSquare, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { Product } from "../types";

interface ResultPageProps {
  userName: string;
  recommendedProducts: Product[];
  personalizedMessage: string;
  isLoadingAi: boolean;
  totalOriginal: number;
  totalSubscribed: number;
  careChoiceLabel: string;
  onReset: () => void;
}

export default function ResultPage({
  userName,
  recommendedProducts,
  personalizedMessage,
  isLoadingAi,
  totalOriginal,
  totalSubscribed,
  careChoiceLabel,
  onReset
}: ResultPageProps) {
  // Safe calculation of savings
  const totalSavings = totalOriginal - totalSubscribed;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12 smooth-fade-in">
      {/* Top Banner Indicator */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-xs font-bold text-lg-red border border-lg-red/10 mb-4 animate-bounce">
          🏆 최고의 조합 발견 완료!
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-lg-dark tracking-tight leading-snug">
          {userName}님과 비슷한 고객님이<br />
          <span className="text-lg-red">가장 만족하고 있는 가전 조합</span>이에요
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-500 font-medium">
          현재 라이프스타일과 중요 가치, 월간 적정 예산을 반영하여 설계되었습니다.
        </p>
      </div>

      {/* AI Personalized Report Summary Section */}
      <div className="bg-gradient-to-br from-white to-[#FAF6F7] rounded-[40px] p-8 md:p-10 shadow-2xl shadow-black/5 border border-lg-red/10 mb-10 relative overflow-hidden">
        {/* Decorative ambient bubble */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-lg-pink-pink/40 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-lg-red text-white flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <span className="text-sm font-black text-lg-red uppercase tracking-wider">
            LG AI 라이프스타일 분석 리포트
          </span>
        </div>

        {isLoadingAi ? (
          /* Sleek loading state for server-side Gemini API call */
          <div className="py-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lg-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-lg-red"></span>
              </span>
              <p className="text-sm font-bold text-lg-red">
                LG AI 라이브 큐레이터가 {userName}님의 답변을 심층 해독하고 가치관을 연결하는 중입니다...
              </p>
            </div>
            <div className="space-y-2.5">
              <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
              <div className="h-4 bg-gray-100 rounded-full w-[94%] animate-pulse" />
              <div className="h-4 bg-gray-100 rounded-full w-[88%] animate-pulse" />
              <div className="h-4 bg-[#F2EBEC] rounded-full w-[60%] animate-pulse" />
            </div>
          </div>
        ) : (
          /* Actual message rendering */
          <div className="relative z-10">
            <div className="text-sm md:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
              {personalizedMessage}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span>MODEL: Hyper-Personalized Gemini-3.5 Curation API</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF50] fill-[#4CAF50]/10" />
                LG전자 공식 데이터 연동 보증
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Product Cards List */}
      <h3 className="text-lg font-extrabold text-[#222222] mb-5 px-1 flex items-center gap-2">
        <span className="w-1.5 h-4 bg-lg-red rounded-full" />
        {userName}님 맞춤 추천 핵심 가전 ({recommendedProducts.length}종)
      </h3>

      <div className="space-y-6 mb-10">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl shadow-black/5 hover:scale-[1.01] transition-all duration-300 md:flex animate-fade-in"
          >
            {/* Product Image section with specific referrer policy */}
            <div className="md:w-2/5 relative h-56 md:h-auto min-h-[180px] bg-gray-50 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Premium Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-[11px] font-extrabold backdrop-blur-md bg-black/50 text-white rounded-full uppercase tracking-wider">
                  LG Objet Collection
                </span>
              </div>
            </div>

            {/* Product Details right side */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                {/* Horizontal tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-lg-gray text-gray-500 font-bold text-[10px] rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 bg-[#FFF0F2] text-lg-red font-bold text-[10px] rounded-md">
                    {careChoiceLabel}
                  </span>
                </div>

                {/* Name */}
                <h4 className="text-lg md:text-xl font-black text-lg-dark leading-tight mb-2">
                  {product.name}
                </h4>

                {/* Prices */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl md:text-2xl font-black text-lg-dark">
                    월 {product.monthlyFee.toLocaleString()}원
                  </span>
                  {product.originalFee && (
                    <span className="text-xs font-bold text-gray-400 line-through">
                      월 {product.originalFee.toLocaleString()}원
                    </span>
                  )}
                  <span className="text-xs font-black text-lg-accent px-1.5 py-0.5 rounded bg-pink-50">
                    구독 특가
                  </span>
                </div>

                {/* Rating and review info */}
                <div className="flex items-center gap-1 mb-5 text-gray-400 text-xs font-bold">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-lg-dark">{product.rating}</span>
                  <span className="text-gray-300">|</span>
                  <span>누적 실사용 리뷰 {product.reviewCount.toLocaleString()}건</span>
                </div>

                {/* Specs checked list */}
                <div className="bg-[#FAF8F8] p-4 rounded-xl space-y-2 mb-6 border border-gray-100">
                  {product.specs.map((spec, sidx) => (
                    <div key={sidx} className="flex items-start gap-2 text-xs font-bold text-gray-600">
                      <span className="text-lg-red mt-0.5 font-bold">✔</span>
                      <p className="leading-normal">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Buttons targeting official store */}
              <a
                href={`${product.officialsLink}?referrer=aistudio-lg-curation`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-lg-dark hover:bg-black text-white text-center font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-black/10 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>LG 공식몰에서 혜택 받고 구독하기</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Budget Summary Card to lower anxiety */}
      <div className="bg-white rounded-[40px] p-8 md:p-10 border-2 border-dashed border-gray-150 shadow-2xl shadow-black/5 mb-8">
        <h4 className="text-sm font-extrabold text-gray-400 tracking-wider mb-4 uppercase">
          월 예상 구독 수납 청구서 요약
        </h4>
        <div className="space-y-3.5">
          <div className="flex justify-between text-sm text-gray-500 font-bold">
            <span>추천 가전 패키지 원가</span>
            <span className="line-through">월 {totalOriginal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm text-lg-red font-bold">
            <span>LG 구독 결합 혜택 및 장기 할인</span>
            <span>- 월 {totalSavings.toLocaleString()}원 할인</span>
          </div>
          <hr className="border-gray-100 my-2" />
          <div className="flex justify-between items-baseline">
            <span className="text-base font-extrabold text-lg-dark">최종 월간 예상 부담액</span>
            <div className="text-right">
              <span className="text-2xl md:text-3xl font-black text-lg-red">
                월 {totalSubscribed.toLocaleString()}원
              </span>
              <p className="text-[10px] text-gray-400 font-bold mt-1">
                관리 안심 프리 케어 서비스 전체 패키지 요금 포함
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Restart/Reset Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer bg-white"
        >
          <RotateCcw className="w-4 h-4" />
          <span>다른 조건으로 다시 진단받기</span>
        </button>
        <a
          href="https://www.lge.co.kr/care-solutions"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-lg-red hover:bg-lg-red-dark text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-lg-red/15 cursor-pointer"
        >
          <span>LG 구독 공식 홈페이지 방문하기</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Extra Trust Section */}
      <div className="mt-12 text-center border-t border-gray-150 py-8">
        <div className="flex justify-center gap-3.5 mb-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-lg-red" />
            무상 안심 AS 보증
          </span>
          <span className="text-xs text-gray-200">|</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
            <Coins className="w-4 h-4 text-lg-red" />
            풍성한 제휴 카드 추가 세이프링
          </span>
          <span className="text-xs text-gray-200">|</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
            <Heart className="w-4 h-4 text-lg-red" />
            소모품 자동 배송 알람
          </span>
        </div>
        <p className="text-[11px] text-gray-300">
          본 사이트는 LG 시그니처 및 라이프케어 구독 컨셉 가이드라인을 소개하기 위한 모바일 특화 가상 기획 랜딩페이지이며, 실제 정식 약관은 LG 공식몰 청약에서 진행됩니다.
        </p>
      </div>
    </div>
  );
}
