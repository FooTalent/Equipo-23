import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-image-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-image-form.component.html',
  styleUrl: './user-image-form.component.css'
})
export class UserImageFormComponent {

  private userService = inject(UserService);

  toggleEditImageForm() {
    this.userService.toggleEditImageForm();
  }

  imagePreview: string | null = null;

  // Método que se activa al seleccionar un archivo
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Guardamos el resultado (data URL) en imagePreview
        this.imagePreview = reader.result as string;
      };
      // Leer el archivo seleccionado
      reader.readAsDataURL(file);
    }
  }

}
