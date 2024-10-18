import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-image-form',
  standalone: true,
  imports: [
    CommonModule,
    ImageCropperComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './user-image-form.component.html',
  styleUrl: './user-image-form.component.css',
})
export class UserImageFormComponent {
  private userService = inject(UserService);
  private DomSanitizer = inject(DomSanitizer);
  private Router = inject(Router);

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  croppedBlob: Blob | null = null;
  isCropped = false;

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.isCropped = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedBlob = event.blob;
      this.croppedImage = this.DomSanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.blob)
      );
    }
  }

  cropImage(): void {
    this.isCropped = true;
  }

  reCrop(): void {
    this.isCropped = false;
  }

  editPhotoForm = new FormGroup({
    photo: new FormControl(null, [Validators.required]),
  });

  isLoading = signal(false);
  errorMessage: string = '';

  onEditPhotoSubmit(event: Event) {

    event.preventDefault();

    if (this.croppedBlob) {
      
      const file = new File([this.croppedBlob], 'profile.png', {
        type: 'image/png',
      });

      this.isLoading.update(value => !value);

      this.userService.updateUserPhoto(file).subscribe(
        (response) => {
          this.isLoading.update(value => !value);
          window.location.reload();
        },
        (error) => {
          this.isLoading.update(value => !value);
          if (error.status === 404) {
            this.errorMessage = 'Usuario no encontrado';
          } else if (error.status === 401){
            this.errorMessage = 'No tienes permisos para editar este usuario';
          } else {
            this.errorMessage = 'Un error inesperado ha ocurrido. Por favor, inténtalo de nuevo más tarde.';
          }
        }
      );
    } else {
      console.log('No se ha recortado ninguna imagen.');
    }

  }

  // Function to toggle image edit form visibility

  toggleEditImageForm() {
    this.userService.toggleEditImageForm();
  }
}
