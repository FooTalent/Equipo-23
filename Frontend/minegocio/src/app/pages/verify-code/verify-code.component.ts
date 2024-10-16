import { Component, inject, signal } from '@angular/core';
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
  isLoading = signal(false);

  onVerifySubmit(event: Event) {
    event.preventDefault();

    if (this.verificationForm.valid) {
      const verificationCode: string = this.verificationForm.value.code ?? '';

      this.userService.verifyRegisterCode(verificationCode).subscribe({
        next: (response: any) => {
          this.isLoading.update(value => !value);
          this.Router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'El código de verificación no es correcto. Por favor inténtalo de nuevo.';
          } else {
            this.errorMessage =
              'Un error inesperado ha ocurrido. Por favor, inténtalo de nuevo más tarde.';
          }
        },
      });
    } else {
      this.errorMessage = 'Rellena el codigo de verificación';
    }
  }

  cancelVerification() {
    this.Router.navigate(['/sign-up']);
  }
}
