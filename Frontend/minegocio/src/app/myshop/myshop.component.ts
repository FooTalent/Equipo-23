import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-myshop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myshop.component.html',
  styleUrls: ['./myshop.component.css']
})
export class MyShopComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  totalPages: number = 1; 
  currentPage: number = 1; 
  searchQuery: string = ''; 

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts(this.currentPage);
  }

  loadProducts(page: number, query: string = '') {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts(page, 20, query).subscribe({
      next: (response: any) => {
        this.products = response.data.data;
        this.isLoading = false; 
        this.totalPages = response.data.totalPages; 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.error = 'Error al cargar los productos. Por favor, intente de nuevo.';
        this.isLoading = false; 
      }
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadProducts(this.currentPage, this.searchQuery); 
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  searchProducts() {
    this.currentPage = 1; 
    this.searchQuery = ''; 
    this.loadProducts(this.currentPage, this.searchQuery); 
  }
}
