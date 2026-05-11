import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { apiUrlInterceptor } from './core/interceptors/api-url.interceptor';
import { ConfigService } from './core/services/config.service';
import { ThemeService } from './core/services/theme.service';

function initializeApp(config: ConfigService, theme: ThemeService) {
  return (): Promise<void> => config.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiUrlInterceptor, authInterceptor])),
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService, ThemeService], multi: true },
  ],
};
