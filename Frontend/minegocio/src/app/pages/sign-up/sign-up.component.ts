import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RegisterValues } from '../../models/registerValues.model';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLinkWithHref],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private Router = inject(Router);
  private meta = inject(Meta);

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.required])
  });


  errorMessage: string = '';

  onRegisterSubmit(event: Event) {
    event.preventDefault()

    if(this.registerForm.valid) {

      const registerValues: RegisterValues = {
        firstName: this.registerForm.value.firstName ?? '',
        lastName: this.registerForm.value.lastName ?? '',
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        role: this.registerForm.value.role ?? ''
      };

      this.userService.registerUser(registerValues).subscribe({

        next: (response: any) => {
          this.Router.navigate([ "/verify-code" ])
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'El email ya está en uso';
          } else {
            this.errorMessage = 'Un error inesperado ha ocurrido. Por favor, inténtalo de nuevo más tarde.';
          }
        }
      })
    } else {
      this.errorMessage = 'Por favor, rellena todos los campos';
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

  // Function to change the theme color

  ngOnInit(): void {
    this.meta.updateTag({ name: 'theme-color', content: '#5d3cba' });
  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'theme-color', content: '#ffffff' });
  }

}