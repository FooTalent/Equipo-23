import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { LoginValues } from '../../models/loginValues.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLinkWithHref],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private Router = inject(Router);

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string = '';
  onLoginSubmit(event: Event) {
    event.preventDefault()

    if(this.userForm.valid) {

      const loginValues: LoginValues = {
        email: this.userForm.value.email ?? '',
        password: this.userForm.value.password ?? ''
      };

      this.authService.loginUser(loginValues).subscribe({

        next: (response: any) => {
          this.Router.navigate([ "" ])
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'El email o la contraseña no son correctos';
          } else {
            this.errorMessage = 'An Server error occurred. Please try again later.';
          }
        }
      })
    } else {
      this.errorMessage = 'Por favor, rellena todos los campos requeridos.';
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
  
  // Function to toggle password visibility

  viewPassword = signal(false);

  togglePassword() {
    this.viewPassword.update(value => !value);
  }

}
