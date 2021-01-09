import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginTrackerError } from '../helpers/LoginTrackerError';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/User';
import { LocalStoragePersistenceService } from './local-storage-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'https://localhost:5001/api/login/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private localStoragePersistenceService: LocalStoragePersistenceService
  ) { }

  login(pessoa: User): Observable<User | LoginTrackerError> {
    return this.http.post<User>(this.loginUrl, pessoa, this.httpOptions)
      .pipe(
        retry(1),
        catchError(error => this.handleHttpError(error))
      );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<LoginTrackerError> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      let dataError = new LoginTrackerError();
      dataError.errorNumber = 100;
      dataError.message = error.statusText;
      dataError.friendlyMessage = "An error occurred while trying to Login. Try again.";
      return throwError(dataError);
    }
  }

  saveJWTtokenInLocalStorage(token: string) {
    this.localStoragePersistenceService.set("token", token);
  }
}
