import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth.models';
import { tap } from 'rxjs/operators';

const isBrowser = typeof window !== 'undefined' && !!window.localStorage;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl + '/api/auth';

  private _token = signal<string | null>(isBrowser ? localStorage.getItem('token') : null);
  private _role  = signal<'USER' | 'ADMIN' | null>(isBrowser ? (localStorage.getItem('role') as any) : null);
  private _email = signal<string | null>(isBrowser ? localStorage.getItem('email') : null);

  token = computed(() => this._token());
  role  = computed(() => this._role());
  email = computed(() => this._email());
  isLoggedIn = computed(() => !!this._token());
  isAdmin = computed(() => this._role() === 'ADMIN');

  constructor(private http: HttpClient) {}

  register(payload: {email:string; password:string; username:string}) {
    return this.http.post<AuthResponse>(`${this.api}/register`, payload)
      .pipe(tap(res => this.storeAuth(res)));
  }

  login(payload: {email:string; password:string}) {
    return this.http.post<AuthResponse>(`${this.api}/login`, payload)
      .pipe(tap(res => this.storeAuth(res)));
  }

  logout() {
    if (isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    }
    this._token.set(null); this._role.set(null); this._email.set(null);
  }

  private storeAuth(res: AuthResponse) {
    if (isBrowser) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('email', res.email);
    }
    this._token.set(res.token);
    this._role.set(res.role);
    this._email.set(res.email);
  }
}
