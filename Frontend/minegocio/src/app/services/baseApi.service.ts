// src/app/core/services/base-api.service.ts
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private tokenKey = 'user_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  protected getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  protected getFileHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }
}