import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';
import { LoginValues } from '../models/loginValues.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  registerUser(formValues: RegisterValues) {
    return this.http.post('http://localhost:3000/register', {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    });
  }

  loginUser(formValues: LoginValues) {
    return this.http.post('http://localhost:3000/login', {
      email: formValues.email,
      password: formValues.password
    });
  }

}
