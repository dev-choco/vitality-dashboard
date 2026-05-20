import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _user = signal<{ email: string; name: string; role: string } | null>(null);
  readonly user = this._user.asReadonly();

  private readonly ACCESS_KEY = 'dashboard_access';
  private readonly REFRESH_KEY = 'dashboard_refresh';

  constructor() { this.loadFromStorage(); }

  private loadFromStorage() {
    const access = localStorage.getItem(this.ACCESS_KEY);
    const userData = localStorage.getItem('dashboard_user');
    if (access && userData) {
      try { this._user.set(JSON.parse(userData)); } catch { this.logout(); }
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('auth/login', request).pipe(
      tap(res => this.handleLogin(res))
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = localStorage.getItem(this.REFRESH_KEY);
    return this.http.post<LoginResponse>('auth/refresh', { refreshToken }).pipe(
      tap(res => this.handleLogin(res))
    );
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem('dashboard_user');
    this._user.set(null);
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string | null { return localStorage.getItem(this.ACCESS_KEY); }

  isAuthenticated(): boolean { return !!this.getAccessToken(); }

  isAdmin(): boolean {
    const user = this._user();
    return user?.role === 'ROLE_ADMIN';
  }

  private handleLogin(res: LoginResponse): void {
    localStorage.setItem(this.ACCESS_KEY, res.accessToken);
    localStorage.setItem(this.REFRESH_KEY, res.refreshToken);
    const userData = { email: res.email, name: res.name, role: '' };
    localStorage.setItem('dashboard_user', JSON.stringify(userData));
    this._user.set(userData);
  }
}
