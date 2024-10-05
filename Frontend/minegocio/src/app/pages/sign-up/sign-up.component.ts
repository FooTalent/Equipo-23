import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RegisterValues } from '../../models/registerValues.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private userService = inject(UserService);
  private Router = inject(Router);

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
    age: new FormControl(0, [Validators.required, Validators.min(19)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required])
  });


  errorMessage: string = '';

  onRegisterSubmit(event: Event) {
    event.preventDefault()

    if(this.registerForm.valid) {

      const registerValues: RegisterValues = {
        firstName: this.registerForm.value.firstName ?? '',
        lastName: this.registerForm.value.lastName ?? '',
        age: this.registerForm.value.age ?? 0,
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
        role: this.registerForm.value.role ?? ''
      };

      this.userService.registerUser(registerValues).subscribe({

        next: (response: any) => {
          this.Router.navigate([ "/verify-code" ])
        },
        error: (error) => {
          console.log(error);
          if (error.status === 404) {
            this.errorMessage = 'Email is already in use';
          } else if (error.status === 400) {
            this.errorMessage = error.error.errors;
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      })
    }
  }

}
