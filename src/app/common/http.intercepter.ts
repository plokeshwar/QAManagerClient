import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import {MatSnackBar} from '@angular/material';


@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router, private storageService: StorageService, public snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = { email: '', id: '' };
    if (token && token.email && token.id) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'x-session-email': token.email,
          'x-session-token': token.id
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
          }
        },
        error => {
          if (error.status === 401 || error.status === 403) {
            this.storageService.clearCache();
          }
          this.openSnackBar(error.error, 'Close', 'red-snackbar');
          console.log(error);
        }
      )
    );

    
  }
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 9000,
      panelClass: [className]
    });
  }
}
