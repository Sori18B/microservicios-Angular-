import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterUser } from '../Interfaces/Users/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly url = 'http://localhost:5279/api/Authentication/RegisterUser';

  constructor(    private httpClient: HttpClient  ) { }

  RegisterUser(user: RegisterUser): Observable<any> {
    return this.httpClient.post<any>(this.url, user);
  }

}
