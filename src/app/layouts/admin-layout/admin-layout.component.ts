import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
  user = this.auth.user;

  menuCollapsed = false;

  navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/' },
    { icon: 'egg_alt', label: 'Alimentos', route: '/alimentos' },
    { icon: 'category', label: 'Categorías', route: '/categorias' },
    { icon: 'menu_book', label: 'Recetas', route: '/recetas' },
    { icon: 'fact_check', label: 'Mitos', route: '/mitos' },
    { icon: 'flag', label: 'Objetivos', route: '/objetivos' },
  ];

  logout() { this.auth.logout(); }
}
