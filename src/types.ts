export interface Product {
  id: string;
  name: string;
  category: string;
  monthlyFee: number;
  originalFee?: number;
  imageUrl: string;
  tags: string[];
  specs: string[];
  rating: number;
  reviewCount: number;
  officialsLink: string;
}

export interface Question {
  id: number;
  title: string;
  subTitle?: string;
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
  icon?: string;
  desc?: string;
  productWeight?: { [category: string]: number }; // Weights for products
}

export interface UserSelections {
  name: string;
  answers: { [questionId: number]: string };
}

export interface RecommendationResult {
  recommendedProducts: Product[];
  personalizedMessage: string;
  allProducts: Product[];
}
