import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginValues } from '../models/loginValues.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor(private oAuthService: OAuthService,) { 
    if (typeof window !== 'undefined') {
      this.startGoogleLogin();
    }
  }

  loginUser(loginValues: LoginValues) {
    return this.http.post(`${this.apiUrl}/login`, {	
      email: loginValues.email,
      password: loginValues.password
    },{
      withCredentials: true
    });
  }

  startGoogleLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.googleClientId,
      redirectUri: typeof window !== 'undefined' ? window.location.origin + '' : '',
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginWithGoogle() {
    this.oAuthService.initLoginFlow();
  }

}
