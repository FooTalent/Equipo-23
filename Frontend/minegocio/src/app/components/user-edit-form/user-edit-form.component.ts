import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.css'
})
export class UserEditFormComponent {

  private userService = inject(UserService);
  private Router = inject(Router);

  userEditForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(0,[Validators.minLength(10), Validators.maxLength(10)]),
    country: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    locality: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    zipCode: new FormControl(''),
  });

  notificationMessage: string = '';
  errorMessage: string = '';
  isLoading = signal(false);

  onEditSubmit(event: Event) {
    event.preventDefault();

    const user: User = {
      name: this.userEditForm.value.name ?? '',
      lastName: this.userEditForm.value.lastName ?? '',
      email: this.userEditForm.value.email ?? '',
      phone: this.userEditForm.value.phone ?? 0,
      country: this.userEditForm.value.country ?? '',
      locality: this.userEditForm.value.locality ?? '',
      zipCode: this.userEditForm.value.zipCode ?? '',
    };

    if(this.userEditForm.valid) {
      
      this.isLoading.update(value => !value);

      this.userService.updateUser(user).subscribe({
        next: (response: any) => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          
          this.isLoading.update(value => !value);
          if (error.status === 404) {
            this.errorMessage = 'Usuario no encontrado';
          } else if (error.status === 401){
            this.errorMessage = 'No tienes permisos para editar este usuario';
          } else {
            this.errorMessage = 'Un error inesperado ha ocurrido. Por favor, inténtalo de nuevo más tarde.';
          }
        },
      });
    } else {
      this.errorMessage = 'Por favor, rellena todos los campos';
    }
  }

  // Function to toggle form visibility

  toggleEditForm() {
    this.userService.toggleEditForm();
  }

}
