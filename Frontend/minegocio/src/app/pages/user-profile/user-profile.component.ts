import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserImageFormComponent } from '../../components/user-image-form/user-image-form.component';
import { RouterLinkWithHref } from '@angular/router';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserImageFormComponent, RouterLinkWithHref, ReactiveFormsModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  private userService = inject(UserService);


  editImageFormOpen = this.userService.editImageFormOpen;

  toggleEditImageForm() {
    this.userService.toggleEditImageForm();
  }

  isLoading = signal(true);
  user = signal<any>({});

  ngOnInit() {
    this.userService.getUser()?.subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.update(value => false);
      },
      error: (error) => {
        window.location.reload();
      },
    });
  }

  //Edit form

  editFormOpen = signal(false);

  toggleEditForm() {
    this.editFormOpen.update(value => !value)
  }

  userEditForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    lastName: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(null,[Validators.minLength(10), Validators.maxLength(10)]),
    country: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    locality: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    zipCode: new FormControl(null),
  });

  notificationMessage: string = '';
  errorMessage: string = '';
  isLoadingForm = signal(false);

  onEditSubmit(event: Event) {
    event.preventDefault();

    const user: User = {
      name: this.userEditForm.value.name ?? '',
      lastName: this.userEditForm.value.lastName ?? '',
      email: this.userEditForm.value.email ?? '',
      phone: this.userEditForm.value.phone ?? null,
      country: this.userEditForm.value.country ?? '',
      locality: this.userEditForm.value.locality ?? '',
      zipCode: this.userEditForm.value.zipCode ?? null,
    };

    if(this.userEditForm.valid) {
      
      this.isLoadingForm.update(value => !value);

      this.userService.updateUser(user).subscribe({
        next: (response: any) => {
          window.location.reload();
        },
        error: (error) => {
          this.isLoadingForm.update(value => !value);
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

}
