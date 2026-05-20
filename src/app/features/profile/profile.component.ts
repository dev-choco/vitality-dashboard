import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  auth = inject(AuthService);
  theme = inject(ThemeService);
  user = this.auth.user;

  readonly themeModes: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'system', label: 'Configuración del sistema', icon: 'brightness_auto' },
    { value: 'light', label: 'Claro', icon: 'light_mode' },
    { value: 'dark', label: 'Oscuro', icon: 'dark_mode' },
  ];
}
