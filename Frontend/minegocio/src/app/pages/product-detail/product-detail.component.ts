import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { EditProductImagesComponent } from '../../components/edit-product-images/edit-product-images.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule, FormsModule, ReactiveFormsModule, DeleteConfirmationComponent, EditProductImagesComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  private productService = inject(ProductService);

  isMobile() {
    return window.innerWidth < 768;
  }

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
      this.currentImages = product.data.thumbnails;

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

  selectedImageIndex: number = 0;

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  getSelectedImage(): string {
    const thumbnails = this.product()?.thumbnails;
    return thumbnails && thumbnails[this.selectedImageIndex]?.reference
      ? thumbnails[this.selectedImageIndex].reference
      : '/images/default-product.png';
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

  isLoadingForm = signal(false);
  editStatus = signal(false);
  editErrorMessage: string = '';

  changeEditStatus() {
    this.editStatus.update(value => !value);
  }

  productEditForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(null,),
    stock: new FormControl(null,),
  });

  selectedFiles: File[] = [];
  currentImages: any[] = [];
  fileErrorMessage: string = "";
  maxFilesStatus = signal(true);

  onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
    if (this.selectedFiles.length > 3) {
      this.maxFilesStatus.update(value => false);
    }
  }

  onEditSubmit(event: Event) {
    event.preventDefault();

    const product = {
      title: this.productEditForm.value.title ?? "",
      description: this.productEditForm.value.description ?? "",
      price: this.productEditForm.value.price ?? null,
      stock: this.productEditForm.value.stock ?? null,
    }

    if(this.productEditForm.valid && this.maxFilesStatus()) {
      
      this.isLoadingForm.update(value => !value);

      this.productService.updateProduct(this.idProduct, product).subscribe({
        next: (response: any) => {
          this.reloadComponent();
        },
        error: (error) => {
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
    } else if (!this.maxFilesStatus()) {
      this.errorMessage = 'Por favor, selecciona un máximo de 3 imágenes';
    } else {
      this.errorMessage = 'Por favor, rellena todos los campos';
    }
  }

  openDeleteConfirmation = this.productService.deleteConfirmation;

  toggleDeleteConfirmation() {
    this.productService.deleteConfirmation.update(value => !value); 
  }

  openEditImagesForm = this.productService.openEditImagesForm;

  toggleEditImagesForm() {
    this.productService.toggleEditImagesForm();
  }

}
