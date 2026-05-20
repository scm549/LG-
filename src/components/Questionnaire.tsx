import { motion, AnimatePresence } from "motion/react";
import { Question } from "../types";
import * as Icons from "lucide-react";

interface QuestionnaireProps {
  questions: Question[];
  userName: string;
  currentStep: number;
  selectedOption: string | null;
  onSelect: (optionValue: string) => void;
  onPrev: () => void;
}

export default function Questionnaire({
  questions,
  userName,
  currentStep,
  selectedOption,
  onSelect,
  onPrev
}: QuestionnaireProps) {
  const currentQuestion = questions[currentStep];
  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  // Dynamically resolve icon from name
  const renderIcon = (iconName: string | undefined) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return <Icons.Sparkles className="w-5 h-5 text-lg-red" />;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10 smooth-fade-in">
      {/* Top Header & Pagination */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-lg-red tracking-wider">
          {userName}님의 스마트 리포트
        </span>
        <span className="text-xs font-black text-gray-400 font-mono">
          {currentStep + 1} / {questions.length} 단계 진행 중
        </span>
      </div>

      {/* Progress Bar Container: ██████░░░░ */}
      <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden mb-8 relative">
        <div
          className="h-full bg-gradient-to-r from-lg-red to-lg-accent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Slide & Fade Transition Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-black/5 border border-gray-100"
        >
          {/* Question Title & Subtext */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-extrabold text-lg-dark leading-snug tracking-tight">
              {currentQuestion.title}
            </h2>
            {currentQuestion.subTitle && (
              <p className="mt-2 text-sm text-gray-500 font-medium">
                {currentQuestion.subTitle}
              </p>
            )}
          </div>

          {/* Card Selection UI list */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => onSelect(option.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all relative flex items-center justify-between cursor-pointer group hover:lg-shadow-sm ${
                    isSelected
                      ? "bg-[#FFF0F2] border-lg-red scale-[1.015]"
                      : "bg-[#FDFDFD] border-gray-100 hover:border-gray-200"
                  }`}
                  style={{ transformOrigin: "center" }}
                >
                  <div className="flex items-center gap-4 pr-4">
                    {/* Circle icon container */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-lg-red text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-lg-pink-pink group-hover:text-lg-red"
                      }`}
                    >
                      {renderIcon(option.icon)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 leading-tight">
                        {option.label}
                      </p>
                      {option.desc && (
                        <p className="text-xs font-semibold text-gray-400 mt-1">
                          {option.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right side status */}
                  <div className="flex items-center">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-lg-red flex items-center justify-center">
                        <Icons.Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-gray-200 group-hover:border-lg-red/40 transition-colors" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          {currentStep > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-50">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <Icons.ChevronLeft className="w-4 h-4" />
                <span>이전 단계로 돌아가기</span>
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
