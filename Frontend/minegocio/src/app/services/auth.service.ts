import { inject, Injectable, signal } from '@angular/core';
import { LoginValues } from '../models/loginValues.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('user_token')
  });

  apiUrl = import.meta.env['NG_APP_API_URL']
  

  loginUser(loginValues: LoginValues) {
    return this.http.post(`${this.apiUrl}/api/sessions/login`, {	
      email: loginValues.email,
      password: loginValues.password
    },{
      withCredentials: true
    });
  }

  setToken(token: string) {
    localStorage.setItem('user_token', token);
  }
  
  removeToken() {
    localStorage.removeItem('user_token');
  }

  expirationCheck() {
    return this.http.get(`${this.apiUrl}/api/sessions/current`, { headers: this.headers })
  }

  isLoggedIn() {
      if(!!localStorage.getItem('user_token')){
        this.isLoggedInSignal.update(value => true);
      } else {
        this.isLoggedInSignal.update(value => false);
      }
  }

  isLoggedInSignal = signal(false);

}
