import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly url = 'http://localhost:5279/api/Authentication/Login';
  private readonly token = 'auth_token';

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  Login(Email: string, Password: string): Observable<any> {
    const body = { Email, Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post(this.url, body, { headers })
      .pipe(catchError(this.handleError));
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.token, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.token);
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.token);
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('No autorizado - revisa el token o inicia sesión nuevamente.');
      this.logout();
    }
    return throwError(error);
  }

  getMenuFromToken(): any[] {
    const token = this.getToken();
    if (!token) return [];
    const decodedToken = jwtDecode(token) as any;
    return decodedToken.menu ? JSON.parse(decodedToken.menu) : [];
  }
}
