import { Product, Question } from "./types";

export const LG_PRODUCTS: Product[] = [
  {
    id: "purifier",
    name: "LG 오브제컬렉션 정수기 (듀얼 위생형)",
    category: "purifier",
    monthlyFee: 39900,
    originalFee: 44900,
    imageUrl: "https://images.unsplash.com/photo-1585837575652-267bec74a116?auto=format&fit=crop&q=80&w=400", // high quality modern water/kitchen image
    tags: ["물 구매 해방", "위생관리 특화", "미니멀 주방"],
    specs: ["100% 고온 직수관 자동 살균", "미세플라스틱/고온 살균 필터", "슬림한 빌트인 공간 인테리어 디자인"],
    rating: 4.9,
    reviewCount: 2420,
    officialsLink: "https://www.lge.co.kr/care-solutions/water-purifier"
  },
  {
    id: "wash-tower",
    name: "LG 트롬 오브제컬렉션 워시타워",
    category: "wash-tower",
    monthlyFee: 54900,
    originalFee: 64900,
    imageUrl: "https://images.unsplash.com/photo-1545173168-9f19472ef7f4?auto=format&fit=crop&q=80&w=400", // modern washer / laundry room
    tags: ["세탁공간 혁신", "신혼부부 베스트", "인텔리전트 케어"],
    specs: ["세탁 25kg + 건조 21kg 일체형", "인공지능 DD 모터 코스 맞춤 추천", "원바디 직관적 터치 패널 설계"],
    rating: 4.9,
    reviewCount: 1840,
    officialsLink: "https://www.lge.co.kr/washers/wash-tower"
  },
  {
    id: "vacuum",
    name: "LG 코드제로 오브제컬렉션 로봇청소기",
    category: "vacuum",
    monthlyFee: 42900,
    originalFee: 47900,
    imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=400", // modern clean home interior
    tags: ["매일 바닥 해방", "반려동물 가정 추천", "스마트 오토케어"],
    specs: ["대용량 먼지 자동 비움 올인원타워", "AI 비행센서 장애물 충돌 방지", "초강력 자이로스코프 흡입 & 물걸레"],
    rating: 4.8,
    reviewCount: 1152,
    officialsLink: "https://www.lge.co.kr/vacuum-cleaners/robot-cleaner"
  },
  {
    id: "air-purifier",
    name: "LG 퓨리케어 오브제컬렉션 공기청정기",
    category: "air-purifier",
    monthlyFee: 34900,
    originalFee: 39900,
    imageUrl: "https://images.unsplash.com/photo-1622397331631-984f4cfd1396?auto=format&fit=crop&q=80&w=400", // bright living room with clear air
    tags: ["미세먼지 완벽 방어", "펫 모드 탑재", "아이 안심 공간"],
    specs: ["360도 항균/항바이러스 토탈 필터", "반려동물 맞춤형 털/냄새 집중 흡입", "실시간 공기 질 인공지능 상태 표시"],
    rating: 4.9,
    reviewCount: 1540,
    officialsLink: "https://www.lge.co.kr/air-purifiers"
  },
  {
    id: "dishwasher",
    name: "LG 디오스 오브제컬렉션 식기세척기",
    category: "dishwasher",
    monthlyFee: 45900,
    originalFee: 51900,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400", // premium kitchen sink / dining
    tags: ["설거지 해방", "기름때 완벽 제거", "위생 스팀 케어"],
    specs: ["100도 트루스팀 살균 및 미세 입자 세척", "저소음/저진동 스마트 인버터 DD 모터", "세척 완료 시 자동 문열림 건조 시스템"],
    rating: 4.8,
    reviewCount: 965,
    officialsLink: "https://www.lge.co.kr/dishwashers"
  },
  {
    id: "styler",
    name: "LG 스타일러 오브제컬렉션 (슬림스팀)",
    category: "styler",
    monthlyFee: 49900,
    originalFee: 57900,
    imageUrl: "https://images.unsplash.com/photo-1481437156560-3205a6a55735?auto=format&fit=crop&q=80&w=400", // luxury wardrobe / clothes hanger
    tags: ["외출 후 세척", "바이러스 살균 케어", "정밀 습도 제어"],
    specs: ["특허받은 무빙행어 양방향 진동 먼지 제거", "트루스팀 저온 제습 건조 의류 케어", "정밀 바지 칼주름 관리 최적 솔루션"],
    rating: 4.9,
    reviewCount: 1220,
    officialsLink: "https://www.lge.co.kr/styler"
  }
];

export const LG_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "요즘 집에서 가장 불편함을 느끼는 순간은 언제인가요?",
    subTitle: "현재 집안일 중 가장 해결하고 싶은 문제를 한 가지만 알려주세요.",
    options: [
      {
        value: "water",
        label: "💧 무거운 생수 사러 가고 분리배출하기 지쳐요",
        desc: "무거운 생수 주문 및 쓰레기 폭탄",
        icon: "Droplets",
        productWeight: { purifier: 5, Styler: 0 }
      },
      {
        value: "laundry",
        label: "👕 젖은 빨래 널고 무거운 세탁물 옮기기 힘들어요",
        desc: "눅눅한 건조와 복잡한 세탁 단계",
        icon: "Shirt",
        productWeight: { "wash-tower": 5 }
      },
      {
        value: "cleaning",
        label: "🧹 해도 해도 끝없는 집안 청소, 털 먼지 번거로워요",
        desc: "매일 반복되는 청소기와 걸레질 시간",
        icon: "Brush",
        productWeight: { vacuum: 5 }
      },
      {
        value: "air",
        label: "🤧 집안 미세먼지와 날리는 반려동물 털 때문에 답답해요",
        desc: "재채기와 탁한 실내 공기 스트레스",
        icon: "Wind",
        productWeight: { "air-purifier": 5 }
      },
      {
        value: "dishes",
        label: "🍽️ 요리 맛나게 하고 산더미 설거지하기 너무 비효율적이에요",
        desc: "기름기 넘치는 설거지통 마주하기",
        icon: "Grape", // custom dishes or table
        productWeight: { dishwasher: 5 }
      },
      {
        value: "clothes",
        label: "👔 정장, 코트 매번 세탁소 보내기 아깝고 먼지 보관 고민돼요",
        desc: "매주 드라이클리닝 비용과 옷 먼지 상태",
        icon: "Sparkles",
        productWeight: { styler: 5 }
      }
    ]
  },
  {
    id: 2,
    title: "현재 가구 구성과 생활 패턴은 어떠신가요?",
    subTitle: "고객님의 가구 환경과 집중 케어 요소를 선택해주세요.",
    options: [
      {
        value: "single",
        label: "🙋‍♂️ 혼자 안락하게 살아요 (1인 가구)",
        desc: "공간 효율이 극대화된 미니/에센셜 라인",
        icon: "User",
        productWeight: { purifier: 3, vacuum: 3, "air-purifier": 2 }
      },
      {
        value: "couple",
        label: "💍 달콤한 생활을 그리는 신혼부부/2인 가구",
        desc: "세련된 디자인과 인테리어 조화",
        icon: "Users",
        productWeight: { "wash-tower": 4, dishwasher: 3, styler: 3 }
      },
      {
        value: "baby",
        label: "👶 소중하고 사랑스러운 우리 아이와 함께해요",
        desc: "스팀 살균, 미세먼지 방어, 친위생 중심 필수",
        icon: "Baby",
        productWeight: { "air-purifier": 5, purifier: 4, dishwasher: 4 }
      },
      {
        value: "pet",
        label: "🐾 귀여운 댕냥이 반려동물과 함께 동거 중이에요",
        desc: "초미세 털 완벽 제거 및 냄새 탈취 강화 라인",
        icon: "Sparkles", // pet or sparkle icon
        productWeight: { "air-purifier": 5, vacuum: 4 }
      },
      {
        value: "premium",
        label: "🏛️ 고급스러운 인테리어와 최상급 성능을 원해요",
        desc: "LG 시그니처 / 프리미엄 오브제컬렉션 선호",
        icon: "Crown",
        productWeight: { styler: 4, dishwasher: 4, "wash-tower": 4 }
      }
    ]
  },
  {
    id: 3,
    title: "가전을 고를 때 어떤 가치를 가장 중요하게 보시나요?",
    subTitle: "AI 추천서와 맞춤 설득 포인트 생성에 중요한 필터입니다.",
    options: [
      {
        value: "ai-energy",
        label: "⚡ 스스로 돌아가는 AI 자동 시스템 (절전/에너지 절약)",
        desc: "전기료 부담을 크게 덜어주는 스마트 오토센서",
        icon: "Zap"
      },
      {
        value: "hygiene",
        label: "✨ 빈틈없는 강력 전방위 위생 살균과 청결",
        desc: "아이도 반려 인구도 안심하는 강력한 고온 케어",
        icon: "ShieldAlert"
      },
      {
        value: "design",
        label: "🎨 집안 공간에 가치를 더하는 명품 인테리어 오브제",
        desc: "트렌디한 프리미엄 색감과 가구 일체형 조화",
        icon: "Palette"
      },
      {
        value: "easy-smart",
        label: "📱 폰 하나로 통합 관리하는 간편 스마트폰 연동 (App)",
        desc: "LG ThinQ 앱 연동 및 업그레이드가 지속되는 UP가전",
        icon: "Smartphone"
      }
    ]
  },
  {
    id: 4,
    title: "구독 후 안심Care 관리는 어떤 방식을 원하시나요?",
    subTitle: "LG 구독의 최고 장점인 스페셜 케어 방식입니다.",
    options: [
      {
        value: "visit",
        label: "🛠️ 전문가가 다녀가는 최고의 청결 만족! (정기 방문 관리)",
        desc: "검증된 LG 헬스케어 매니저의 필터 교체 및 내외부 정밀 세척",
        icon: "CheckSquare"
      },
      {
        value: "self",
        label: "📦 내가 직접 시간 구애 없이 자유롭게! (셀프 셀프 관리)",
        desc: "필터 교체 주기에 맞추어 집 앞으로 정기 자동 배송 수령",
        icon: "Home"
      },
      {
        value: "auto",
        label: "🔄 가전이 알아서 살균을! (기기 자체 완전 자동 청약)",
        desc: "방문도 셀프 번거로움도 귀찮은 맞춤형 자동 살균 우선 지원",
        icon: "RefreshCw"
      }
    ]
  },
  {
    id: 5,
    title: "추천받고 싶으신 월간 가전 총 소요 구독료 예산은?",
    subTitle: "가벼운 월 구독 가격으로 설계하기 위한 필터링 단계입니다.",
    options: [
      {
        value: "under-40",
        label: "💰 월 3~4만원대 알뜰 소액 구독",
        desc: "꼭 필요한 1개의 최애 핵심 필수 가전 중심 타겟팅",
        icon: "Coins"
      },
      {
        value: "under-80",
        label: "💵 월 5~8만원대 스마트 결합 구독 (베스트 조합)",
        desc: "실속형 결합 할인으로 구성하는 프리미엄 1~2개 가구",
        icon: "CreditCard"
      },
      {
        value: "above-80",
        label: "🏛️ 월 9만원 이상 명품 홈 패키지 올인클루시브",
        desc: "구매보다 비용부담 없이 집에 최고 인기 2~3종 올 도어 세팅",
        icon: "Store"
      },
      {
        value: "any",
        label: "🛍️ 예산 상관없음 (나에게 제격인 최적 패키지)",
        desc: "요즘 가장 추천도가 높은 프리미엄 대세 가전 중심 설계",
        icon: "Layers"
      }
    ]
  }
];
