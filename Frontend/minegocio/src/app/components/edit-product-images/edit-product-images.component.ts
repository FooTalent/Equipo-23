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

    console.log(this.selectedFiles)
    console.log(this.currentImages)
    

    if( this.selectedFiles.length > 0) {
      const formData = new FormData();

      formData.append('imagesForUpdate', JSON.stringify(this.currentImages));

      this.selectedFiles.forEach(file => {
        formData.append('thumbnails', file);
      });

      this.productService.updateProductImages(this.idProduct, formData)
      .subscribe(response => {
        console.log('Imágenes actualizadas:', response);
        this.toggleEditImageForm()
        console.log(formData.get('imagesForUpdate'))
        console.log(formData.get('thumbnails'))
      }, error => {
        this.toggleEditImageForm()
        console.log(error.message)
        console.log('Error al actualizar imágenes:', error);
        console.log(formData.get('imagesForUpdate'))
        console.log(formData.get('thumbnails'))
        this.errorMessage = 'Error al actualizar imágenes. Por favor, inténtalo de nuevo más tarde.';
      });
    
    } else {
      this.toggleEditImageForm()
      this.errorMessage = 'No has seleccionado ninguna imagen';
    }
  }

}
