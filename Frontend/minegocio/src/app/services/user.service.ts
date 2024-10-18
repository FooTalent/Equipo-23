import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterValues } from '../models/registerValues.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  apiUrl = import.meta.env['NG_APP_API_URL']
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('user_token')
  });

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
    this.editFormOpen.update(value => !value);
  }

  toggleEditImageForm() {
    this.editImageFormOpen.update(value => !value);
  }

  getUser() {
    return this.http.get(`${this.apiUrl}/api/users/current`, { headers: this.headers });
  }

  updateUser(user: User) {
    return this.http.put(`${this.apiUrl}/api/users/current/update`, {
      name: user.name,
      last_name: user.lastName,
      country: user.country,
      phone: user.phone ?? 0,
      email: user.email,
      locality: user.locality,
    }, { headers: this.headers });
  }

  updateUserPhoto(userPhoto: any) {
    const formData = new FormData();
    formData.append('photo', userPhoto);
  
    return this.http.put(`${this.apiUrl}/api/users/current/update/photo`, formData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('user_token'),
      }),
    });
  }

}
