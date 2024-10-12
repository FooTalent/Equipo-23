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
  isLoading: boolean = false; // Variable para controlar el estado de carga
  error: string | null = null;
  totalPages: number = 1; // Almacena el total de páginas
  currentPage: number = 1; // Almacena la página actual
  searchQuery: string = ''; // Variable para almacenar la búsqueda

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts(this.currentPage);
  }

  loadProducts(page: number, query: string = '') {
    this.isLoading = true; // Iniciar el estado de carga
    this.error = null;
    this.productService.getProducts(page, 20, query).subscribe({
      next: (response: any) => {
        this.products = response.data.data;
        this.isLoading = false; // Finalizar el estado de carga
        this.totalPages = response.data.totalPages; // Asigna el total de páginas
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.error = 'Error al cargar los productos. Por favor, intente de nuevo.';
        this.isLoading = false; // Asegurarse de finalizar el estado de carga en caso de error
      }
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadProducts(this.currentPage, this.searchQuery); // Carga los productos de la nueva página
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
    this.currentPage = 1; // Reiniciar a la primera página al buscar
    this.searchQuery = ''; // Limpiar el texto de búsqueda
    this.loadProducts(this.currentPage, this.searchQuery); // Cargar productos con la búsqueda
  }
}
