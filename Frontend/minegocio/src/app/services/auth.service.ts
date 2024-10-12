import { inject, Injectable, signal } from '@angular/core';
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

  setToken(token: string) {
    if(typeof window !== 'undefined') {
      localStorage.setItem('user_token', token);
    }
    
  }
  
  removeToken() {
    if(typeof window !== 'undefined') {
      localStorage.removeItem('user_token');
    return;
    }
  }

  isLoggedIn() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if(!!localStorage.getItem('user_token')){
        this.isLoggedInSignal.update(value => true);
      } else {
        this.isLoggedInSignal.update(value => false);
      }
    }
  }

  isLoggedInSignal = signal(false);

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
