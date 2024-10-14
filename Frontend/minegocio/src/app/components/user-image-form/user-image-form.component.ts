import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-image-form',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './user-image-form.component.html',
  styleUrl: './user-image-form.component.css',
})
export class UserImageFormComponent {
  private userService = inject(UserService);
  private DomSanitizer = inject(DomSanitizer);

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  isCropped = false;  // Controla si ya se realizó el recorte

  toggleEditImageForm() {
    this.userService.toggleEditImageForm();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.isCropped = false;  // Habilita el cropper cuando se selecciona una nueva imagen
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl) {
      this.croppedImage = this.DomSanitizer.bypassSecurityTrustUrl(event.objectUrl);
    } else {
      this.croppedImage = '';
    }
  }

  imageLoaded(image: LoadedImage) {
    // Muestra el cropper
  }

  cropperReady() {
    // El cropper está listo
  }

  loadImageFailed() {
    console.error('Error al cargar la imagen.');
  }

  cropImage(): void {
    this.isCropped = true;  // Oculta el cropper y muestra la vista previa
  }

  reCrop(): void {
    this.isCropped = false;  // Muestra nuevamente el cropper y oculta la vista previa
  }
}
