import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  api = inject(ApiService);
  foodCount = signal(0);
  recipeCount = signal(0);
  mythCount = signal(0);
  categoryCount = signal(0);

  ngOnInit() {
    this.api.getFoods().subscribe(f => this.foodCount.set(f.length));
    this.api.getRecipes(undefined, undefined, undefined, 0, 1).subscribe(r => this.recipeCount.set(r.totalElements));
    this.api.getMyths(undefined, 0, 1).subscribe(r => this.mythCount.set(r.totalElements));
    this.api.getCategories().subscribe(c => this.categoryCount.set(c.length));
  }
}
