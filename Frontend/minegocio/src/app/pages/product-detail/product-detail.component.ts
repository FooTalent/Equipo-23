import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { skip } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, FormsModule, ReactiveFormsModule, DeleteConfirmationComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  private productService = inject(ProductService);

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

      this.productEditForm.patchValue({
        title: product.data.title,
        description: product.data.description,
        price: product.data.price,
        stock: product.data.stock,
      });
    })
    
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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

  productEditForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(null,),
    stock: new FormControl(null,),
  });

  isLoadingForm = signal(false);
  editStatus = signal(false);
  editErrorMessage: string = '';

  changeEditStatus() {
    this.editStatus.update(value => !value);
  }

  onEditSubmit(event: Event) {
    event.preventDefault();

    const product = {
      title: this.productEditForm.value.title ?? "",
      description: this.productEditForm.value.description ?? "",
      price: this.productEditForm.value.price ?? null,
      stock: this.productEditForm.value.stock ?? null,
    }

    if(this.productEditForm.valid) {
      
      this.isLoadingForm.update(value => !value);

      this.productService.updateProduct(this.idProduct, product).subscribe({
        next: (response: any) => {
          this.reloadComponent();
        },
        error: (error) => {
          console.log(error);
          
          this.isLoadingForm.update(value => !value);
          if (error.status === 404) {
            this.editErrorMessage = 'Usuario no encontrado';
          } else if (error.status === 401){
            this.editErrorMessage = 'No tienes permisos para editar este usuario';
          } else {
            this.editErrorMessage = 'Un error inesperado ha ocurrido. Por favor, inténtalo de nuevo más tarde.';
          }
        },
      });
    } else {
      this.errorMessage = 'Por favor, rellena todos los campos';
    }
  }

  openDeleteConfirmation = this.productService.deleteConfirmation;

  toggleDeleteConfirmation() {
    this.productService.deleteConfirmation.update(value => !value); 
  }

}
