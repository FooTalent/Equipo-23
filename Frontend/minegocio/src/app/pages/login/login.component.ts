import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginValues } from '../../models/loginValues.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private userService = inject(UserService);
  private Router = inject(Router);

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string = '';
  onLoginSubmit(event: Event) {

    if(this.userForm.valid) {

      const loginValues: LoginValues = {
        email: this.userForm.value.email ?? '',
        password: this.userForm.value.password ?? ''
      };

      this.userService.loginUser(loginValues).subscribe({

        next: (response: any) => {
          this.Router.navigate([ "" ])
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else {
            this.errorMessage = 'An Server error occurred. Please try again later.';
          }
        }
      })
    }
  }

}
