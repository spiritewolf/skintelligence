export type SkincareProduct = {
  id: string;
  name: string;
  description: string;
  link?: string | null;
  category: SkincareCategory;

  concerns?: string[] | null;
  brand?: string | null;
  recommendationNote?: string | null;
};

export enum SkincareCategory {
  CLEANSER = 'CLEANSER',
  SERUM = 'SERUM',
  MOISTURIZER = 'MOISTURIZER',
  SUNSCREEN = 'SUNSCREEN',
}

export type SkincareRecommendation = {
  id: string;
  userId: string;
  products: SkincareProduct[];
};

export type QuestionnaireResponse = {
  questionId: string;
  answer: string;
};
