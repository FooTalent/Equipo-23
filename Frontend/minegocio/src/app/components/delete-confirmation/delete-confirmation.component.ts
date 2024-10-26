import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {

  constructor(private route: ActivatedRoute) { }


  private productService = inject(ProductService);
  private router = inject(Router);

  idProduct: string = "";

  ngOnInit() {
    this.idProduct = this.route.snapshot.paramMap.get('productId') ?? "";
  }

  openDeleteConfirmation = this.productService.deleteConfirmation;
  isloading = signal(false);
  deleteErrorMessage: string = '';

  toggleDeleteConfirmation() {
    this.productService.deleteConfirmation.update(value => !value);
  }

  deleteProduct(productId: string) {
    this.isloading.update(value => !value);
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.router.navigate(["/myshop"]);
      },
      error: (error) => {
        this.isloading.update(value => !value);
        this.toggleDeleteConfirmation();
        if (error.status === 404) {
          this.deleteErrorMessage = "Producto no encontrado.";
        } else if (error.status === 403) {
          this.deleteErrorMessage = "No tienes permisos para eliminar este producto.";
        } else {
          this.deleteErrorMessage = "Ocurrió un error inesperado. Inténtalo nuevamente.";
        }
      },
    });
  }

}
