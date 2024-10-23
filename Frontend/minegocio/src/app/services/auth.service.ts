import { inject, Injectable, signal } from '@angular/core';
import { LoginValues } from '../models/loginValues.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseApiService } from './baseApi.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  constructor(private router: Router) {
    super();
  }

  private http = inject(HttpClient);

  apiUrl = import.meta.env['NG_APP_API_URL'];

  async handleLogout() {
    this.logout();
    await this.router.navigate(['/login']); 
  }

  loginUser(loginValues: LoginValues) {
    return this.http.post(
      `${this.apiUrl}/api/sessions/login`,
      {
        email: loginValues.email,
        password: loginValues.password,
      },
      {
        withCredentials: true,
      }
    );
  }

  setToken(token: string) {
    localStorage.setItem('user_token', token);
  }

  removeToken() {
    localStorage.removeItem('user_token');
  }

  expirationCheck() {
    return this.http.get(`${this.apiUrl}/api/sessions/current`, {
      headers: this.getHeaders(),
    });
  }

  isLoggedIn() {
    if (!!localStorage.getItem('user_token')) {
      this.isLoggedInSignal.update((value) => true);
    } else {
      this.isLoggedInSignal.update((value) => false);
    }
  }

  isLoggedInSignal = signal(false);
}
