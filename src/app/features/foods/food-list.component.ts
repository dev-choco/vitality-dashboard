import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Food, FoodCategory } from '../../core/models';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './food-list.component.html',
})
export class FoodListComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  foods = signal<Food[]>([]);
  categories = signal<FoodCategory[]>([]);
  editingId = signal<number | null>(null);
  showForm = false;
  loading = false;
  error = '';

  form = this.fb.group({
    name: ['', Validators.required],
    categoryId: [1, Validators.required],
    description: [''],
    imageUrl: [''],
    caloriesPer100g: [0],
    proteinG: [0],
    carbsG: [0],
    fatG: [0],
    fiberG: [0],
    benefits: [''],
    consumptionTips: [''],
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getFoods().subscribe(f => this.foods.set(f));
    this.api.getCategories().subscribe(c => this.categories.set(c));
  }

  openCreate() {
    this.editingId.set(null);
    this.form.reset({ categoryId: 1, caloriesPer100g: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0, benefits: '', consumptionTips: '', name: '', description: '', imageUrl: '' });
    this.showForm = true;
  }

  editFood(food: Food) {
    this.api.getFoodById(food.id).subscribe(f => {
      this.editingId.set(f.id);
      this.form.patchValue({
        name: f.name, categoryId: f.category.id, description: f.description,
        imageUrl: f.imageUrl, caloriesPer100g: f.caloriesPer100g,
        proteinG: f.proteinG, carbsG: f.carbsG, fatG: f.fatG,
        fiberG: f.fiberG, benefits: f.benefits.map(b => b.text).join(','),
        consumptionTips: f.consumptionTips,
      });
      this.showForm = true;
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const data = this.form.value as any;

    const req = this.editingId()
      ? this.api.updateFood(this.editingId()!, data)
      : this.api.createFood(data);

    req.subscribe({
      next: () => { this.showForm = false; this.loadData(); this.loading = false; },
      error: (err) => { this.error = err.error?.message || 'Error'; this.loading = false; },
    });
  }

  deleteFood(id: number) {
    if (!confirm('¿Eliminar este alimento?')) return;
    this.api.deleteFood(id).subscribe(() => this.loadData());
  }
}
