import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { UserEditFormComponent } from '../../components/user-edit-form/user-edit-form.component';
import { UserService } from '../../services/user.service';
import { UserImageFormComponent } from '../../components/user-image-form/user-image-form.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserEditFormComponent, UserImageFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  private userService = inject(UserService);

  editFormOpen = this.userService.editFormOpen;
  editImageFormOpen = this.userService.editImageFormOpen;

  toggleEditForm() {
    this.userService.toggleEditForm();
  }

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

}
