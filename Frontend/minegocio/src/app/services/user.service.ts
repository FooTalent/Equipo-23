import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';
import { LoginValues } from '../models/loginValues.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  registerUser(registerValues: RegisterValues) {
    return this.http.post(`${this.apiUrl}/register`, {
      first_name: registerValues.firstName,
      last_name: registerValues.lastName,
      age: registerValues.age,
      email: registerValues.email,
      password: registerValues.password,
      rol: registerValues.role
    });
  }

  verifyRegisterCode(code: string) {
    return this.http.post(`${this.apiUrl}/verify-code`, { code });
  }

  loginUser(loginValues: LoginValues) {
    return this.http.post(`${this.apiUrl}/login`, {	
      email: loginValues.email,
      password: loginValues.password
    },{
      withCredentials: true
    });
  }

}