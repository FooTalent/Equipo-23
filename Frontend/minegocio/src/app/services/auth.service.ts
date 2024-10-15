import { inject, Injectable, signal } from '@angular/core';
import { LoginValues } from '../models/loginValues.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

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

  isLoggedIn() {
      if(!!localStorage.getItem('user_token')){
        this.isLoggedInSignal.update(value => true);
      } else {
        this.isLoggedInSignal.update(value => false);
      }
  }

  isLoggedInSignal = signal(false);

}
