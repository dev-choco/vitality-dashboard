import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Myth } from '../../core/models';

@Component({
  selector: 'app-myth-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './myth-list.component.html',
})
export class MythListComponent implements OnInit {
  api = inject(ApiService); fb = inject(FormBuilder);
  myths = signal<Myth[]>([]); editingId = signal<number | null>(null); showForm = false; loading = false;
  form = this.fb.group({ mythText: ['', Validators.required], realityText: ['', Validators.required], mythExplanation: [''], realityExplanation: [''], category: [''], imageUrl: [''], scientificSource: [''] });

  ngOnInit() { this.loadData(); }
  loadData() { this.api.getMyths(undefined, 0, 50).subscribe(r => this.myths.set(r.content)); }
  openCreate() { this.editingId.set(null); this.form.reset(); this.showForm = true; }

  editMyth(myth: Myth) {
    this.api.getMythById(myth.id).subscribe(r => {
      this.editingId.set(r.id);
      this.form.patchValue({ mythText: r.mythText, realityText: r.realityText, mythExplanation: r.mythExplanation, realityExplanation: r.realityExplanation, category: r.category, imageUrl: r.imageUrl, scientificSource: r.scientificSource });
      this.showForm = true;
    });
  }

  save() {
    if (this.form.invalid) return; this.loading = true;
    const req = this.editingId() ? this.api.updateMyth(this.editingId()!, this.form.value as any) : this.api.createMyth(this.form.value as any);
    req.subscribe({ next: () => { this.showForm = false; this.loadData(); this.loading = false; }, error: () => this.loading = false });
  }

  deleteMyth(id: number) { if (!confirm('¿Eliminar este mito?')) return; this.api.deleteMyth(id).subscribe(() => this.loadData()); }
}
