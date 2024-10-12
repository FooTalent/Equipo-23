import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myshop',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private productService: ProductService, private router: Router) {}

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

  changeProductStatus(productId: string) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      const newStatus = product.status === 'true' ? 'false' : 'true'; // Cambia el estado actual
      this.productService.changeStatus(productId, newStatus).subscribe({
        next: (response) => {
          console.log('Estado del producto actualizado:', response);
          this.updateProductStatusInList(productId, newStatus); // Actualiza el estado en la lista
        },
        error: (error) => {
          console.error('Error al cambiar el estado del producto:', error);
          this.error = 'Error al cambiar el estado del producto. Por favor, intente de nuevo.';
        }
      });
    }
  }

  updateProductStatusInList(productId: string, response: any) {
    // Lógica para actualizar el estado del producto en la lista
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.status = response.newStatus; // Asumiendo que la respuesta contiene el nuevo estado
    }
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
    this.loadProducts(this.currentPage, this.searchQuery);
  }

  // Nuevo método para navegar a la página del producto
  goToProduct(productId: string) {
    this.router.navigate([`myshop/${productId}`]); // Navega a la URL del producto
  }

  activateProduct(productId: string) { 
    
  }
}
