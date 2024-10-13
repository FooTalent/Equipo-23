import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url; 
  }

  goBack() {
    this.router.navigate(['..']); 
  }
  isMenuOpen = false; 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; 
  }
}
