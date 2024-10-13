import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-myshop-mobile',
  templateUrl: './myshop-mobile.component.html',
  imports: [CommonModule],
})
export class MyShopMobileComponent {
  constructor(private router: Router) {}

  @Input() products!: any[]; 
  @Input() isLoading!: boolean;
  @Input() loadingSpinner!: boolean;
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Input() searchQuery!: string;
  @Input() goToPreviousPage!: () => void;
  @Input() goToNextPage!: () => void;
  @Input() changeProductStatus!: (id: string) => void;
  @Input() goToProduct!: (id: string) => void;
  @Input() searchProducts!: () => void;
  @Input() goToPage!: (page: number) => void;

  logout() {
    localStorage.removeItem('user_token');
    this.router.navigate(['/login']); 
  }
}
