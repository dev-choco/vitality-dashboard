import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { FoodCategory } from '../../core/models';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  categories = signal<FoodCategory[]>([]);
  editingId = signal<number | null>(null);
  showForm = false;
  loading = false;

  form = this.fb.group({ name: ['', Validators.required], icon: ['', Validators.required] });

  ngOnInit() { this.loadData(); }

  loadData() { this.api.getCategories().subscribe(c => this.categories.set(c)); }

  openCreate() { this.editingId.set(null); this.form.reset(); this.showForm = true; }

  editCategory(cat: FoodCategory) { this.editingId.set(cat.id); this.form.patchValue({ name: cat.name, icon: cat.icon }); this.showForm = true; }

  save() {
    if (this.form.invalid) return;
    this.loading = true;
    const req = this.editingId()
      ? this.api.updateCategory(this.editingId()!, this.form.value as any)
      : this.api.createCategory(this.form.value as any);
    req.subscribe({ next: () => { this.showForm = false; this.loadData(); this.loading = false; }, error: () => this.loading = false });
  }

  deleteCategory(id: number) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    this.api.deleteCategory(id).subscribe(() => this.loadData());
  }
}
