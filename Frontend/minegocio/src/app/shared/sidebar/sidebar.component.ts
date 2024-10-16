import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class SidebarComponent {
  constructor(private router: Router, private userService: UserService) {}

  logout() {
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']); 
  }

  user = signal<any>({});

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user.set(user);
    });
  }
}
