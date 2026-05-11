import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _mode = signal<ThemeMode>(this.loadMode());
  readonly mode = this._mode.asReadonly();

  constructor() {
    this.applyTheme(this._mode());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this._mode() === 'system') this.applyTheme('system');
    });
  }

  setMode(mode: ThemeMode) {
    this._mode.set(mode);
    localStorage.setItem('dashboard_theme', mode);
    this.applyTheme(mode);
  }

  get isDark(): boolean {
    const m = this._mode();
    return m === 'dark' || (m === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  private applyTheme(mode: ThemeMode) {
    const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  }

  private loadMode(): ThemeMode {
    const stored = localStorage.getItem('dashboard_theme');
    if (stored === 'system' || stored === 'light' || stored === 'dark') return stored;
    return 'system';
  }
}
