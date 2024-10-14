import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  apiUrl = import.meta.env['NG_APP_API_URL']

  registerUser(registerValues: RegisterValues) {
    return this.http.post(`${this.apiUrl}/api/sessions/register`, {
      name: registerValues.name,
      age: registerValues.age,
      email: registerValues.email,
      password: registerValues.password,
      rol: registerValues.role
    });
  }

  verifyRegisterCode(code: string) {
    return this.http.post(`${this.apiUrl}/verify-code`, { code });
  }

  // User Profile

  editFormOpen = signal(false);
  editImageFormOpen = signal(false);

  toggleEditForm() {
    this.editFormOpen.update(value => !value);
  }

  toggleEditImageForm() {
    this.editImageFormOpen.update(value => !value);
  }


}
