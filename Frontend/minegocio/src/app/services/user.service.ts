import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  apiUrl = import.meta.env['NG_APP_API_URL']

  registerUser(registerValues: RegisterValues) {
    return this.http.post(`${this.apiUrl}/register`, {
      first_name: registerValues.firstName,
      last_name: registerValues.lastName,
      email: registerValues.email,
      password: registerValues.password,
      rol: registerValues.role
    });
  }

  verifyRegisterCode(code: string) {
    return this.http.post(`${this.apiUrl}/verify-code`, { code });
  }

}
