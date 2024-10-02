import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';
import { LoginValues } from '../models/loginValues.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  registerUser(registerValues: RegisterValues) {
    return this.http.post('http://localhost:3000/register', {
      first_name: registerValues.firstName,
      last_name: registerValues.lastName,
      age: registerValues.age,
      email: registerValues.email,
      password: registerValues.password
    });
  }

  verifyRegisterCode(code: string) {
    return this.http.post('http://localhost:3000/verify-code', { code });
  }

  loginUser(loginValues: LoginValues) {
    return this.http.post('http://localhost:3000/login', {
      email: loginValues.email,
      password: loginValues.password
    },{
      withCredentials: true
    });
  }

}
