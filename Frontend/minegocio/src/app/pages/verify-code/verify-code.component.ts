import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {


  private userService = inject(UserService);
  private Router = inject(Router);

  verificationForm = new FormGroup({
    code: new FormControl("", Validators.required),
  });

  errorMessage: string = '';
  onVerifySubmit(event: Event) {
    event.preventDefault();

    if (this.verificationForm.valid) {
      const verificationCode: string = this.verificationForm.value.code ?? '';

      this.userService.verifyRegisterCode(verificationCode).subscribe({
        next: (response: any) => {
          this.Router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Invalid verification code. Please try again.';
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again later.';
          }
        },
      });
    }
  }
}
