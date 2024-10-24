import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';
import { User } from '../models/user.model';
import { BaseApiService } from './baseApi.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiService {
  constructor() {
    super();
  }

  private http = inject(HttpClient);
  apiUrl = import.meta.env['NG_APP_API_URL'];

  registerUser(registerValues: RegisterValues) {
    return this.http.post(`${this.apiUrl}/api/sessions/register`, {
      name: registerValues.name,
      last_name: registerValues.lastName,
      email: registerValues.email,
      password: registerValues.password,
    });
  }

  verifyRegisterCode(code: string) {
    return this.http.post(`${this.apiUrl}/api/sessions/verify-code`, { code });
  }

  // User Profile

  editFormOpen = signal(false);
  editImageFormOpen = signal(false);

  toggleEditForm() {
    this.editFormOpen.update((value) => !value);
  }

  toggleEditImageForm() {
    this.editImageFormOpen.update((value) => !value);
  }

  getUser() {
    return this.http.get(`${this.apiUrl}/api/users/current`, {
      headers: this.getHeaders(),
    });
  }

  updateUser(user: User) {
    return this.http.put(
      `${this.apiUrl}/api/users/current/update`,
      {
        name: user.name,
        last_name: user.lastName,
        country: user.country,
        phone: user.phone ?? undefined,
        email: user.email,
        postal_code: user.zipCode ?? undefined,
        locality: user.locality,
      },
      { headers: this.getHeaders() }
    );
  }

  updateUserPhoto(userPhoto: any) {
    const formData = new FormData();
    formData.append('photo', userPhoto);

    return this.http.put(
      `${this.apiUrl}/api/users/current/update/photo`,
      formData,
      {
        headers: this.getHeaders()
      }
    );
  }
}
