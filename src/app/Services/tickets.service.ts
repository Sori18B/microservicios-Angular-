import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreatePreliminaryTicket } from '../Interfaces/Tickets/CreatePreliminaryTicket';
import { CompleteTicket } from '../Interfaces/Tickets/CompleteTicket';
import { UpdateTicket } from '../Interfaces/Tickets/UpdateTicket';
import { UpdateRepAssign } from '../Interfaces/Tickets/UpdateRepAssign';
import { ReOpenTicket } from '../Interfaces/Tickets/ReOpenTicket';

import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly API_URL: string = 'http://localhost:5122/api/Tickets';
  private readonly token = 'auth_token';

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthenticatedHeaders(): HttpHeaders {
    const token = this.authenticationService.getToken();
    if (!token) {
      throw new Error('Error de sesión. Por favor, vuelva a iniciar sesión.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('No autorizado - revisa el token o inicia sesión nuevamente.');
      this.authenticationService.logout();
    }
    return throwError(error);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.token);
      return token;
    }
    return null;
  }

  getUserIDFromToken(): number {
    const token = this.getToken();
    if (!token) {
      return 0;
    }
    try {
      const decodedToken = jwtDecode(token) as any;
      return decodedToken.UserID || 0;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return 0;
    }
  }

  //Consumo de metodos de la api

  getTicketList(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/TicketsList/${id}`, {params, headers })
      .pipe(catchError(this.handleError));
  }

  getTicketListById(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/TicketListById/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }

  getTicketListByStatus(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/TicketListByStatus/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }

  getTicketListByRepresentative(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/TicketListByRepresentative/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
  }

  //no se usará mucho problema
  getTicketListByClientID(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    return this.httpClient.get(`${this.API_URL}/TicketListByClientID/${id}`, { headers })
    .pipe(catchError(this.handleError));
  }

  getTicketHistoryList(id: number): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    const params = new HttpParams().set('ID', id.toString());
    return this.httpClient.get(`${this.API_URL}/TicketHistoryList/${id}`, { params, headers })
    .pipe(catchError(this.handleError));
}

  getTicketAssignmentList(id: number): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  const params = new HttpParams().set('ID', id.toString());
  return this.httpClient.get(`${this.API_URL}/TicketAssignmentList/${id}`, { params, headers })
  .pipe(catchError(this.handleError));
}

getTicketsTotal(id: number): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  const params = new HttpParams().set('ID', id.toString());
  return this.httpClient.get(`${this.API_URL}/TicketsTotal/${id}`, {params, headers })
  .pipe(catchError(this.handleError));
}

getOpenTicketsTotal(id: number): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  const params = new HttpParams().set('ID', id.toString());
  return this.httpClient.get(`${this.API_URL}/OpenTicketsTotal/${id}`, {params, headers })
  .pipe(catchError(this.handleError));
}

getTicketsInProcessTotal(id: number): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  const params = new HttpParams().set('ID', id.toString());
  return this.httpClient.get(`${this.API_URL}/TicketsInProcessTotal/${id}`, {params, headers })
  .pipe(catchError(this.handleError));
}

getClosedTicketsTotal(id: number): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  const params = new HttpParams().set('ID', id.toString());
  return this.httpClient.get(`${this.API_URL}/ClosedTicketsTotal/${id}`, {params, headers })
  .pipe(catchError(this.handleError));
}

getPreliminaryTicketsList(): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  return this.httpClient.get(`${this.API_URL}/PreliminaryTicketsList`, { headers })
  .pipe(catchError(this.handleError));
}

getPreliminaryTicketById(id: number): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  const params = new HttpParams().set('ID', id.toString());
  return this.httpClient.get(`${this.API_URL}/PreliminaryTicketById/${id}`, { params, headers })
  .pipe(catchError(this.handleError));
}

CreatePreliminaryTicket(data: CreatePreliminaryTicket): Observable<any> {
  const headers = this.getAuthenticatedHeaders();
  return this.httpClient
    .post<any>(`${this.API_URL}/CreatePreliminaryTicket`, data, { headers })
    .pipe(catchError(this.handleError));
}

CompleteTicket(data: CompleteTicket): Observable<any> {
    const headers = this.getAuthenticatedHeaders();
    return this.httpClient.post<any>(`${this.API_URL}/CompleteTicket`, data, { headers })
    .pipe(catchError(this.handleError));
    }

UpdateTicket(data: UpdateTicket): Observable<any> {
  const headers = this.getAuthenticatedHeaders().set('Content-Type', 'application/json');
  return this.httpClient.put<any>(`${this.API_URL}/UpdateTicket`, data, { headers });
}

UpdateRepAssign(data: UpdateRepAssign): Observable<any> {
  const headers = this.getAuthenticatedHeaders().set('Content-Type', 'application/json');
  return this.httpClient.put<any>(`${this.API_URL}/UpdateRepAssign`, data, { headers });
}

ReOpenTicket(data: ReOpenTicket): Observable<any> {
  const headers = this.getAuthenticatedHeaders().set('Content-Type', 'application/json');
  return this.httpClient.put<any>(`${this.API_URL}/ReOpenTicket`, data, { headers });
}

}
