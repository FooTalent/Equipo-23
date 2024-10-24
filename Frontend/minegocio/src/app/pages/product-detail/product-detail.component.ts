import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  id: string = "";
  isLoading = signal(true);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('productId') ?? "";

    this.getProduct(this.id);
  }

  product = signal<any>({});

  getProduct(idProduct: string) {
    this.productService.getProduct(idProduct).subscribe((product:any) => {
      this.product.set(product.data);
      this.isLoading.update(value => false);
      console.log(this.product()?.data?.thumbnails[0]?.reference);
      
    })
  }

}
