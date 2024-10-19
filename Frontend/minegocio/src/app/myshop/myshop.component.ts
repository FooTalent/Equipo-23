import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductBotComponent } from '../product-bot/product-bot.component';

@Component({
  selector: 'app-myshop',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductBotComponent],
  templateUrl: './myshop.component.html',
  styleUrls: ['./myshop.component.css'],
})
export class MyShopComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  totalPages: number = 1;
  currentPage: number = 1;
  searchQuery: string = '';
  isLargeScreen: boolean = true;
  showBot: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isLargeScreen = window.innerWidth > 1024;
  }

  ngOnInit() {
    this.isLargeScreen = window.innerWidth > 1024;
    this.loadProducts(this.currentPage);
  }

  loadProducts(page: number, query: string = ''): void {
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
        this.error =
          'Error al cargar los productos. Por favor, intente de nuevo.';
        this.isLoading = false;
      },
    });
  }

  changeProductStatus(productId: string) {
    const product = this.products.find((p) => p.id === productId);
    this.isLoading = true;
    if (product) {
      const newStatus = product.status === true ? false : true;

      this.productService.changeStatus(productId, newStatus).subscribe({
        next: (response) => {
          console.log('Estado del producto actualizado:', response);
          this.updateProductStatusInList(productId, newStatus);
          this.loadProducts(this.currentPage);
        },
        error: (error) => {
          console.error('Error al cambiar el estado del producto:', error);
          this.error =
            'Error al cambiar el estado del producto. Por favor, intente de nuevo.';
        },
      });
    }
  }

  updateProductStatusInList(productId: string, response: any) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.status = response.newStatus;
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

  searchProducts(query?: string) {
    this.currentPage = 1;
    this.loadProducts(this.currentPage, this.searchQuery || query);
  }

  goToProduct(productId: string) {
    this.router.navigate([`myshop/${productId}`]);
  }

  activateProduct(productId: string) {}

  hidePopUp(): void {
    this.showBot = false;
    // this.refreshProducts();
    this.loadProducts(this.currentPage);
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'auto';
    }
  }

  showPopUp() {
    console.log('toggling producto bot');
    this.showBot = !this.showBot;
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
    }
  }
}
