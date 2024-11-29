import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { UpdateUser } from '../Interfaces/Users/UpdateUser';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private readonly API_URL: string = 'http://localhost:5279/api/Users';

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  private getAuthenticatedHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    if (!token) {
      throw new Error('Error de sesión. Por favor, vuelva a iniciar sesión.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('No autorizado - revisa el token o inicia sesión nuevamente.');
      this.authenticationService.logout();
    }
    return throwError(error);
  }

  //Consumo de metodos de la api

  getUsersList(): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    return this.httpClient.get(`${this.API_URL}/UsersList`, { headers })
    .pipe(catchError(this.handleError));
  }

  getUsersListById(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/UsersListById/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }

  getClientsList(): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    return this.httpClient.get(`${this.API_URL}/ClientsList`, { headers })
    .pipe(catchError(this.handleError));
  }

  getRepresentativesList(): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    return this.httpClient.get(`${this.API_URL}/RepresentativesList`, { headers })
    .pipe(catchError(this.handleError));
  }

  getInfoClient(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/InfoClient/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }
  getInfoRep(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/InfoRep/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }

  DeleteUser(id:number){
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.delete(`${this.API_URL}/DeleteUser/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }

  UpdateUser(data: UpdateUser): Observable<any> {
    const headers = this.getAuthenticatedHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.API_URL}/UpdateUser`, data, { headers });
  }
}
