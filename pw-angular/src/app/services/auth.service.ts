import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs"
import { JWTService } from "./jwt.service";
import { Login } from "../interfaces/login";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(private jwtSrv: JWTService,
              private http: HttpClient,
              private router: Router) {
    if (this.jwtSrv.hasToken()) {
      this.fetchUser();
    }
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(input: Login): Observable<any> {
    return this.http.post<{user: User, token: string}>('/api/login', input)
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token)),
        tap(res => this._currentUser$.next(res.user)),
        map(
          (res: any) => {res.user},
          (err: any) => { err }
          )
      );
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/']);
  }

  private fetchUser() {
    this.http.get<User>('/api/users/me')
      .pipe(
        catchError(_ => {
          this.jwtSrv.removeToken();
          return of(null);
        })
      )
      .subscribe(user => this._currentUser$.next(user));
  }
}
