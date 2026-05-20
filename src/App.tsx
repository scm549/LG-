import { useState, useEffect } from "react";
import { Sparkles, Activity, ShieldCheck, Heart, ArrowRight, User } from "lucide-react";
import { LG_PRODUCTS, LG_QUESTIONS } from "./data";
import { Product, UserSelections } from "./types";
import Hero from "./components/Hero";
import Questionnaire from "./components/Questionnaire";
import ResultPage from "./components/ResultPage";

export default function App() {
  const [userName, setUserName] = useState<string>("");
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  // Result State
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [personalizedMessage, setPersonalizedMessage] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Restart diagnosis
  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendedProducts([]);
    setPersonalizedMessage("");
  };

  // Start matching flow from Hero
  const handleStart = (name: string) => {
    setUserName(name);
    setIsStarted(true);
    setCurrentStep(0);
  };

  // Option selection handling
  const handleSelectOption = (optionValue: string) => {
    const nextAnswers = { ...answers, [LG_QUESTIONS[currentStep].id]: optionValue };
    setAnswers(nextAnswers);

    // Auto-advance with visual buffer delay
    if (currentStep < LG_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 350);
    } else {
      // Finished questionnaire! Prepare results
      setTimeout(() => {
        handleSubmitAnswers(nextAnswers);
      }, 350);
    }
  };

  // Back step navigation
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Compile recommendations and call server for Gemini analysis
  const handleSubmitAnswers = async (finalAnswers: { [qId: number]: string }) => {
    setShowResult(true);
    setIsLoadingAi(true);

    // 1. Core Selection Logic
    const q1Value = finalAnswers[1];
    let primaryId = "purifier"; // fallback
    if (q1Value === "water") primaryId = "purifier";
    if (q1Value === "laundry") primaryId = "wash-tower";
    if (q1Value === "cleaning") primaryId = "vacuum";
    if (q1Value === "air") primaryId = "air-purifier";
    if (q1Value === "dishes") primaryId = "dishwasher";
    if (q1Value === "clothes") primaryId = "styler";

    // Build scores weights
    const scores: { [id: string]: number } = {};
    LG_PRODUCTS.forEach((p) => {
      scores[p.id] = p.id === primaryId ? 10 : 0;
    });

    // Weighted factors from Q2 (lifestyle profile)
    const q2Value = finalAnswers[2];
    const q2Option = LG_QUESTIONS.find((q) => q.id === 2)?.options.find((o) => o.value === q2Value);
    if (q2Option?.productWeight) {
      Object.entries(q2Option.productWeight).forEach(([cat, w]) => {
        if (scores[cat] !== undefined) {
          scores[cat] += w;
        }
      });
    }

    // Sorting candidates by relevance score
    const sortedProducts = [...LG_PRODUCTS].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

    // Limit recommendation slot based on Q5 Budget
    const q5Value = finalAnswers[5];
    let limit = 2; // standard default
    if (q5Value === "under-40") limit = 1;
    if (q5Value === "under-80") limit = 2;
    if (q5Value === "above-80" || q5Value === "any") limit = 3;

    // Assemble recommendations ensuring primary (Q1 decision tool) is always included
    const matched: Product[] = [];
    const mainProduct = LG_PRODUCTS.find((p) => p.id === primaryId);
    if (mainProduct) {
      matched.push(mainProduct);
    }

    sortedProducts.forEach((p) => {
      if (p.id !== primaryId && matched.length < limit) {
        matched.push(p);
      }
    });

    setRecommendedProducts(matched);

    // 2. Fetch Personalized curation letter from server via Gemini / Fallback
    const q1Label = LG_QUESTIONS.find((q) => q.id === 1)?.options.find((o) => o.value === q1Value)?.label || "";
    const q2Label = q2Option?.label || "";
    const q3Value = finalAnswers[3];
    const q3Label = LG_QUESTIONS.find((q) => q.id === 3)?.options.find((o) => o.value === q3Value)?.label || "";
    const q4Value = finalAnswers[4];
    const q4Label = LG_QUESTIONS.find((q) => q.id === 4)?.options.find((o) => o.value === q4Value)?.label || "";
    const q5Label = LG_QUESTIONS.find((q) => q.id === 5)?.options.find((o) => o.value === q5Value)?.label || "";

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          q1: q1Label,
          q2: q2Label,
          q3: q3Label,
          q4: q4Label,
          q5: q5Label,
        }),
      });

      if (!response.ok) {
        throw new Error("Server curation returned non-ok status");
      }

      const data = await response.json();
      if (data && data.message) {
        setPersonalizedMessage(data.message);
      } else {
        throw new Error("Data model malformed");
      }
    } catch (apiError) {
      console.warn("Using local rule compiler fallback.", apiError);
      // Fallback compilation matching server format
      let concernLabel = "최상의 위생 청결 테마";
      if (q3Value === "ai-energy") concernLabel = "스스로 아껴주는 에코 AI 절전 효율";
      if (q3Value === "design") concernLabel = "집안 공간 가치를 극대화하는 명품 오브제 가구 핏";
      if (q3Value === "easy-smart") concernLabel = "스마트폰 터치 한번으로 맞춤 케어 관리되는 ThinQ 연동 기술";

      let managementLabel = "정기 위생 검진 케어";
      if (q4Value === "self") managementLabel = "원하는 요일에 자동 발송되는 스마트 셀프 필터 솔루션";

      const fallbackText = `${userName}님의 소중한 환경과 필요 사양을 AI 라이프 큐레이터가 전면 분석한 결과 보고서입니다.\n\n` +
        `평소 일상에서 주부 가사로 겪으셨던 불편 사항들은 LG 정밀 맞춤 케어로 말끔하게 해결됩니다.\n\n` +
        `${userName}님께 제공되는 스티치 테마는 '${q2Label}' 맞춤 세팅입니다. 특히 선택해주신 ${q4Label} 시스템과 ${concernLabel} 기능을 결합하여, 무거운 초기 비용 투자 없이 월 부담 없는 가벼운 정기 가입제로 대우받는 특별함을 온전히 누리실 수 있습니다.\n\n` +
        `Life's Good.`;
      
      setPersonalizedMessage(fallbackText);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Calculations for bill representation
  const totalOriginal = recommendedProducts.reduce((sum, p) => sum + (p.originalFee || p.monthlyFee), 0);
  const totalSubscribed = recommendedProducts.reduce((sum, p) => sum + p.monthlyFee, 0);

  // Active care selection label getter
  const q4Value = answers[4];
  let careChoiceLabel = "방문 위생 케어 포함";
  if (q4Value === "self") careChoiceLabel = "셀프 필터 배송 관리";
  if (q4Value === "auto") careChoiceLabel = "기기 지능형 자가 관리";

  // Prevent background jumps on step transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep, isStarted, showResult]);

  return (
    <div className="min-h-screen bg-lg-bg flex flex-col justify-between selection:bg-lg-red/10 selection:text-lg-red text-lg-dark">
      {/* Premium Elegant Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF7F8]/85 border-b border-gray-150 py-5 px-4 md:px-12 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleReset}>
            <div className="w-8 h-8 rounded-full bg-[#A50034] flex items-center justify-center font-bold text-white text-base shadow-sm">
              L
            </div>
            <div className="flex items-baseline">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-lg-dark">
                LG Electronics
              </span>
              <span className="font-light text-base md:text-lg text-gray-400 ml-1">
                | 구독
              </span>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-500">
            <button onClick={handleReset} className="text-[#A50034] hover:opacity-80 transition-opacity cursor-pointer">맞춤추천</button>
            <a href="https://www.lge.co.kr/care-solutions" target="_blank" rel="noreferrer" className="hover:text-lg-red transition-colors">구독혜택</a>
            <a href="https://www.lge.co.kr/care-solutions" target="_blank" rel="noreferrer" className="hover:text-lg-red transition-colors">이벤트</a>
            <a href="https://www.lge.co.kr/care-solutions" target="_blank" rel="noreferrer" className="hover:text-lg-red transition-colors">고객지원</a>
          </nav>

          <div className="flex items-center gap-2 bg-[#FFF] px-3 py-1.5 rounded-full border border-gray-100 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-400 font-mono">
              ACTIVE
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center py-6">
        {!isStarted ? (
          <Hero onStart={handleStart} />
        ) : !showResult ? (
          <Questionnaire
            questions={LG_QUESTIONS}
            userName={userName}
            currentStep={currentStep}
            selectedOption={answers[LG_QUESTIONS[currentStep].id] || null}
            onSelect={handleSelectOption}
            onPrev={handlePrevStep}
          />
        ) : (
          <ResultPage
            userName={userName}
            recommendedProducts={recommendedProducts}
            personalizedMessage={personalizedMessage}
            isLoadingAi={isLoadingAi}
            totalOriginal={totalOriginal}
            totalSubscribed={totalSubscribed}
            careChoiceLabel={careChoiceLabel}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Sticky Bottom Trust Banner from Natural Tones theme */}
      <div className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200 py-5 flex flex-wrap items-center justify-center gap-6 md:gap-12 px-4 text-xs md:text-sm font-semibold text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-[#A50034] font-extrabold italic">LG Objet Collection</span>
          <span className="text-gray-600">공식 구독 추천 서비스</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-bold">★ 4.9 / 5.0</span>
          <span className="text-xs text-gray-400">(12,400+ 맞춤 만족 후기)</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-gray-700 font-bold">실시간 맞춤 구독 신청률 1위</span>
        </div>
      </div>

      {/* Modern Compact Footer */}
      <footer className="bg-[#FAF7F8] border-t border-gray-200/50 py-6 text-center text-xs text-gray-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 LG Electronics Subscription Landing Agency inside AI Studio.</p>
          <div className="flex gap-4 font-semibold text-gray-500">
            <a href="https://www.lge.co.kr" target="_blank" rel="noreferrer" className="hover:text-lg-red transition-colors">
              공식몰 가기
            </a>
            <span>•</span>
            <a href="https://www.lge.co.kr/care-solutions" target="_blank" rel="noreferrer" className="hover:text-lg-red transition-colors">
              구독 서비스 보기
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
