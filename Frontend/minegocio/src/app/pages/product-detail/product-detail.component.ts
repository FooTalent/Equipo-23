import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { skip } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  idProduct: string = "";
  isLoading = signal(true);

  ngOnInit() {
    this.idProduct = this.route.snapshot.paramMap.get('productId') ?? "";

    this.getProduct(this.idProduct);
  }

  product = signal<any>({});
  statusSignal = signal(false)

  getProduct(idProduct: string) {
    this.productService.getProduct(idProduct).subscribe((product:any) => {
      this.product.set(product.data);
      this.statusSignal.set(this.product().status);
      this.isLoading.update(value => false);
    })
  }

  errorMessage: string = '';

  changeProductStatus(productId: string) {
    const newStatus = this.product().status === true ? false : true;

    if(this.product()) {
      this.productService.changeStatus(productId, newStatus).subscribe({
        next: (response) => {
          console.log('Estado del producto actualizado:', response);
          this.statusSignal.set(newStatus);
          this.reloadComponent();
        },
        error: (error) => {
          console.error('Error al cambiar el estado del producto:', error);
          this.errorMessage =
            'Error al cambiar el estado del producto. Por favor, intente de nuevo.';
        },
      });
    }
    
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
