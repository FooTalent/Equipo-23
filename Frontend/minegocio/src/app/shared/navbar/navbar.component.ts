import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  currentRoute: string;

  constructor(private router: Router, private userService: UserService) {
    this.currentRoute = this.router.url;
  }

  goBack() {
    this.router.navigate(['..']);
  }
  isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
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
