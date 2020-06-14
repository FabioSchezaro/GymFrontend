import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private currentTokenSubject: BehaviorSubject<string>;
    public currentToken: Observable<string>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentTokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentToken')));
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentTokenValue(): string {
      return this.currentTokenSubject.value;
    }

    login(userLogin: User) {
      return this.http.post<any>(`${environment.apiUrl}user/authenticate`, userLogin).pipe(map(user => {
        if (user && user.token) {
          console.log(user);
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          localStorage.setItem('currentPeople', JSON.stringify(user.people));
          localStorage.setItem('currentToken', JSON.stringify(user.token));
          this.currentUserSubject.next(user.user);
          this.currentTokenSubject.next(user.token);
        }

        return user;
      }));
    }

    logout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentToken');
      localStorage.removeItem('currentPeople');
      this.currentUserSubject.next(null);
      this.currentTokenSubject.next(null);
      window.location.reload();
    }
}
