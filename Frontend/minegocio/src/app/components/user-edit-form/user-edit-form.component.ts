import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.css'
})
export class UserEditFormComponent {

  private userService = inject(UserService);

  userEditForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.email]),
    telefono: new FormControl(null,),
    pais: new FormControl(''),
    localidad: new FormControl('')
  });

  // Function to toggle form visibility

  toggleEditForm() {
    this.userService.toggleEditForm();
  }

}
