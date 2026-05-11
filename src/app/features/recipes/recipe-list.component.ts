import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Recipe, Food, FoodCategory } from '../../core/models';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  recipes = signal<Recipe[]>([]);
  foods = signal<Food[]>([]);
  editingId = signal<number | null>(null);
  showForm = false;
  loading = false;

  form = this.fb.group({
    title: ['', Validators.required], description: [''], imageUrl: [''],
    prepTimeMin: [15], difficulty: ['Fácil'], budgetTag: ['bajo'],
    calories: [0], proteinG: [0], carbsG: [0], fatG: [0],
    goalTags: [''], mealType: [''], instructions: [''],
  });

  ngOnInit() { this.loadData(); this.api.getFoods().subscribe(f => this.foods.set(f)); }

  loadData() { this.api.getRecipes(undefined, undefined, undefined, 0, 50).subscribe(r => this.recipes.set(r.content)); }

  openCreate() { this.editingId.set(null); this.form.reset({ prepTimeMin: 15, difficulty: 'Fácil', budgetTag: 'bajo', calories: 0, proteinG: 0, carbsG: 0, fatG: 0 }); this.showForm = true; }

  editRecipe(recipe: Recipe) {
    this.api.getRecipeById(recipe.id).subscribe(r => {
      this.editingId.set(r.id);
      this.form.patchValue({
        title: r.title, description: r.description, imageUrl: r.imageUrl,
        prepTimeMin: r.prepTimeMin, difficulty: r.difficulty, budgetTag: r.budgetTag,
        calories: r.calories, proteinG: r.proteinG, carbsG: r.carbsG, fatG: r.fatG,
        goalTags: r.goalTags, mealType: r.mealType, instructions: r.instructions,
      });
      this.showForm = true;
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;
    const data = { ...this.form.value, ingredients: [] } as any;
    const req = this.editingId() ? this.api.updateRecipe(this.editingId()!, data) : this.api.createRecipe(data);
    req.subscribe({ next: () => { this.showForm = false; this.loadData(); this.loading = false; }, error: () => this.loading = false });
  }

  deleteRecipe(id: number) { if (!confirm('¿Eliminar esta receta?')) return; this.api.deleteRecipe(id).subscribe(() => this.loadData()); }
}
