import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs"
import { JWTService } from "./jwt.service";
import { Login } from "../interfaces/login";
import { Registration } from '../interfaces/registration';
import BankAccount from "../interfaces/bankAccounts";
import BankAccounts from "../interfaces/bankAccounts";


export interface User {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  }
  email: string;
  bankAccounts: BankAccount[]
}

@Injectable({ providedIn: 'root' })
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

  register(registrationData: Registration): Observable<any> {
    return this.http.post<any>('/api/register', registrationData)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(input: Login): Observable<any> {
    return this.http.post<{ user: User, token: string }>('/api/login', input)
      .pipe(
        tap(res => this.jwtSrv.setToken(res.token)),
        tap(() => this.fetchUser()),
        map(
          (res: any) => { res.user },
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
    this.http.get<User>('/api/users/profile')
      .pipe(
        catchError(_ => {
          this.jwtSrv.removeToken();
          return of(null);
        })
      )
      .subscribe((user: any) => {
        this._currentUser$.next(user);
      })
  }
}


