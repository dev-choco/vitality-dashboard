import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'alimentos', loadComponent: () => import('./features/foods/food-list.component').then(m => m.FoodListComponent) },
      { path: 'categorias', loadComponent: () => import('./features/categories/category-list.component').then(m => m.CategoryListComponent) },
      { path: 'recetas', loadComponent: () => import('./features/recipes/recipe-list.component').then(m => m.RecipeListComponent) },
      { path: 'mitos', loadComponent: () => import('./features/myths/myth-list.component').then(m => m.MythListComponent) },
      { path: 'objetivos', loadComponent: () => import('./features/goals/goal-list.component').then(m => m.GoalListComponent) },
      { path: 'perfil', loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
