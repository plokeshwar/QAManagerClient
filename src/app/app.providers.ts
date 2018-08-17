import { HTTP_INTERCEPTORS, HttpHandler } from '@angular/common/http';
import { MyInterceptor } from './common/http.intercepter';
import { ProjectService } from './shared/project/project.service';

export const customProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
  ProjectService
];

export const customPipes = [];
