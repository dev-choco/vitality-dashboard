import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(ConfigService);
  const apiReq = req.clone({
    url: req.url.startsWith('http') ? req.url : `${config.apiUrl}/${req.url.replace(/^\//, '')}`,
  });
  return next(apiReq);
};
