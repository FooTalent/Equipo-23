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
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.data.data;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.error = 'Error al cargar los productos. Por favor, intente de nuevo.';
        this.isLoading = false;
      }
    });
  }
}