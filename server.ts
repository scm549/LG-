import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini if key exists
  let aiClient: any = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI:", e);
    }
  } else {
    console.log("No custom GEMINI_API_KEY detected, using premium rule-based fallback curation.");
  }

  // API route for LG Subscription Personal Curation
  app.post("/api/recommend", async (req, res) => {
    try {
      const { name, q1, q2, q3, q4, q5 } = req.body;
      const userName = name || "고객";

      const prompt = `
        고객 이름: ${userName}
        Q1 가전 문제상황 (가장 불편한 일상): ${q1 || "해당 없음"}
        Q2 가구원 구성 및 라이프스타일: ${q2 || "해당 없음"}
        Q3 가전 선택 시 핵심 가치: ${q3 || "해당 없음"}
        Q4 케어 서비스 관리 옵션: ${q4 || "해당 없음"}
        Q5 원하는 구독료 금액대: ${q5 || "해당 없음"}
      `;

      let personalizedMessage = "";

      if (aiClient) {
        try {
          const response = await aiClient.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
              systemInstruction: `You are an expert elite LG Electronics Product Curator. Generate a professional, highly empathetic Korean curation letter for the customer.
              Address them by prompt name exactly (e.g. '${userName}님').
              Analyze their choices:
              - Cheerfully empathize with their specific Q1 home chore frustration.
              - Validate their Q2 family status (e.g. 1인 가구, 신혼부부/2인, 아이 중심, 반려동물 동거인, 프리미엄 추구).
              - Incorporate their main Q3 value focus (e.g., AI smart saving, intensive hygiene, interior aesthetics, easy app control).
              - Warmly recommend why LG Subscription is the absolute lightest, most worry-free, modern way to bring these exact appliances home. Point out their choice of Care Service (정기 방문 vs 셀프 care 배송).
              - Write exactly in the sleek Korean copywriter style of premium apps like Toss and Apple: warm emotional phrases, high visual scanability, plenty of simple spacing (use frequent newline characters \\n for clear breathing space), very polite, and inspiring.
              - Absolutely NO bullet points, NO markdown tables, and NO greeting headers or closing signatures other than an inspirational tag. Max 350-400 characters. Closing must be 'Life's Good.'`,
              temperature: 0.82
            }
          });
          personalizedMessage = response.text || "";
        } catch (genError) {
          console.error("Gemini Generation failed, falling back to rule curation:", genError);
        }
      }

      // Fallback rule curation
      if (!personalizedMessage) {
        personalizedMessage = generateCurationFallback(userName, q1, q2, q3, q4);
      }

      res.json({ message: personalizedMessage });
    } catch (error: any) {
      console.error("API Error in recommend:", error);
      res.status(500).json({ error: error.message || "Failed to curate style recommendation" });
    }
  });

  function generateCurationFallback(name: string, q1: string, q2: string, q3: string, q4: string) {
    let vibeText = "가족의 위생과 일상의 쾌적성";
    if (q2 === "single") vibeText = "나만의 여유와 미니멀하고 스마트한 공간 활용";
    if (q2 === "couple") vibeText = "감성을 더하는 아름다운 디자인 신혼 라이프";
    if (q2 === "baby") vibeText = "아이의 안심 성장을 돕는 위생 살균 홈 케어";
    if (q2 === "pet") vibeText = "털 걱정 없이 맑고 보송보송한 반려동물 에어 케어";
    if (q2 === "premium") vibeText = "공간의 가치를 극대화하는 명품 디오스 오브제";

    let benefitText = "체계적인 전문가의 정기 위생 방문 케어";
    if (q4 === "self") benefitText = "원하는 예약일에 맞춰 배송되는 간편 셀프 필터 솔루션";
    if (q4 === "auto") benefitText = "따로 신경 쓰지 않아도 가전이 스스로 가습하고 자동 수축 살균하는 원스톱 기기 케어";

    let concernText = "고장과 수리비 걱정 없는 편안함";
    if (q3 === "ai-energy") concernText = "스스로 요금을 아껴주는 지능형 절전 AI 기능";
    if (q3 === "design") concernText = "집 안 어느 공간에도 그림처럼 스며드는 우아한 색태와 오브제 핏";
    if (q3 === "easy-smart") concernText = "스마트폰 터치 한 번으로 업그레이드되는 ThinQ UP가전 기술";

    return `${name}님의 주거 공간과 생활 성향을 정밀 분석한 맞춤 레포트입니다.\n\n` +
      `일상 중 느끼셨던 소소한 가사 스트레스를 건강하고 기분 좋은 미소로 바꾸어 줄 LG 가전 맞춤 패키지를 설계해 드렸습니다.\n\n` +
      `${name}님에게 가장 최적화된 테마는 '${vibeText}' 입니다. 구독 기간 중 제공되는 ${benefitText}를 결합하면 기기 점검 부담이 제로가 됩니다.\n\n` +
      `고민하시는 점들을 해결해 드릴 '${concernText}'을 탑재하여 목돈 드는 가전 구매 비용 걱정 없이 최고의 품격을 누려보세요.\n\n` +
      `Life's Good.`;
  }

  // Create Vite or static server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LG Subscription Full-Stack dev server is running on host 0.0.0.0 at port ${PORT}`);
  });
}

startServer();
