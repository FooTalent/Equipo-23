import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { UserEditFormComponent } from '../../components/user-edit-form/user-edit-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserEditFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  private userService = inject(UserService);

  editFormOpen = this.userService.editFormOpen;

  toggleEditForm() {
    this.userService.toggleEditForm();
  }

}
