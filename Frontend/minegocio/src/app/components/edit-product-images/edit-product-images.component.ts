import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-edit-product-images',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product-images.component.html',
  styleUrl: './edit-product-images.component.css'
})
export class EditProductImagesComponent {

  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  private productService = inject(ProductService);

  idProduct: string = "";

  ngOnInit() {
    this.idProduct = this.route.snapshot.paramMap.get('productId') ?? "";

    this.getProduct(this.idProduct);
  }

  product = signal<any>({});

  getProduct(idProduct: string) {
    this.productService.getProduct(idProduct).subscribe((product:any) => {
      this.product.set(product.data);
      this.currentImages = product.data.thumbnails.map((image: any) => image.reference);
    }) 
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  toggleEditImagesForm() {
    this.productService.toggleEditImagesForm();
  }

  editImagesForm = new FormGroup({
    imagesForUpdate: new FormControl([]),
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

  isLoadingForm = signal(false);

  toggleEditImageForm() {
    this.isLoadingForm.update(value => !value);
  }

  onEditImagesSubmit(event: Event) {
    event.preventDefault();

    this.toggleEditImageForm();
    

    if( this.selectedFiles.length > 0) {
      const formData = new FormData();

      formData.append('imagesForUpdate', JSON.stringify(this.currentImages));

      this.selectedFiles.forEach(file => {
        formData.append('thumbnails', file);
      });

      this.productService.updateProductImages(this.idProduct, formData)
      .subscribe(response => {
        this.toggleEditImageForm()
        this.toggleEditImagesForm()
        this.reloadComponent()
      }, error => {
        this.toggleEditImageForm()
        this.errorMessage = 'Error al actualizar imágenes. Por favor, inténtalo de nuevo más tarde.';
      });
    
    } else {
      this.toggleEditImageForm()
      this.errorMessage = 'No has seleccionado ninguna imagen';
    }
  }

}
