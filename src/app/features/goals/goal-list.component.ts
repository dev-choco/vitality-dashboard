import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Goal } from '../../core/models';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './goal-list.component.html',
})
export class GoalListComponent implements OnInit {
  api = inject(ApiService); fb = inject(FormBuilder);
  goals = signal<Goal[]>([]); editingId = signal<number | null>(null); showForm = false; loading = false;
  form = this.fb.group({ name: ['', Validators.required], slug: ['', Validators.required], icon: ['flag'], description: [''], colorClass: ['primary'] });

  ngOnInit() { this.loadData(); }
  loadData() { this.api.getGoals().subscribe(g => this.goals.set(g)); }
  openCreate() { this.editingId.set(null); this.form.reset({ icon: 'flag', colorClass: 'primary' }); this.showForm = true; }
  editGoal(g: Goal) { this.editingId.set(g.id!); this.form.patchValue({ name: g.name, slug: g.slug, icon: g.icon, description: g.description, colorClass: g.colorClass }); this.showForm = true; }
  save() {
    if (this.form.invalid) return; this.loading = true;
    const data = this.form.value as any;
    const req = this.editingId() ? this.api.updateGoal(this.editingId()!, data) : this.api.createGoal(data);
    req.subscribe({ next: () => { this.showForm = false; this.loadData(); this.loading = false; }, error: () => this.loading = false });
  }
  deleteGoal(id: number) { if (!confirm('¿Eliminar este objetivo?')) return; this.api.deleteGoal(id).subscribe(() => this.loadData()); }
}
