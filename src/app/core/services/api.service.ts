import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Food, FoodDetail, FoodCategory, FoodCreateRequest,
  Recipe, RecipeDetail, RecipeCreateRequest,
  Myth, MythDetail, MythCreateRequest,
  Goal, PageResponse
} from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // Foods
  getFoods(search?: string, categoryId?: number): Observable<Food[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (categoryId) params = params.set('categoryId', categoryId);
    return this.http.get<Food[]>('foods', { params });
  }

  getFoodById(id: number): Observable<FoodDetail> { return this.http.get<FoodDetail>(`foods/${id}`); }

  createFood(data: FoodCreateRequest): Observable<FoodDetail> { return this.http.post<FoodDetail>('foods', data); }

  updateFood(id: number, data: FoodCreateRequest): Observable<FoodDetail> { return this.http.put<FoodDetail>(`foods/${id}`, data); }

  deleteFood(id: number): Observable<void> { return this.http.delete<void>(`foods/${id}`); }

  // Categories
  getCategories(): Observable<FoodCategory[]> { return this.http.get<FoodCategory[]>('foods/categories'); }

  createCategory(data: { name: string; icon: string }): Observable<FoodCategory> { return this.http.post<FoodCategory>('foods/categories', data); }

  updateCategory(id: number, data: { name: string; icon: string }): Observable<FoodCategory> { return this.http.put<FoodCategory>(`foods/categories/${id}`, data); }

  deleteCategory(id: number): Observable<void> { return this.http.delete<void>(`foods/categories/${id}`); }

  // Recipes
  getRecipes(goal?: string, budget?: string, mealType?: string, page = 0, size = 20): Observable<PageResponse<Recipe>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (goal) params = params.set('goal', goal);
    if (budget) params = params.set('budget', budget);
    if (mealType) params = params.set('mealType', mealType);
    return this.http.get<PageResponse<Recipe>>('recipes', { params });
  }

  getRecipeById(id: number): Observable<RecipeDetail> { return this.http.get<RecipeDetail>(`recipes/${id}`); }

  createRecipe(data: RecipeCreateRequest): Observable<RecipeDetail> { return this.http.post<RecipeDetail>('recipes', data); }

  updateRecipe(id: number, data: RecipeCreateRequest): Observable<RecipeDetail> { return this.http.put<RecipeDetail>(`recipes/${id}`, data); }

  deleteRecipe(id: number): Observable<void> { return this.http.delete<void>(`recipes/${id}`); }

  // Myths
  getMyths(category?: string, page = 0, size = 20): Observable<PageResponse<Myth>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (category) params = params.set('category', category);
    return this.http.get<PageResponse<Myth>>('myths', { params });
  }

  getMythById(id: number): Observable<MythDetail> { return this.http.get<MythDetail>(`myths/${id}`); }

  createMyth(data: MythCreateRequest): Observable<MythDetail> { return this.http.post<MythDetail>('myths', data); }

  updateMyth(id: number, data: MythCreateRequest): Observable<MythDetail> { return this.http.put<MythDetail>(`myths/${id}`, data); }

  deleteMyth(id: number): Observable<void> { return this.http.delete<void>(`myths/${id}`); }

  // Goals
  getGoals(): Observable<Goal[]> { return this.http.get<Goal[]>('goals'); }

  createGoal(data: Partial<Goal>): Observable<Goal> { return this.http.post<Goal>('goals', data); }

  updateGoal(id: number, data: Partial<Goal>): Observable<Goal> { return this.http.put<Goal>(`goals/${id}`, data); }

  deleteGoal(id: number): Observable<void> { return this.http.delete<void>(`goals/${id}`); }
}
