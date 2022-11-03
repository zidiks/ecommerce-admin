import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, tap, throwError } from "rxjs";
import { UserModel } from "../models/user.model";
import { Roles } from "../enums/roles.enum";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  public currentUser$: Observable<UserModel | null> = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }

  public updCurrentUser(): Observable<UserModel | null> {
    const storageUserToken: string | undefined = JSON.parse(localStorage.getItem('currentUser') || 'null')?.token;
    if (storageUserToken) {
      return this.fakeGetUser().pipe(
        tap((res: UserModel | null) => {
          this.currentUserSubject.next(res);
        })
      )
    } else {
      return of(null);
    }
  }

  public login(login: string, password: string): Observable<UserModel | null> {
    return this.fakeLogin(login, password)
      .pipe(map((user: UserModel | null) => {
       if (user?.role !== Roles.Client) {
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
         this.updCurrentUser().subscribe();
       }
        return user;
      }));
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    location.reload();
  }

  public softLogout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public fakeLogin(login: string, password: string): Observable<any> {
    if (login === 'zidiks' && password === '123') {
      return of({
        id: '343jn4l-34jkn343-n34kj334',
        name: 'Владимир Миронов',
        login: 'zidiks',
        role: Roles.Admin,
        token: '228',
      }).pipe(delay(200));
    } else {
      return throwError({
        error: 'Неверный логин или пароль'
      });
    }
  }

  public fakeGetUser(): Observable<any> {
    const token: string | undefined = JSON.parse(localStorage.getItem('currentUser') || 'null')?.token;
    if (token === '228') {
      return of ({
        id: '343jn4l-34jkn343-n34kj334',
        name: 'Владимир Миронов',
        login: 'zidiks',
        role: Roles.Admin,
      });
    } else {
      return throwError({
        error: 'Неверный ключ доступа'
      });
    }
  }

}
