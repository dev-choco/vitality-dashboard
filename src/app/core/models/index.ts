export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
}

export interface UserInfo {
  email: string;
  name: string;
  role: string;
}

export interface Food {
  id: number;
  name: string;
  slug: string;
  categoryName: string;
  categoryIcon: string;
  imageUrl: string;
  primaryBenefit: string;
  consumptionSuggestion: string;
}

export interface FoodDetail {
  id: number;
  name: string;
  slug: string;
  category: FoodCategory;
  description: string;
  imageUrl: string;
  caloriesPer100g: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  benefits: BenefitItem[];
  consumptionTips: string;
}

export interface BenefitItem {
  icon: string;
  text: string;
}

export interface FoodCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Recipe {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  prepTimeMin: number;
  budgetTag: string;
  calories: number;
  goalTag: string;
}

export interface RecipeDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  prepTimeMin: number;
  difficulty: string;
  budgetTag: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  goalTags: string;
  mealType: string;
  instructions: string;
  ingredients: IngredientItem[];
  createdAt: string;
}

export interface IngredientItem {
  foodId: number;
  foodName: string;
  foodSlug: string;
  quantity: string;
  unit: string;
}

export interface Myth {
  id: number;
  mythText: string;
  realityText: string;
  category: string;
}

export interface MythDetail {
  id: number;
  mythText: string;
  realityText: string;
  mythExplanation: string;
  realityExplanation: string;
  category: string;
  imageUrl: string;
  scientificSource: string;
  createdAt: string;
}

export interface Goal {
  id?: number;
  slug: string;
  name: string;
  icon: string;
  description: string;
  colorClass: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface FoodCreateRequest {
  name: string;
  categoryId: number;
  description: string;
  imageUrl: string;
  caloriesPer100g: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  benefits: string;
  consumptionTips: string;
}

export interface RecipeCreateRequest {
  title: string;
  description: string;
  imageUrl: string;
  prepTimeMin: number;
  difficulty: string;
  budgetTag: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  goalTags: string;
  mealType: string;
  instructions: string;
  ingredients: { foodId: number; quantity: string; unit: string }[];
}

export interface MythCreateRequest {
  mythText: string;
  realityText: string;
  mythExplanation: string;
  realityExplanation: string;
  category: string;
  imageUrl: string;
  scientificSource: string;
}
