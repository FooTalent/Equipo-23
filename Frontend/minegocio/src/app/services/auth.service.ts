import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { LoginValues } from '../models/loginValues.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  googleClientId = import.meta.env['NG_APP_GOOGLE_CLIENT_ID']
  private http = inject(HttpClient);

  apiUrl = import.meta.env['NG_APP_API_URL']

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

  checkUserToken() {
    return this.http.get(`${this.apiUrl}/current`, {
      withCredentials: true
    },)
  }

  startGoogleLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: this.googleClientId,
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
